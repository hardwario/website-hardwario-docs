import React, {useMemo, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import * as ttnModule from './ttn';
import styles from './styles.module.css';

// The vendored ttn.js is CommonJS (module.exports). Resolve the codec object
// across webpack interop shapes (named, default, or namespace).
const codec = ttnModule.encodeDownlink ? ttnModule : ttnModule.default || ttnModule;

// Every label goes through translate() while the component renders, never when this
// module loads, so it follows the locale of the page. Constants that the encoding
// reads keep their ids and values; their labels come from functions.

// --- Alarm rule model (app_config.yml / app_alarm_rules.c / app_sensor_types.yaml, v2.0.0) ---
// A rule addresses a value as (slot, channel): slot 0 is the on-board sensors
// (sensor type 1, motherboard), slots 1-4 are the 1-Wire sensors s1-s4 and
// carry the sensor type the rule is written for.
const SLOTS = [
  {id: 'onboard', value: 0},
  {id: 's1', value: 1},
  {id: 's2', value: 2},
  {id: 's3', value: 3},
  {id: 's4', value: 4},
];

const slotLabel = (s) =>
  s.value === 0
    ? translate({id: 'sticker.downlinkGenerator.slot.onboard', message: 'On-board'})
    : translate({id: 'sticker.downlinkGenerator.slot.w1', message: '1-Wire slot {n} (s{n})'}, {n: s.value});

const SENSOR_TYPE_MB = 1;
// 1-Wire sensor types a slot can expect (registry ids in app_sensor_types.yaml).
const w1Types = () => [
  {value: 2, label: translate({id: 'sticker.downlinkGenerator.sensorType.dallas', message: 'Dallas (DS18B20)'})},
  {value: 3, label: translate({id: 'sticker.downlinkGenerator.sensorType.machineProbe', message: 'Machine probe'})},
];

// Channel labels from app_sensor_types.yaml. The channel list itself (index =
// channel id, unit, kind) comes from the codec's sensorTypes registry.
function channelLabels() {
  const temperature = (chip) =>
    translate({id: 'sticker.downlinkGenerator.channel.temperatureChip', message: 'Temperature ({chip})'}, {chip});
  const humidity = (chip) =>
    translate({id: 'sticker.downlinkGenerator.channel.humidity', message: 'Relative humidity ({chip})'}, {chip});
  const illuminance = translate({id: 'sticker.downlinkGenerator.channel.illuminance', message: 'Illuminance (OPT3001)'});
  const inputState = (input) =>
    translate({id: 'sticker.downlinkGenerator.channel.inputState', message: 'Input {input}: state'}, {input});
  const inputCount = (input) =>
    translate({id: 'sticker.downlinkGenerator.channel.inputCount', message: 'Input {input}: pulse count'}, {input});
  const inputVoltage = (input) =>
    translate({id: 'sticker.downlinkGenerator.channel.inputVoltage', message: 'Input {input}: voltage'}, {input});
  const acceleration = (axis) =>
    translate({id: 'sticker.downlinkGenerator.channel.acceleration', message: 'Acceleration {axis} (LIS2DH12)'}, {axis});
  return {
    1: {
      temperature: temperature('SHT4x'),
      humidity: humidity('SHT4x'),
      pressure: translate({id: 'sticker.downlinkGenerator.channel.pressure', message: 'Pressure (MPL3115A2)'}),
      illuminance,
      'temperature-baro': temperature('MPL3115A2'),
      'hall-left-state': translate({id: 'sticker.downlinkGenerator.channel.hallLeftState', message: 'Hall left: state'}),
      'hall-left-count': translate({id: 'sticker.downlinkGenerator.channel.hallLeftCount', message: 'Hall left: pulse count'}),
      'hall-right-state': translate({id: 'sticker.downlinkGenerator.channel.hallRightState', message: 'Hall right: state'}),
      'hall-right-count': translate({id: 'sticker.downlinkGenerator.channel.hallRightCount', message: 'Hall right: pulse count'}),
      'input-a-state': inputState('A'),
      'input-a-count': inputCount('A'),
      'input-a-voltage': inputVoltage('A'),
      'input-b-state': inputState('B'),
      'input-b-count': inputCount('B'),
      'input-b-voltage': inputVoltage('B'),
      'pir-motion': translate({id: 'sticker.downlinkGenerator.channel.pirMotion', message: 'PIR: motion'}),
      'pir-count': translate({id: 'sticker.downlinkGenerator.channel.pirCount', message: 'PIR: motion count'}),
      'accel-motion': translate({id: 'sticker.downlinkGenerator.channel.accelMotion', message: 'Accelerometer: motion'}),
      'accel-count': translate({id: 'sticker.downlinkGenerator.channel.accelCount', message: 'Accelerometer: motion count'}),
    },
    2: {temperature: translate({id: 'sticker.downlinkGenerator.channel.temperature', message: 'Temperature'})},
    3: {
      temperature: temperature('SHT'),
      humidity: humidity('SHT'),
      'temperature-aux': temperature('TMP112'),
      illuminance,
      'magnetic-field': translate({id: 'sticker.downlinkGenerator.channel.magneticField', message: 'Magnetic field (Si7210)'}),
      tilt: translate({id: 'sticker.downlinkGenerator.channel.tilt', message: 'Tilt alert (LIS2DH12)'}),
      'accel-x': acceleration('X'),
      'accel-y': acceleration('Y'),
      'accel-z': acceleration('Z'),
    },
  };
}

// Channels that are not alarm targets: kind "none" (orientation, altitude) and
// the battery voltage, which only the built-in low-battery watchdog uses.
const NOT_ALARMABLE = ['battery-voltage'];
// PIR and accelerometer motion are momentary (pulse) channels: each event fires
// once, they never go back to 0 by themselves.
const MOMENTARY = ['pir-motion', 'accel-motion'];

const UNIT_LABELS = {degC: '°C', '%RH': '% RH', 'm/s2': 'm/s²'};
const unitLabel = (u) => UNIT_LABELS[u] || u;

// Usable alarm channels of a sensor type: [{id, name, unit, kind}].
function channelsFor(sensorType) {
  const t = codec.sensorTypes && codec.sensorTypes[sensorType];
  if (!t) return [];
  const labels = channelLabels()[sensorType] || {};
  return t.ch
    .map((c, id) => ({id, name: c.n, unit: c.u, kind: c.k, label: labels[c.n] || c.n}))
    .filter((c) => c.kind !== 'none' && !NOT_ALARMABLE.includes(c.name));
}

const ruleSensorType = (r) => (r.slot === 'onboard' ? SENSOR_TYPE_MB : int(r.w1type, 2));
const ruleChannel = (r) => {
  const chs = channelsFor(ruleSensorType(r));
  return chs.find((c) => c.id === int(r.channel, -1)) || chs[0];
};

const byId = (arr, id) => arr.find((x) => x.id === id);
const num = (v, f = 0) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : f);
const int = (v, f = 0) => (Number.isFinite(parseInt(v, 10)) ? parseInt(v, 10) : f);

// Pack a rule into the 18-byte little-endian format and return 36 hex chars:
// [0] flags (bit0 present, bit1 enabled), [1] slot, [2] channel,
// [3] sensor type, [4] from, [5] to (STATE only), [6..9] lo, [10..13] hi,
// [14..17] dwell (float32). dwell is the hysteresis in channel units for a
// THRESHOLD rule, the window in seconds for RATE (hi = event count) and the
// dwell/hold in seconds for STATE.
function packAlarm({enabled, slot, channel, sensorType, kind, from, to, lo, hi, dwell}) {
  const buf = new ArrayBuffer(18);
  const dv = new DataView(buf);
  dv.setUint8(0, 1 | (enabled ? 2 : 0));
  dv.setUint8(1, slot);
  dv.setUint8(2, channel);
  dv.setUint8(3, sensorType);
  dv.setUint8(4, kind === 'state' ? (from ? 1 : 0) : 0);
  dv.setUint8(5, kind === 'state' ? (to ? 1 : 0) : 0);
  dv.setFloat32(6, kind === 'threshold' ? lo : 0, true);
  dv.setFloat32(10, kind === 'state' ? 0 : hi, true);
  dv.setFloat32(14, dwell, true);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const EMPTY_RULE = '00'.repeat(18);

// The device rejects a rule whose dwell is out of range (rule_dwell_range_valid
// in app_alarm_rules.c): THRESHOLD 0 to hi - lo, STATE/RATE 0 to 3600 s.
const DWELL_MAX = 3600;

// Returns an error string for an invalid rule, or null.
function ruleError(r) {
  const ch = ruleChannel(r);
  if (!ch) return translate({id: 'sticker.downlinkGenerator.error.noChannel', message: 'no channel selected'});
  const d = num(r.dwell);
  if (ch.kind === 'threshold') {
    if (!(num(r.hi) > num(r.lo))) return translate({id: 'sticker.downlinkGenerator.error.highLow', message: 'High must be greater than Low'});
    if (d < 0 || d > num(r.hi) - num(r.lo)) return translate({id: 'sticker.downlinkGenerator.error.hysteresis', message: 'hysteresis must be 0 to High − Low'});
    return null;
  }
  if (ch.kind === 'rate' && num(r.count) < 0) return translate({id: 'sticker.downlinkGenerator.error.count', message: 'events per window must be 0 or more'});
  if (d < 0 || d > DWELL_MAX) {
    return ch.kind === 'rate'
      ? translate({id: 'sticker.downlinkGenerator.error.window', message: 'window must be 0 to {max} s'}, {max: DWELL_MAX})
      : translate({id: 'sticker.downlinkGenerator.error.dwell', message: 'dwell must be 0 to {max} s'}, {max: DWELL_MAX});
  }
  return null;
}

// What dwell does for the rule's kind (eval_threshold/eval_state/eval_count in app_alarm.c).
function dwellHint(r, ch) {
  if (ch.kind === 'threshold') {
    return translate({
      id: 'sticker.downlinkGenerator.hint.threshold',
      message: 'Deadband in the channel units: the alarm fires as soon as the value leaves Low to High and clears only below High − hysteresis / above Low + hysteresis (0 = clears as soon as it is back inside).',
    });
  }
  if (ch.kind === 'rate') {
    return translate({
      id: 'sticker.downlinkGenerator.hint.rate',
      message: 'Window length in seconds (0 = report interval). Fires as soon as the count rises by Events per window within one window; a sustained rate stays one alarm.',
    });
  }
  if (MOMENTARY.includes(ch.name)) {
    if (r.from === '1' && r.to === '1') {
      return translate({
        id: 'sticker.downlinkGenerator.hint.motion',
        message: 'Motion state: the first event fires (motion started); the alarm clears (motion ended) after this many seconds with no event.',
      });
    }
    if (r.from === '0' && r.to === '0') {
      return translate({
        id: 'sticker.downlinkGenerator.hint.stillness',
        message: 'Stillness: fires (stopped) after this many seconds with no event; the next event clears it (moving again).',
      });
    }
    return translate({
      id: 'sticker.downlinkGenerator.hint.momentaryEdge',
      message: 'Fires on each event, then waits this many seconds before it can fire again.',
    });
  }
  if (r.from === r.to) {
    return translate({
      id: 'sticker.downlinkGenerator.hint.level',
      message: 'Seconds the line must stay at To before the alarm fires (0 = immediately).',
    });
  }
  return translate({
    id: 'sticker.downlinkGenerator.hint.edge',
    message: 'Seconds the line must stay at To after the transition before the alarm fires; it then stays active as long before it can fire again (0 = immediately).',
  });
}

function stateHint(r, ch) {
  if (MOMENTARY.includes(ch.name)) {
    if (r.from === '1' && r.to === '1') return translate({id: 'sticker.downlinkGenerator.state.motion', message: 'motion started / ended'});
    if (r.from === '0' && r.to === '0') return translate({id: 'sticker.downlinkGenerator.state.stillness', message: 'stillness (no motion for dwell)'});
    return translate({id: 'sticker.downlinkGenerator.state.momentaryEdge', message: 'edge (fires on each event)'});
  }
  return r.from === r.to
    ? translate({id: 'sticker.downlinkGenerator.state.level', message: 'level (active while line = To)'})
    : translate({id: 'sticker.downlinkGenerator.state.edge', message: 'edge (fires on this transition)'});
}

// Configuration parameters writable over a radio downlink (application,
// sensors and alarms groups; the lorawan group is rejected over the air).
// Enum values are sent as numbers (the proto enum index).
const offLabel = () => translate({id: 'sticker.downlinkGenerator.option.off', message: 'Off'});
const GPIO_INPUT_OPTIONS = [
  [() => translate({id: 'sticker.downlinkGenerator.option.disabled', message: 'Disabled'}), 0],
  [() => translate({id: 'sticker.downlinkGenerator.option.digital', message: 'Digital'}), 1],
  [() => translate({id: 'sticker.downlinkGenerator.option.analog', message: 'Analog (0-24 V)'}), 2],
  [() => translate({id: 'sticker.downlinkGenerator.option.pulseCounter', message: 'Pulse counter'}), 3],
];
const CONFIG_FIELDS = [
  // Integer ranges from app_config.yml (min/max; zero = 0 also accepted, extras.zero_allowed).
  {
    key: 'interval_report', group: 'application', type: 'int', def: '900', min: 60, max: 86400,
    label: () => translate({id: 'sticker.downlinkGenerator.config.intervalReport', message: 'Report interval (s, 60-86400)'}),
  },
  {
    key: 'interval_sample', group: 'application', type: 'int', def: '60', min: 5, max: 3600, zero: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.intervalSample', message: 'Sample interval (s, 5-3600, 0 = before each report)'}),
  },
  {
    key: 'interval_announce', group: 'application', type: 'int', def: '24', min: 1, max: 168, zero: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.intervalAnnounce', message: 'Announce interval (h, 1-168, 0 = off)'}),
  },
  {
    key: 'history_enable', group: 'application', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.historyEnable', message: 'History enable'}),
  },
  {
    key: 'battery_level', group: 'application', type: 'int', def: '2400', min: 1000, max: 3600,
    label: () => translate({id: 'sticker.downlinkGenerator.config.batteryLevel', message: 'Low-battery threshold (mV, 1000-3600)'}),
  },
  {
    key: 'cap_sht', group: 'sensors', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.capSht', message: 'On-board SHT4x capability'}),
  },
  {
    key: 'cap_barometer', group: 'sensors', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.capBarometer', message: 'Barometer capability'}),
  },
  {
    key: 'cap_light_sensor', group: 'sensors', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.capLightSensor', message: 'Light sensor capability'}),
  },
  {
    key: 'cap_accelerometer', group: 'sensors', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.capAccelerometer', message: 'Accelerometer capability'}),
  },
  {
    key: 'accel_motion_sensitivity', group: 'sensors', type: 'enum', def: 0,
    label: () => translate({id: 'sticker.downlinkGenerator.config.motionSensitivity', message: 'Motion sensitivity'}),
    options: [
      [offLabel, 0],
      [() => translate({id: 'sticker.downlinkGenerator.option.low', message: 'Low'}), 1],
      [() => translate({id: 'sticker.downlinkGenerator.option.medium', message: 'Medium'}), 2],
      [() => translate({id: 'sticker.downlinkGenerator.option.high', message: 'High'}), 3],
    ],
  },
  {
    key: 'cap_hall_left', group: 'sensors', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.capHallLeft', message: 'Hall left capability'}),
  },
  {
    key: 'cap_hall_right', group: 'sensors', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.capHallRight', message: 'Hall right capability'}),
  },
  {
    key: 'cap_w1_sensors', group: 'sensors', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.capW1Sensors', message: '1-Wire sensors capability'}),
  },
  {
    key: 'cap_gpio_mode', group: 'sensors', type: 'enum', def: 0,
    label: () => translate({id: 'sticker.downlinkGenerator.config.gpioMode', message: 'GP pin owner'}),
    options: [
      [() => translate({id: 'sticker.downlinkGenerator.option.none', message: 'None'}), 0],
      [() => translate({id: 'sticker.downlinkGenerator.option.inputs', message: 'Inputs'}), 1],
      [() => translate({id: 'sticker.downlinkGenerator.option.pir', message: 'PIR'}), 2],
      [() => translate({id: 'sticker.downlinkGenerator.option.buzzer', message: 'Buzzer'}), 3],
    ],
  },
  {
    key: 'cap_gpio_input_a', group: 'sensors', type: 'enum', def: 0, options: GPIO_INPUT_OPTIONS,
    label: () => translate({id: 'sticker.downlinkGenerator.config.inputMode', message: 'Input {input} mode'}, {input: 'A'}),
  },
  {
    key: 'cap_gpio_input_b', group: 'sensors', type: 'enum', def: 0, options: GPIO_INPUT_OPTIONS,
    label: () => translate({id: 'sticker.downlinkGenerator.config.inputMode', message: 'Input {input} mode'}, {input: 'B'}),
  },
  {
    key: 'alarm_limit', group: 'alarms', type: 'int', def: '10', min: 0, max: 3600,
    label: () => translate({id: 'sticker.downlinkGenerator.config.alarmLimit', message: 'Alarm limit (s between alarm uplinks, 0-3600)'}),
  },
  {
    key: 'alarm_buzzer_mode', group: 'alarms', type: 'enum', def: 0,
    label: () => translate({id: 'sticker.downlinkGenerator.config.alarmBuzzerMode', message: 'Alarm buzzer mode'}),
    options: [
      [offLabel, 0],
      [() => translate({id: 'sticker.downlinkGenerator.option.once', message: 'Once'}), 1],
      [() => translate({id: 'sticker.downlinkGenerator.option.slow', message: 'Slow (120 s)'}), 2],
      [() => translate({id: 'sticker.downlinkGenerator.option.normal', message: 'Normal (30 s)'}), 3],
      [() => translate({id: 'sticker.downlinkGenerator.option.fast', message: 'Fast (10 s)'}), 4],
      [() => translate({id: 'sticker.downlinkGenerator.option.continuous', message: 'Continuous'}), 5],
    ],
  },
  {
    key: 'radio_alarm_ack', group: 'alarms', type: 'bool', def: true,
    label: () => translate({id: 'sticker.downlinkGenerator.config.radioAlarmAck', message: 'Confirmed alarm uplinks'}),
  },
];

// Commands without a body that the device accepts over a radio downlink.
const SIMPLE = [
  ['get_info', () => translate({id: 'sticker.downlinkGenerator.command.getInfo', message: 'Get device info'})],
  ['get_settings', () => translate({id: 'sticker.downlinkGenerator.command.getSettings', message: 'Get settings info'})],
  ['get_radio_state', () => translate({id: 'sticker.downlinkGenerator.command.getRadioState', message: 'Get radio state'})],
  ['get_config', () => translate({id: 'sticker.downlinkGenerator.command.getConfig', message: 'Dump configuration'})],
  ['force_send', () => translate({id: 'sticker.downlinkGenerator.command.forceSend', message: 'Force a report now'})],
  ['sample', () => translate({id: 'sticker.downlinkGenerator.command.sample', message: 'Sample sensors now'})],
  ['w1_scan', () => translate({id: 'sticker.downlinkGenerator.command.w1Scan', message: 'Scan 1-Wire bus'})],
  ['clock_sync', () => translate({id: 'sticker.downlinkGenerator.command.clockSync', message: 'Sync wall clock'})],
  ['lrw_join', () => translate({id: 'sticker.downlinkGenerator.command.lrwJoin', message: 'Force (re)join'})],
  ['settings_save', () => translate({id: 'sticker.downlinkGenerator.command.settingsSave', message: 'Save config (reboots)'})],
  ['reboot', () => translate({id: 'sticker.downlinkGenerator.command.reboot', message: 'Reboot'})],
];

const buzzerKinds = () => [
  [translate({id: 'sticker.downlinkGenerator.melody.stop', message: 'Stop'}), 0],
  [translate({id: 'sticker.downlinkGenerator.melody.info', message: 'Info'}), 1],
  [translate({id: 'sticker.downlinkGenerator.melody.warning', message: 'Warning'}), 2],
  [translate({id: 'sticker.downlinkGenerator.melody.alarm', message: 'Alarm'}), 3],
];

const DEFAULT_RULE = {
  rule: '0', action: 'set', enabled: true, slot: 'onboard', w1type: '2', channel: '0',
  lo: '5', hi: '30', dwell: '0', from: '0', to: '1', count: '10',
};
const defaultCfgRow = () => ({key: CONFIG_FIELDS[0].key, value: CONFIG_FIELDS[0].def});

const toHex = (bytes) => (bytes || []).map((b) => (b & 0xff).toString(16).padStart(2, '0')).join('');

function encodeObject(obj) {
  let r;
  try {
    r = codec.encodeDownlink({data: obj});
  } catch (e) {
    return {error: translate({id: 'sticker.downlinkGenerator.error.encoding', message: 'Encoding failed: {message}'}, {message: e.message})};
  }
  const errors = (r.errors || []).filter(Boolean);
  if (errors.length) return {error: errors.join('; ')};
  return {hex: toHex(r.bytes), fPort: r.fPort, warnings: (r.warnings || []).filter(Boolean)};
}

const copy = (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(text);
};

export default function StickerDownlinkGenerator() {
  const [cmd, setCmd] = useState('get_info');
  const [seq, setSeq] = useState('1');
  const [saveAfter, setSaveAfter] = useState(true); // set_param: persist + reboot
  const [replaceAll, setReplaceAll] = useState(false); // set_param: alarms_replace

  const [cfgRows, setCfgRows] = useState([defaultCfgRow()]);
  const [aRules, setARules] = useState([{...DEFAULT_RULE}]);

  const [cHallL, setCHallL] = useState(true);
  const [cHallR, setCHallR] = useState(false);
  const [cInA, setCInA] = useState(false);
  const [cInB, setCInB] = useState(false);

  const [hFrom, setHFrom] = useState('1780000000');
  const [hTo, setHTo] = useState('1780003600');

  const [bKind, setBKind] = useState('3');
  const [bRepeat, setBRepeat] = useState('0');

  const [custom, setCustom] = useState('{\n  "command": "get_info",\n  "seq": 1\n}');

  const seqN = int(seq, 1) & 0xff;

  // --- config row helpers ---
  const updCfg = (i, patch) => setCfgRows((rs) => rs.map((r, j) => (j === i ? {...r, ...patch} : r)));
  const addCfg = () => setCfgRows((rs) => [...rs, defaultCfgRow()]);
  const rmCfg = (i) => setCfgRows((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : rs));

  // --- alarm rule helpers ---
  // Changing the slot or the sensor type keeps the channel only if the new
  // sensor type has it.
  const updRule = (i, patch) =>
    setARules((rs) =>
      rs.map((r, j) => {
        if (j !== i) return r;
        const n = {...r, ...patch};
        const chs = channelsFor(ruleSensorType(n));
        if (!chs.some((c) => c.id === int(n.channel, -1))) n.channel = chs.length ? String(chs[0].id) : '0';
        return n;
      }),
    );
  const addRule = () =>
    setARules((rs) => {
      const used = rs.map((r) => int(r.rule, 0));
      let next = 0;
      while (next < 15 && used.includes(next)) next++;
      return [...rs, {...DEFAULT_RULE, rule: String(next)}];
    });
  const rmRule = (i) => setARules((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : rs));

  const built = useMemo(() => {
    if (SIMPLE.some(([k]) => k === cmd)) return {command: cmd, seq: seqN};

    if (cmd === 'set_param_config') {
      const sp = {};
      for (const row of cfgRows) {
        const f = CONFIG_FIELDS.find((x) => x.key === row.key);
        if (!f) continue;
        const value = f.type === 'bool' ? row.value === true || row.value === 'true' : int(row.value, 0);
        sp[f.group] = {...(sp[f.group] || {}), [f.key]: value};
      }
      if (saveAfter) sp.save = true;
      return {command: 'set_param', seq: seqN, set_param: sp};
    }

    if (cmd === 'set_param_alarm') {
      const alarms = {};
      for (const r of aRules) {
        const idx = Math.max(0, Math.min(15, int(r.rule, 0)));
        const ch = ruleChannel(r);
        if (r.action === 'clear' || !ch) {
          alarms['alarm_' + idx] = EMPTY_RULE;
          continue;
        }
        alarms['alarm_' + idx] = packAlarm({
          enabled: r.enabled,
          slot: byId(SLOTS, r.slot).value,
          channel: ch.id,
          sensorType: ruleSensorType(r),
          kind: ch.kind,
          from: r.from === '1',
          to: r.to === '1',
          lo: num(r.lo),
          hi: ch.kind === 'rate' ? num(r.count) : num(r.hi),
          dwell: num(r.dwell),
        });
      }
      const sp = {alarms};
      if (saveAfter) sp.save = true;
      if (replaceAll) sp.alarms_replace = true;
      return {command: 'set_param', seq: seqN, set_param: sp};
    }

    if (cmd === 'reset_counters') {
      const rc = {};
      if (cHallL) rc.hall_left = true;
      if (cHallR) rc.hall_right = true;
      if (cInA) rc.input_a = true;
      if (cInB) rc.input_b = true;
      return {command: 'reset_counters', seq: seqN, reset_counters: rc};
    }

    if (cmd === 'req_history') {
      return {command: 'req_history', seq: seqN, req_history: {from_unix: int(hFrom, 0), to_unix: int(hTo, 0)}};
    }

    if (cmd === 'buzzer_play') {
      const bp = {kind: int(bKind, 0)};
      const rep = int(bRepeat, 0);
      if (rep > 0) bp.repeat_s = rep;
      return {command: 'buzzer_play', seq: seqN, buzzer_play: bp};
    }

    return null;
  }, [cmd, seqN, cfgRows, aRules, saveAfter, replaceAll, cHallL, cHallR, cInA, cInB, hFrom, hTo, bKind, bRepeat]);

  const jsonText = cmd === 'custom' ? custom : built ? JSON.stringify(built, null, 2) : '';

  const result = useMemo(() => {
    if (cmd === 'custom') {
      let obj;
      try {
        obj = JSON.parse(custom);
      } catch (e) {
        return {error: translate({id: 'sticker.downlinkGenerator.error.json', message: 'Invalid JSON: {message}'}, {message: e.message})};
      }
      return encodeObject(obj);
    }
    if (cmd === 'set_param_config') {
      // The device answers OUT_OF_RANGE outside these limits (app_config_ingest.c).
      for (const row of cfgRows) {
        const f = CONFIG_FIELDS.find((x) => x.key === row.key);
        if (!f || f.type !== 'int' || f.min === undefined) continue;
        const v = parseFloat(row.value);
        const ok = Number.isInteger(v) && ((v >= f.min && v <= f.max) || (f.zero && v === 0));
        if (!ok) {
          const range = {key: f.key, min: f.min, max: f.max};
          return {
            error: f.zero
              ? translate({id: 'sticker.downlinkGenerator.error.rangeZero', message: '{key} must be 0 or {min} to {max}, or the device rejects it.'}, range)
              : translate({id: 'sticker.downlinkGenerator.error.range', message: '{key} must be {min} to {max}, or the device rejects it.'}, range),
          };
        }
      }
    }
    if (cmd === 'set_param_alarm') {
      for (const r of aRules) {
        if (r.action !== 'set') continue;
        const err = ruleError(r);
        if (err) {
          return {
            error: translate(
              {id: 'sticker.downlinkGenerator.error.rule', message: 'Rule {rule}: {error}, or the device rejects the rule.'},
              {rule: r.rule, error: err},
            ),
          };
        }
      }
    }
    if (cmd === 'buzzer_play') {
      const rep = int(bRepeat, 0);
      if (rep < 0 || rep > 999) return {error: translate({id: 'sticker.downlinkGenerator.error.repeat', message: 'Repeat must be 0 to 999 s.'})};
    }
    return built ? encodeObject(built) : {error: translate({id: 'sticker.downlinkGenerator.error.nothing', message: 'Nothing to encode'})};
  }, [cmd, custom, built, aRules, cfgRows, bRepeat]);

  const removeLabel = translate({id: 'sticker.downlinkGenerator.button.remove', message: 'Remove'});

  return (
    <div className={styles.generator}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="sdg-cmd">{translate({id: 'sticker.downlinkGenerator.label.command', message: 'Command'})}</label>
        <select id="sdg-cmd" className={styles.select} value={cmd} onChange={(e) => setCmd(e.target.value)}>
          <optgroup label={translate({id: 'sticker.downlinkGenerator.group.actions', message: 'Actions'})}>
            {SIMPLE.map(([k, l]) => <option key={k} value={k}>{l()}</option>)}
          </optgroup>
          <optgroup label={translate({id: 'sticker.downlinkGenerator.group.parameters', message: 'Parameters'})}>
            <option value="set_param_config">{translate({id: 'sticker.downlinkGenerator.command.setConfig', message: 'Set configuration parameters'})}</option>
            <option value="set_param_alarm">{translate({id: 'sticker.downlinkGenerator.command.setAlarms', message: 'Set alarm rules'})}</option>
            <option value="reset_counters">{translate({id: 'sticker.downlinkGenerator.command.resetCounters', message: 'Reset counters'})}</option>
            <option value="req_history">{translate({id: 'sticker.downlinkGenerator.command.reqHistory', message: 'Request history'})}</option>
            <option value="buzzer_play">{translate({id: 'sticker.downlinkGenerator.command.buzzerPlay', message: 'Play buzzer melody'})}</option>
          </optgroup>
          <optgroup label={translate({id: 'sticker.downlinkGenerator.group.advanced', message: 'Advanced'})}>
            <option value="custom">{translate({id: 'sticker.downlinkGenerator.command.custom', message: 'Custom JSON'})}</option>
          </optgroup>
        </select>
      </div>

      {cmd !== 'custom' && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sdg-seq">{translate({id: 'sticker.downlinkGenerator.label.seq', message: 'Sequence number (echoed in reply)'})}</label>
          <input id="sdg-seq" className={styles.input} type="number" min="0" max="255" value={seq} onChange={(e) => setSeq(e.target.value)} />
        </div>
      )}

      {cmd === 'set_param_config' && (
        <div className={styles.field}>
          <label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.parameters', message: 'Parameters'})}</label>
          {cfgRows.map((row, i) => {
            const f = CONFIG_FIELDS.find((x) => x.key === row.key);
            return (
              <div key={i} className={styles.inline}>
                <select className={styles.select} value={row.key}
                  onChange={(e) => {
                    const nf = CONFIG_FIELDS.find((x) => x.key === e.target.value);
                    updCfg(i, {key: nf.key, value: nf.def});
                  }}>
                  {CONFIG_FIELDS.map((cf) => <option key={cf.key} value={cf.key}>{cf.label()}</option>)}
                </select>
                {f.type === 'bool' ? (
                  <select className={styles.select} value={String(row.value)} onChange={(e) => updCfg(i, {value: e.target.value === 'true'})}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : f.type === 'enum' ? (
                  <select className={styles.select} value={row.value} onChange={(e) => updCfg(i, {value: int(e.target.value)})}>
                    {f.options.map(([l, v]) => <option key={v} value={v}>{l()}</option>)}
                  </select>
                ) : (
                  <input className={styles.input} type="number" value={row.value} onChange={(e) => updCfg(i, {value: e.target.value})} />
                )}
                {cfgRows.length > 1 && <button type="button" className={styles.remove} onClick={() => rmCfg(i)}>{removeLabel}</button>}
              </div>
            );
          })}
          <button type="button" className={styles.button} onClick={addCfg}>{translate({id: 'sticker.downlinkGenerator.button.addParameter', message: '+ Add parameter'})}</button>
        </div>
      )}

      {cmd === 'set_param_alarm' && (
        <div className={styles.field}>
          <label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.alarmRules', message: 'Alarm rules'})}</label>
          {aRules.map((r, i) => {
            const sType = ruleSensorType(r);
            const chs = channelsFor(sType);
            const ch = ruleChannel(r);
            const err = r.action === 'set' ? ruleError(r) : null;
            const unit = ch ? unitLabel(ch.unit) : '';
            return (
              <div key={i} className={styles.rule}>
                <div className={styles.inline}>
                  <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.rule', message: 'Rule (0-15)'})}</label><input className={styles.inputSm} type="number" min="0" max="15" value={r.rule} onChange={(e) => updRule(i, {rule: e.target.value})} /></div>
                  <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.action', message: 'Action'})}</label>
                    <select className={styles.select} value={r.action} onChange={(e) => updRule(i, {action: e.target.value})}>
                      <option value="set">{translate({id: 'sticker.downlinkGenerator.option.setRule', message: 'Set rule'})}</option>
                      <option value="clear">{translate({id: 'sticker.downlinkGenerator.option.clearRule', message: 'Clear rule'})}</option>
                    </select>
                  </div>
                  {aRules.length > 1 && <button type="button" className={styles.remove} onClick={() => rmRule(i)}>{removeLabel}</button>}
                </div>
                {r.action === 'set' && ch && (
                  <>
                    <div className={styles.inline}>
                      <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.slot', message: 'Slot'})}</label>
                        <select className={styles.select} value={r.slot} onChange={(e) => updRule(i, {slot: e.target.value})}>
                          {SLOTS.map((s) => <option key={s.id} value={s.id}>{slotLabel(s)}</option>)}
                        </select>
                      </div>
                      {r.slot !== 'onboard' && (
                        <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.sensorType', message: 'Sensor type'})}</label>
                          <select className={styles.select} value={r.w1type} onChange={(e) => updRule(i, {w1type: e.target.value})}>
                            {w1Types().map((t) => <option key={t.value} value={String(t.value)}>{t.label}</option>)}
                          </select>
                        </div>
                      )}
                      <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.channel', message: 'Channel'})}</label>
                        <select className={styles.select} value={String(ch.id)} onChange={(e) => updRule(i, {channel: e.target.value})}>
                          {chs.map((c) => <option key={c.id} value={String(c.id)}>{c.label}</option>)}
                        </select>
                      </div>
                      <label className={styles.check}><input type="checkbox" checked={r.enabled} onChange={(e) => updRule(i, {enabled: e.target.checked})} /> {translate({id: 'sticker.downlinkGenerator.label.enabled', message: 'Enabled'})}</label>
                    </div>
                    {ch.kind === 'threshold' && (
                      <div className={styles.inline}>
                        <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.low', message: 'Low ({unit})'}, {unit})}</label><input className={styles.inputSm} type="number" value={r.lo} onChange={(e) => updRule(i, {lo: e.target.value})} /></div>
                        <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.high', message: 'High ({unit})'}, {unit})}</label><input className={styles.inputSm} type="number" value={r.hi} onChange={(e) => updRule(i, {hi: e.target.value})} /></div>
                      </div>
                    )}
                    {ch.kind === 'state' && (
                      <div className={styles.inline}>
                        <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.from', message: 'From'})}</label><select className={styles.inputSm} value={r.from} onChange={(e) => updRule(i, {from: e.target.value})}><option value="0">0</option><option value="1">1</option></select></div>
                        <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.to', message: 'To'})}</label><select className={styles.inputSm} value={r.to} onChange={(e) => updRule(i, {to: e.target.value})}><option value="0">0</option><option value="1">1</option></select></div>
                        <span className={styles.hint}>{stateHint(r, ch)}</span>
                      </div>
                    )}
                    {ch.kind === 'rate' && (
                      <div className={styles.inline}>
                        <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.eventsPerWindow', message: 'Events per window'})}</label><input className={styles.inputSm} type="number" min="0" value={r.count} onChange={(e) => updRule(i, {count: e.target.value})} /></div>
                      </div>
                    )}
                    <div className={styles.inline}>
                      <div>
                        <label className={styles.label}>
                          {ch.kind === 'threshold'
                            ? translate({id: 'sticker.downlinkGenerator.label.hysteresis', message: 'Hysteresis ({unit})'}, {unit})
                            : ch.kind === 'rate'
                              ? translate({id: 'sticker.downlinkGenerator.label.window', message: 'Window (s)'})
                              : translate({id: 'sticker.downlinkGenerator.label.dwell', message: 'Dwell (s)'})}
                        </label>
                        <input className={styles.inputSm} type="number" min="0" value={r.dwell} onChange={(e) => updRule(i, {dwell: e.target.value})} />
                        {err && <span className={styles.fieldErr}>{err}</span>}
                      </div>
                      <span className={`${styles.hint} ${styles.dwellHint}`}>{dwellHint(r, ch)}</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
          <button type="button" className={styles.button} onClick={addRule}>{translate({id: 'sticker.downlinkGenerator.button.addRule', message: '+ Add alarm rule'})}</button>
          <label className={styles.check}>
            <input type="checkbox" checked={replaceAll} onChange={(e) => setReplaceAll(e.target.checked)} />{' '}
            <span>
              {translate(
                {
                  id: 'sticker.downlinkGenerator.label.replaceAll',
                  message: 'Replace whole alarm table: clears every rule not listed here (adds {code}; in a multi-downlink batch, use it on the first message only)',
                },
                {code: <code>alarms_replace: true</code>},
              )}
            </span>
          </label>
        </div>
      )}

      {cmd === 'reset_counters' && (
        <div className={styles.field}>
          <label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.counters', message: 'Counters to clear'})}</label>
          <div className={styles.inline}>
            <label className={styles.check}><input type="checkbox" checked={cHallL} onChange={(e) => setCHallL(e.target.checked)} /> {translate({id: 'sticker.downlinkGenerator.label.hallLeft', message: 'Hall left'})}</label>
            <label className={styles.check}><input type="checkbox" checked={cHallR} onChange={(e) => setCHallR(e.target.checked)} /> {translate({id: 'sticker.downlinkGenerator.label.hallRight', message: 'Hall right'})}</label>
            <label className={styles.check}><input type="checkbox" checked={cInA} onChange={(e) => setCInA(e.target.checked)} /> {translate({id: 'sticker.downlinkGenerator.label.input', message: 'Input {input}'}, {input: 'A'})}</label>
            <label className={styles.check}><input type="checkbox" checked={cInB} onChange={(e) => setCInB(e.target.checked)} /> {translate({id: 'sticker.downlinkGenerator.label.input', message: 'Input {input}'}, {input: 'B'})}</label>
          </div>
        </div>
      )}

      {cmd === 'req_history' && (
        <div className={styles.field}>
          <div className={styles.inline}>
            <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.fromUnix', message: 'From (Unix s)'})}</label><input className={styles.input} type="number" value={hFrom} onChange={(e) => setHFrom(e.target.value)} /></div>
            <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.toUnix', message: 'To (Unix s)'})}</label><input className={styles.input} type="number" value={hTo} onChange={(e) => setHTo(e.target.value)} /></div>
          </div>
        </div>
      )}

      {cmd === 'buzzer_play' && (
        <div className={styles.field}>
          <div className={styles.inline}>
            <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.melody', message: 'Melody'})}</label>
              <select className={styles.select} value={bKind} onChange={(e) => setBKind(e.target.value)}>
                {buzzerKinds().map(([l, v]) => <option key={v} value={String(v)}>{l}</option>)}
              </select>
            </div>
            <div><label className={styles.label}>{translate({id: 'sticker.downlinkGenerator.label.repeat', message: 'Repeat every (s, 0 = once)'})}</label><input className={styles.inputSm} type="number" min="0" max="999" value={bRepeat} onChange={(e) => setBRepeat(e.target.value)} /></div>
          </div>
          <span className={styles.hint}>
            {translate(
              {
                id: 'sticker.downlinkGenerator.hint.buzzer',
                message: 'Needs the buzzer hardware variant and {code} set to Buzzer. Stop also cancels a repeating melody.',
              },
              {code: <code>cap_gpio_mode</code>},
            )}
          </span>
        </div>
      )}

      {cmd === 'custom' && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sdg-custom">{translate({id: 'sticker.downlinkGenerator.label.jsonCommand', message: 'JSON command'})}</label>
          <textarea id="sdg-custom" className={styles.textarea} rows={8} spellCheck={false} value={custom} onChange={(e) => setCustom(e.target.value)} />
        </div>
      )}

      {(cmd === 'set_param_config' || cmd === 'set_param_alarm') && (
        <div className={styles.field}>
          <label className={styles.check}>
            <input type="checkbox" checked={saveAfter} onChange={(e) => setSaveAfter(e.target.checked)} />{' '}
            <span>
              {translate(
                {id: 'sticker.downlinkGenerator.label.saveAfter', message: 'Save and reboot after applying (adds {code})'},
                {code: <code>save: true</code>},
              )}
            </span>
          </label>
        </div>
      )}

      {cmd !== 'custom' && (
        <div className={styles.field}>
          <div className={styles.outputHead}>
            <label className={styles.label}>JSON</label>
            <button type="button" className={styles.button} onClick={() => copy(jsonText)}>{translate({id: 'sticker.downlinkGenerator.button.copyJson', message: 'Copy JSON'})}</button>
          </div>
          <code className={styles.code}>{jsonText}</code>
        </div>
      )}

      <div className={styles.field}>
        {result.error ? (
          <div className={styles.error}>{result.error}</div>
        ) : (
          <>
            <div className={styles.outputHead}>
              <span className={styles.port}>Hex &middot; fPort {result.fPort}</span>
              <button type="button" className={styles.button} onClick={() => copy(result.hex)}>{translate({id: 'sticker.downlinkGenerator.button.copyHex', message: 'Copy hex'})}</button>
            </div>
            <code className={styles.hex}>{result.hex || translate({id: 'sticker.downlinkGenerator.emptyPayload', message: '(empty payload)'})}</code>
            {result.warnings && result.warnings.length > 0 && (
              <div className={styles.warning}>{translate({id: 'sticker.downlinkGenerator.warnings', message: 'Warnings: {warnings}'}, {warnings: result.warnings.join('; ')})}</div>
            )}
          </>
        )}
      </div>

      <p className={styles.note}>
        {translate(
          {
            id: 'sticker.downlinkGenerator.note',
            message: 'Encoding runs in your browser with the STICKER {codec} codec, pinned to firmware {version}. Queue the hex on fPort 85, or send the JSON if the codec is installed as the downlink payload formatter.',
          },
          {codec: <code>ttn.js</code>, version: 'v2.0.0'},
        )}
      </p>
    </div>
  );
}

// Pure helpers, exported for tests.
export {packAlarm, channelsFor, ruleError, EMPTY_RULE, CONFIG_FIELDS, SIMPLE};
