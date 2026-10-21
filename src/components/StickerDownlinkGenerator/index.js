import React, {useMemo, useState} from 'react';
import * as ttnModule from './ttn';
import styles from './styles.module.css';

// The vendored ttn.js is CommonJS (module.exports). Resolve the codec object
// across webpack interop shapes (named, default, or namespace).
const codec = ttnModule.encodeDownlink ? ttnModule : ttnModule.default || ttnModule;

// --- Alarm rule model (app_config.yml / app_alarm_rules.c / app_sensor_types.yaml, v2.0.0) ---
// A rule addresses a value as (slot, channel): slot 0 is the on-board sensors
// (sensor type 1, motherboard), slots 1-4 are the 1-Wire sensors s1-s4 and
// carry the sensor type the rule is written for.
const SLOTS = [
  {id: 'onboard', value: 0, label: 'On-board'},
  {id: 's1', value: 1, label: '1-Wire slot 1 (s1)'},
  {id: 's2', value: 2, label: '1-Wire slot 2 (s2)'},
  {id: 's3', value: 3, label: '1-Wire slot 3 (s3)'},
  {id: 's4', value: 4, label: '1-Wire slot 4 (s4)'},
];

const SENSOR_TYPE_MB = 1;
// 1-Wire sensor types a slot can expect (registry ids in app_sensor_types.yaml).
const W1_TYPES = [
  {value: 2, label: 'Dallas (DS18B20)'},
  {value: 3, label: 'Machine probe'},
];

// Channel labels from app_sensor_types.yaml. The channel list itself (index =
// channel id, unit, kind) comes from the codec's sensorTypes registry.
const CHANNEL_LABELS = {
  1: {
    temperature: 'Temperature (SHT4x)',
    humidity: 'Relative humidity (SHT4x)',
    pressure: 'Pressure (MPL3115A2)',
    illuminance: 'Illuminance (OPT3001)',
    'temperature-baro': 'Temperature (MPL3115A2)',
    'hall-left-state': 'Hall left: state',
    'hall-left-count': 'Hall left: pulse count',
    'hall-right-state': 'Hall right: state',
    'hall-right-count': 'Hall right: pulse count',
    'input-a-state': 'Input A: state',
    'input-a-count': 'Input A: pulse count',
    'input-a-voltage': 'Input A: voltage',
    'input-b-state': 'Input B: state',
    'input-b-count': 'Input B: pulse count',
    'input-b-voltage': 'Input B: voltage',
    'pir-motion': 'PIR: motion',
    'pir-count': 'PIR: motion count',
    'accel-motion': 'Accelerometer: motion',
    'accel-count': 'Accelerometer: motion count',
  },
  2: {temperature: 'Temperature'},
  3: {
    temperature: 'Temperature (SHT)',
    humidity: 'Relative humidity (SHT)',
    'temperature-aux': 'Temperature (TMP112)',
    illuminance: 'Illuminance (OPT3001)',
    'magnetic-field': 'Magnetic field (Si7210)',
    tilt: 'Tilt alert (LIS2DH12)',
    'accel-x': 'Acceleration X (LIS2DH12)',
    'accel-y': 'Acceleration Y (LIS2DH12)',
    'accel-z': 'Acceleration Z (LIS2DH12)',
  },
};

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
  const labels = CHANNEL_LABELS[sensorType] || {};
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
  if (!ch) return 'no channel selected';
  const d = num(r.dwell);
  if (ch.kind === 'threshold') {
    if (!(num(r.hi) > num(r.lo))) return 'High must be greater than Low';
    if (d < 0 || d > num(r.hi) - num(r.lo)) return 'hysteresis must be 0 to High − Low';
    return null;
  }
  if (ch.kind === 'rate' && num(r.count) < 0) return 'events per window must be 0 or more';
  if (d < 0 || d > DWELL_MAX) return `${ch.kind === 'rate' ? 'window' : 'dwell'} must be 0 to ${DWELL_MAX} s`;
  return null;
}

// What dwell does for the rule's kind (eval_threshold/eval_state/eval_count in app_alarm.c).
function dwellHint(r, ch) {
  if (ch.kind === 'threshold') {
    return 'Deadband in the channel units: the alarm fires as soon as the value leaves Low to High and clears only below High − hysteresis / above Low + hysteresis (0 = clears as soon as it is back inside).';
  }
  if (ch.kind === 'rate') {
    return 'Window length in seconds (0 = report interval). Fires as soon as the count rises by Events per window within one window; a sustained rate stays one alarm.';
  }
  if (MOMENTARY.includes(ch.name)) {
    if (r.from === '1' && r.to === '1') return 'Motion state: the first event fires (motion started); the alarm clears (motion ended) after this many seconds with no event.';
    if (r.from === '0' && r.to === '0') return 'Stillness: fires (stopped) after this many seconds with no event; the next event clears it (moving again).';
    return 'Fires on each event, then waits this many seconds before it can fire again.';
  }
  if (r.from === r.to) return 'Seconds the line must stay at To before the alarm fires (0 = immediately).';
  return 'Seconds the line must stay at To after the transition before the alarm fires; it then stays active as long before it can fire again (0 = immediately).';
}

function stateHint(r, ch) {
  if (MOMENTARY.includes(ch.name)) {
    if (r.from === '1' && r.to === '1') return 'motion started / ended';
    if (r.from === '0' && r.to === '0') return 'stillness (no motion for dwell)';
    return 'edge (fires on each event)';
  }
  return r.from === r.to ? 'level (active while line = To)' : 'edge (fires on this transition)';
}

// Configuration parameters writable over a radio downlink (application,
// sensors and alarms groups; the lorawan group is rejected over the air).
// Enum values are sent as numbers (the proto enum index).
const GPIO_INPUT_OPTIONS = [['Disabled', 0], ['Digital', 1], ['Analog (0-24 V)', 2], ['Pulse counter', 3]];
const CONFIG_FIELDS = [
  // Integer ranges from app_config.yml (min/max; zero = 0 also accepted, extras.zero_allowed).
  {key: 'interval_report', group: 'application', label: 'Report interval (s, 60-86400)', type: 'int', def: '900', min: 60, max: 86400},
  {key: 'interval_sample', group: 'application', label: 'Sample interval (s, 5-3600, 0 = before each report)', type: 'int', def: '60', min: 5, max: 3600, zero: true},
  {key: 'interval_announce', group: 'application', label: 'Announce interval (h, 1-168, 0 = off)', type: 'int', def: '24', min: 1, max: 168, zero: true},
  {key: 'history_enable', group: 'application', label: 'History enable', type: 'bool', def: true},
  {key: 'battery_level', group: 'application', label: 'Low-battery threshold (mV, 1000-3600)', type: 'int', def: '2400', min: 1000, max: 3600},
  {key: 'cap_sht', group: 'sensors', label: 'On-board SHT4x capability', type: 'bool', def: true},
  {key: 'cap_barometer', group: 'sensors', label: 'Barometer capability', type: 'bool', def: true},
  {key: 'cap_light_sensor', group: 'sensors', label: 'Light sensor capability', type: 'bool', def: true},
  {key: 'cap_accelerometer', group: 'sensors', label: 'Accelerometer capability', type: 'bool', def: true},
  {key: 'accel_motion_sensitivity', group: 'sensors', label: 'Motion sensitivity', type: 'enum', def: 0, options: [['Off', 0], ['Low', 1], ['Medium', 2], ['High', 3]]},
  {key: 'cap_hall_left', group: 'sensors', label: 'Hall left capability', type: 'bool', def: true},
  {key: 'cap_hall_right', group: 'sensors', label: 'Hall right capability', type: 'bool', def: true},
  {key: 'cap_w1_sensors', group: 'sensors', label: '1-Wire sensors capability', type: 'bool', def: true},
  {key: 'cap_gpio_mode', group: 'sensors', label: 'GP pin owner', type: 'enum', def: 0, options: [['None', 0], ['Inputs', 1], ['PIR', 2], ['Buzzer', 3]]},
  {key: 'cap_gpio_input_a', group: 'sensors', label: 'Input A mode', type: 'enum', def: 0, options: GPIO_INPUT_OPTIONS},
  {key: 'cap_gpio_input_b', group: 'sensors', label: 'Input B mode', type: 'enum', def: 0, options: GPIO_INPUT_OPTIONS},
  {key: 'alarm_limit', group: 'alarms', label: 'Alarm limit (s between alarm uplinks, 0-3600)', type: 'int', def: '10', min: 0, max: 3600},
  {key: 'alarm_buzzer_mode', group: 'alarms', label: 'Alarm buzzer mode', type: 'enum', def: 0, options: [['Off', 0], ['Once', 1], ['Slow (120 s)', 2], ['Normal (30 s)', 3], ['Fast (10 s)', 4], ['Continuous', 5]]},
  {key: 'radio_alarm_ack', group: 'alarms', label: 'Confirmed alarm uplinks', type: 'bool', def: true},
];

// Commands without a body that the device accepts over a radio downlink.
const SIMPLE = [
  ['get_info', 'Get device info'],
  ['get_settings', 'Get settings info'],
  ['get_radio_state', 'Get radio state'],
  ['get_config', 'Dump configuration'],
  ['force_send', 'Force a report now'],
  ['sample', 'Sample sensors now'],
  ['w1_scan', 'Scan 1-Wire bus'],
  ['clock_sync', 'Sync wall clock'],
  ['lrw_join', 'Force (re)join'],
  ['settings_save', 'Save config (reboots)'],
  ['reboot', 'Reboot'],
];

const BUZZER_KINDS = [['Stop', 0], ['Info', 1], ['Warning', 2], ['Alarm', 3]];

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
    return {error: 'Encoding failed: ' + e.message};
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
        return {error: 'Invalid JSON: ' + e.message};
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
        if (!ok) return {error: `${f.key} must be ${f.zero ? '0 or ' : ''}${f.min} to ${f.max}, or the device rejects it.`};
      }
    }
    if (cmd === 'set_param_alarm') {
      for (const r of aRules) {
        if (r.action !== 'set') continue;
        const err = ruleError(r);
        if (err) return {error: `Rule ${r.rule}: ${err}, or the device rejects the rule.`};
      }
    }
    if (cmd === 'buzzer_play') {
      const rep = int(bRepeat, 0);
      if (rep < 0 || rep > 999) return {error: 'Repeat must be 0 to 999 s.'};
    }
    return built ? encodeObject(built) : {error: 'Nothing to encode'};
  }, [cmd, custom, built, aRules, cfgRows, bRepeat]);

  return (
    <div className={styles.generator}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="sdg-cmd">Command</label>
        <select id="sdg-cmd" className={styles.select} value={cmd} onChange={(e) => setCmd(e.target.value)}>
          <optgroup label="Actions">
            {SIMPLE.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </optgroup>
          <optgroup label="Parameters">
            <option value="set_param_config">Set configuration parameters</option>
            <option value="set_param_alarm">Set alarm rules</option>
            <option value="reset_counters">Reset counters</option>
            <option value="req_history">Request history</option>
            <option value="buzzer_play">Play buzzer melody</option>
          </optgroup>
          <optgroup label="Advanced">
            <option value="custom">Custom JSON</option>
          </optgroup>
        </select>
      </div>

      {cmd !== 'custom' && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sdg-seq">Sequence number (echoed in reply)</label>
          <input id="sdg-seq" className={styles.input} type="number" min="0" max="255" value={seq} onChange={(e) => setSeq(e.target.value)} />
        </div>
      )}

      {cmd === 'set_param_config' && (
        <div className={styles.field}>
          <label className={styles.label}>Parameters</label>
          {cfgRows.map((row, i) => {
            const f = CONFIG_FIELDS.find((x) => x.key === row.key);
            return (
              <div key={i} className={styles.inline}>
                <select className={styles.select} value={row.key}
                  onChange={(e) => {
                    const nf = CONFIG_FIELDS.find((x) => x.key === e.target.value);
                    updCfg(i, {key: nf.key, value: nf.def});
                  }}>
                  {CONFIG_FIELDS.map((cf) => <option key={cf.key} value={cf.key}>{cf.label}</option>)}
                </select>
                {f.type === 'bool' ? (
                  <select className={styles.select} value={String(row.value)} onChange={(e) => updCfg(i, {value: e.target.value === 'true'})}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : f.type === 'enum' ? (
                  <select className={styles.select} value={row.value} onChange={(e) => updCfg(i, {value: int(e.target.value)})}>
                    {f.options.map(([l, v]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                ) : (
                  <input className={styles.input} type="number" value={row.value} onChange={(e) => updCfg(i, {value: e.target.value})} />
                )}
                {cfgRows.length > 1 && <button type="button" className={styles.remove} onClick={() => rmCfg(i)}>Remove</button>}
              </div>
            );
          })}
          <button type="button" className={styles.button} onClick={addCfg}>+ Add parameter</button>
        </div>
      )}

      {cmd === 'set_param_alarm' && (
        <div className={styles.field}>
          <label className={styles.label}>Alarm rules</label>
          {aRules.map((r, i) => {
            const sType = ruleSensorType(r);
            const chs = channelsFor(sType);
            const ch = ruleChannel(r);
            const err = r.action === 'set' ? ruleError(r) : null;
            const unit = ch ? unitLabel(ch.unit) : '';
            return (
              <div key={i} className={styles.rule}>
                <div className={styles.inline}>
                  <div><label className={styles.label}>Rule (0-15)</label><input className={styles.inputSm} type="number" min="0" max="15" value={r.rule} onChange={(e) => updRule(i, {rule: e.target.value})} /></div>
                  <div><label className={styles.label}>Action</label>
                    <select className={styles.select} value={r.action} onChange={(e) => updRule(i, {action: e.target.value})}>
                      <option value="set">Set rule</option>
                      <option value="clear">Clear rule</option>
                    </select>
                  </div>
                  {aRules.length > 1 && <button type="button" className={styles.remove} onClick={() => rmRule(i)}>Remove</button>}
                </div>
                {r.action === 'set' && ch && (
                  <>
                    <div className={styles.inline}>
                      <div><label className={styles.label}>Slot</label>
                        <select className={styles.select} value={r.slot} onChange={(e) => updRule(i, {slot: e.target.value})}>
                          {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      </div>
                      {r.slot !== 'onboard' && (
                        <div><label className={styles.label}>Sensor type</label>
                          <select className={styles.select} value={r.w1type} onChange={(e) => updRule(i, {w1type: e.target.value})}>
                            {W1_TYPES.map((t) => <option key={t.value} value={String(t.value)}>{t.label}</option>)}
                          </select>
                        </div>
                      )}
                      <div><label className={styles.label}>Channel</label>
                        <select className={styles.select} value={String(ch.id)} onChange={(e) => updRule(i, {channel: e.target.value})}>
                          {chs.map((c) => <option key={c.id} value={String(c.id)}>{c.label}</option>)}
                        </select>
                      </div>
                      <label className={styles.check}><input type="checkbox" checked={r.enabled} onChange={(e) => updRule(i, {enabled: e.target.checked})} /> Enabled</label>
                    </div>
                    {ch.kind === 'threshold' && (
                      <div className={styles.inline}>
                        <div><label className={styles.label}>Low ({unit})</label><input className={styles.inputSm} type="number" value={r.lo} onChange={(e) => updRule(i, {lo: e.target.value})} /></div>
                        <div><label className={styles.label}>High ({unit})</label><input className={styles.inputSm} type="number" value={r.hi} onChange={(e) => updRule(i, {hi: e.target.value})} /></div>
                      </div>
                    )}
                    {ch.kind === 'state' && (
                      <div className={styles.inline}>
                        <div><label className={styles.label}>From</label><select className={styles.inputSm} value={r.from} onChange={(e) => updRule(i, {from: e.target.value})}><option value="0">0</option><option value="1">1</option></select></div>
                        <div><label className={styles.label}>To</label><select className={styles.inputSm} value={r.to} onChange={(e) => updRule(i, {to: e.target.value})}><option value="0">0</option><option value="1">1</option></select></div>
                        <span className={styles.hint}>{stateHint(r, ch)}</span>
                      </div>
                    )}
                    {ch.kind === 'rate' && (
                      <div className={styles.inline}>
                        <div><label className={styles.label}>Events per window</label><input className={styles.inputSm} type="number" min="0" value={r.count} onChange={(e) => updRule(i, {count: e.target.value})} /></div>
                      </div>
                    )}
                    <div className={styles.inline}>
                      <div>
                        <label className={styles.label}>
                          {ch.kind === 'threshold' ? `Hysteresis (${unit})` : ch.kind === 'rate' ? 'Window (s)' : 'Dwell (s)'}
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
          <button type="button" className={styles.button} onClick={addRule}>+ Add alarm rule</button>
          <label className={styles.check}>
            <input type="checkbox" checked={replaceAll} onChange={(e) => setReplaceAll(e.target.checked)} />{' '}
            Replace whole alarm table: clears every rule not listed here (adds <code>alarms_replace: true</code>;
            in a multi-downlink batch, use it on the first message only)
          </label>
        </div>
      )}

      {cmd === 'reset_counters' && (
        <div className={styles.field}>
          <label className={styles.label}>Counters to clear</label>
          <div className={styles.inline}>
            <label className={styles.check}><input type="checkbox" checked={cHallL} onChange={(e) => setCHallL(e.target.checked)} /> Hall left</label>
            <label className={styles.check}><input type="checkbox" checked={cHallR} onChange={(e) => setCHallR(e.target.checked)} /> Hall right</label>
            <label className={styles.check}><input type="checkbox" checked={cInA} onChange={(e) => setCInA(e.target.checked)} /> Input A</label>
            <label className={styles.check}><input type="checkbox" checked={cInB} onChange={(e) => setCInB(e.target.checked)} /> Input B</label>
          </div>
        </div>
      )}

      {cmd === 'req_history' && (
        <div className={styles.field}>
          <div className={styles.inline}>
            <div><label className={styles.label}>From (Unix s)</label><input className={styles.input} type="number" value={hFrom} onChange={(e) => setHFrom(e.target.value)} /></div>
            <div><label className={styles.label}>To (Unix s)</label><input className={styles.input} type="number" value={hTo} onChange={(e) => setHTo(e.target.value)} /></div>
          </div>
        </div>
      )}

      {cmd === 'buzzer_play' && (
        <div className={styles.field}>
          <div className={styles.inline}>
            <div><label className={styles.label}>Melody</label>
              <select className={styles.select} value={bKind} onChange={(e) => setBKind(e.target.value)}>
                {BUZZER_KINDS.map(([l, v]) => <option key={v} value={String(v)}>{l}</option>)}
              </select>
            </div>
            <div><label className={styles.label}>Repeat every (s, 0 = once)</label><input className={styles.inputSm} type="number" min="0" max="999" value={bRepeat} onChange={(e) => setBRepeat(e.target.value)} /></div>
          </div>
          <span className={styles.hint}>Needs the buzzer hardware variant and <code>cap_gpio_mode</code> set to Buzzer. Stop also cancels a repeating melody.</span>
        </div>
      )}

      {cmd === 'custom' && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sdg-custom">JSON command</label>
          <textarea id="sdg-custom" className={styles.textarea} rows={8} spellCheck={false} value={custom} onChange={(e) => setCustom(e.target.value)} />
        </div>
      )}

      {(cmd === 'set_param_config' || cmd === 'set_param_alarm') && (
        <div className={styles.field}>
          <label className={styles.check}>
            <input type="checkbox" checked={saveAfter} onChange={(e) => setSaveAfter(e.target.checked)} />{' '}
            Save and reboot after applying (adds <code>save: true</code>)
          </label>
        </div>
      )}

      {cmd !== 'custom' && (
        <div className={styles.field}>
          <div className={styles.outputHead}>
            <label className={styles.label}>JSON</label>
            <button type="button" className={styles.button} onClick={() => copy(jsonText)}>Copy JSON</button>
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
              <button type="button" className={styles.button} onClick={() => copy(result.hex)}>Copy hex</button>
            </div>
            <code className={styles.hex}>{result.hex || '(empty payload)'}</code>
            {result.warnings && result.warnings.length > 0 && (
              <div className={styles.warning}>Warnings: {result.warnings.join('; ')}</div>
            )}
          </>
        )}
      </div>

      <p className={styles.note}>
        Encoding runs in your browser with the STICKER <code>ttn.js</code> codec, pinned to firmware
        v2.0.0. Queue the hex on fPort 85, or send the JSON if the codec is installed as the downlink
        payload formatter.
      </p>
    </div>
  );
}

// Pure helpers, exported for tests.
export {packAlarm, channelsFor, ruleError, EMPTY_RULE, CONFIG_FIELDS, SIMPLE};
