import React, {useEffect, useMemo, useState} from 'react';
import QRCode from 'qrcode';
import styles from './styles.module.css';

// Builds the plaintext AppConfigMessage protobuf that the STICKER NFC config
// path decodes (app_nfc.c -> pb_decode(AppConfigMessage_fields) -> app_config_ingest).
// Field numbers, wire types, enum values and ranges mirror app/src/app_config.proto
// and app/src/app_config.yml. Only the template-friendly settings are exposed;
// per-device identity and secrets (keys, EUIs, serial, nonce, ROMs, ...) are left out.
// Only ticked fields are encoded (proto3 `optional` = explicit presence).
//
// The bytes produced here are the *plaintext* template. On a production device
// the NFC Configurator wraps them in the per-device AES-CCM frame.

// --- LoRaWAN basics (AppConfigMessage.Lorawan, field 5) ---
const LORAWAN = [
  {n: 1, key: 'region', type: 'enum', label: 'Region', def: 0,
    options: [['EU868', 0], ['US915', 1], ['AU915', 2]],
    help: 'Radio region for the LoRaWAN band: EU868, US915 or AU915.'},
  {n: 2, key: 'sub_band', type: 'uint32', label: 'Sub-band', unit: '', def: 2, min: 0, max: 8,
    help: 'US915/AU915 sub-band. 0 to 8 (default 2); 0 enables all channels.'},
  {n: 3, key: 'network', type: 'enum', label: 'Network', def: 0,
    options: [['PUBLIC', 0], ['PRIVATE', 1]],
    help: 'LoRaWAN sync word: PUBLIC or PRIVATE network.'},
  {n: 5, key: 'activation', type: 'enum', label: 'Activation', def: 0,
    options: [['OTAA', 0], ['ABP', 1]],
    help: 'Join method: OTAA (over-the-air activation) or ABP (activation by personalization).'},
];

// --- Interval (AppConfigMessage.Application, field 6) ---
const INTERVAL = [
  {n: 2, key: 'interval_sample', type: 'uint32', label: 'Sample interval', unit: 's', def: 60, min: 5, max: 3600, zeroOk: true,
    help: 'How often the device measures. 5 to 3600 s, or 0 to sample once right before each report.'},
  {n: 3, key: 'interval_report', type: 'uint32', label: 'Report interval', unit: 's', def: 900, min: 60, max: 86400,
    help: 'How often the device sends an uplink. 60 to 86400 s (default 900).'},
];

// --- Sensors (AppConfigMessage.Sensors, field 7) ---
const SENSORS = [
  {n: 1, key: 'cap_hall_left', type: 'bool', label: 'Hall left capability', def: true, help: 'Enable the hall-left sensor.'},
  {n: 2, key: 'cap_hall_right', type: 'bool', label: 'Hall right capability', def: true, help: 'Enable the hall-right sensor.'},
  {n: 3, key: 'cap_input_a', type: 'bool', label: 'Input A capability', def: true, help: 'Enable input A.'},
  {n: 4, key: 'cap_input_b', type: 'bool', label: 'Input B capability', def: true, help: 'Enable input B.'},
  {n: 5, key: 'cap_light_sensor', type: 'bool', label: 'Light sensor capability', def: true, help: 'Enable the light sensor.'},
  {n: 6, key: 'cap_barometer', type: 'bool', label: 'Barometer capability', def: true, help: 'Enable the barometer.'},
  {n: 7, key: 'cap_pir_detector', type: 'bool', label: 'PIR detector capability', def: true, help: 'Enable the PIR detector.'},
  {n: 8, key: 'cap_w1_sensors', type: 'bool', label: '1-Wire bus capability', def: true, help: 'Enable the 1-Wire bus and auto-detect probes.'},
  {n: 9, key: 'cap_accelerometer', type: 'bool', label: 'Accelerometer capability', def: true, divider: true, help: 'Enable the accelerometer.'},
  {n: 10, key: 'accel_motion_sensitivity', type: 'enum', label: 'Motion sensitivity', def: 0,
    options: [['OFF', 0], ['LOW', 1], ['MEDIUM', 2], ['HIGH', 3]],
    help: 'Accelerometer motion detection: OFF, LOW, MEDIUM or HIGH.'},
  {n: 15, key: 'hall_left_counter', type: 'bool', label: 'Hall-left counter', def: true, help: 'Enable the hall-left pulse totalizer.'},
  {n: 16, key: 'hall_right_counter', type: 'bool', label: 'Hall-right counter', def: true, help: 'Enable the hall-right pulse totalizer.'},
  {n: 17, key: 'input_a_counter', type: 'bool', label: 'Input-A counter', def: true, help: 'Enable the input-A pulse totalizer.'},
  {n: 18, key: 'input_b_counter', type: 'bool', label: 'Input-B counter', def: true, help: 'Enable the input-B pulse totalizer.'},
];

// --- Alarms (AppConfigMessage.Alarms, field 8): two scalars + 16 packed rule slots ---
const ALARM_SCALARS = [
  {n: 1, key: 'alarm_limit', type: 'uint32', label: 'Alarm limit', unit: 's', def: 0, min: 0, max: 3600,
    help: 'Minimum seconds between alarm uplinks. 0 to 3600 s; 0 disables the limit.'},
  {n: 2, key: 'alarm_notif_time', type: 'uint32', label: 'Alarm notify time', unit: 's', def: 10, min: 1, max: 60,
    help: 'How long the red LED stays on when an alarm fires. 1 to 60 s (default 10).'},
];
const ALARM_SLOTS = Array.from({length: 16}, (_, i) => ({n: 3 + i, key: 'alarm_' + i, type: 'bytes'}));
const ALARMS_DECODE_FIELDS = [...ALARM_SCALARS, ...ALARM_SLOTS];

// Groups rendered with the generic field editor (alarms is handled separately).
const GENERIC_GROUPS = [
  {n: 5, key: 'lorawan', label: 'LoRaWAN basics', fields: LORAWAN},
  {n: 6, key: 'application', label: 'Interval', fields: INTERVAL},
  {n: 7, key: 'sensors', label: 'Sensors', fields: SENSORS},
];

// Root field descriptors for the decoder (the four sub-messages).
const ROOT_FIELDS = [
  ...GENERIC_GROUPS.map((g) => ({n: g.n, key: g.key, type: 'msg', fields: g.fields})),
  {n: 8, key: 'alarms', type: 'msg', fields: ALARMS_DECODE_FIELDS},
];

// --- Alarm rule model (matches app_alarm_rules.h / app_config.yml, v1.4.0) ---
const SOURCES = [
  {id: 'onboard', value: 0, label: 'On-board'},
  {id: 's1', value: 1, label: '1-Wire slot 1'},
  {id: 's2', value: 2, label: '1-Wire slot 2'},
  {id: 's3', value: 3, label: '1-Wire slot 3'},
  {id: 's4', value: 4, label: '1-Wire slot 4'},
  {id: 'hall-left', value: 5, label: 'Hall left'},
  {id: 'hall-right', value: 6, label: 'Hall right'},
  {id: 'input-a', value: 7, label: 'Input A'},
  {id: 'input-b', value: 8, label: 'Input B'},
  {id: 'pir', value: 9, label: 'PIR'},
  {id: 'accel', value: 10, label: 'Accelerometer'},
];

const QUANTITIES = [
  {id: 'temperature', value: 0, kind: 'threshold', label: 'Temperature'},
  {id: 'humidity', value: 1, kind: 'threshold', label: 'Humidity'},
  {id: 'pressure', value: 2, kind: 'threshold', label: 'Pressure'},
  {id: 'illuminance', value: 3, kind: 'threshold', label: 'Illuminance'},
  {id: 'magnetic-field', value: 4, kind: 'threshold', label: 'Magnetic field'},
  {id: 'tilt', value: 5, kind: 'state', label: 'Tilt'},
  {id: 'state', value: 6, kind: 'state', label: 'State'},
  {id: 'count', value: 7, kind: 'count', label: 'Count'},
];

function validQuantityIds(sourceId) {
  if (sourceId === 'onboard') return ['temperature', 'humidity', 'pressure'];
  if (['s1', 's2', 's3', 's4'].includes(sourceId)) {
    return ['temperature', 'humidity', 'illuminance', 'magnetic-field', 'tilt'];
  }
  return ['state', 'count']; // hall-*, input-*, pir, accel
}

const byId = (arr, id) => arr.find((x) => x.id === id);
const num = (v, f = 0) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : f);
const int = (v, f = 0) => (Number.isFinite(parseInt(v, 10)) ? parseInt(v, 10) : f);
const fmtFloat = (x) => String(Math.round(x * 1e6) / 1e6); // trim float32 noise

// Pack a rule into the 17-byte little-endian slot format and return 34 hex chars.
function packAlarm({sourceId, quantityId, enabled, lo, hi, hst, from, to}) {
  const src = byId(SOURCES, sourceId);
  const q = byId(QUANTITIES, quantityId);
  const buf = new ArrayBuffer(17);
  const dv = new DataView(buf);
  dv.setUint8(0, 1 | (enabled ? 2 : 0)); // bit0 present, bit1 enabled
  dv.setUint8(1, src.value);
  dv.setUint8(2, q.value);
  dv.setUint8(3, q.kind === 'state' ? (from ? 1 : 0) : 0);
  dv.setUint8(4, q.kind === 'state' ? (to ? 1 : 0) : 0);
  let fLo = 0;
  let fHi = 0;
  let fHst = 0;
  if (q.kind === 'threshold') {
    fLo = lo;
    fHi = hi;
    fHst = hst;
  } else if (q.kind === 'count') {
    fHi = hi; // hi holds the per-interval rate limit N
  }
  dv.setFloat32(5, fLo, true);
  dv.setFloat32(9, fHi, true);
  dv.setFloat32(13, fHst, true);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const EMPTY_SLOT = '00'.repeat(17);

const DEFAULT_RULE = {
  slot: '0', action: 'set', enabled: true, source: 'onboard', quantity: 'temperature',
  lo: '5', hi: '30', hst: '1', from: '0', to: '1', count: '10',
};

// Inverse of packAlarm: turn a 17-byte slot hex back into a rule.
function unpackAlarm(hex, slot) {
  const bytes = hexToBytes(hex);
  if (bytes.length < 17 || bytes.every((b) => b === 0)) {
    return {...DEFAULT_RULE, slot: String(slot), action: 'clear'};
  }
  const dv = new DataView(new Uint8Array(bytes).buffer);
  const enabled = (bytes[0] & 2) !== 0;
  const src = SOURCES.find((s) => s.value === bytes[1]) || SOURCES[0];
  const q = QUANTITIES.find((x) => x.value === bytes[2]) || QUANTITIES[0];
  const lo = dv.getFloat32(5, true);
  const hi = dv.getFloat32(9, true);
  const hst = dv.getFloat32(13, true);
  return {
    slot: String(slot), action: 'set', enabled,
    source: src.id, quantity: q.id,
    lo: fmtFloat(lo), hi: fmtFloat(hi), hst: fmtFloat(hst),
    from: String(bytes[3]), to: String(bytes[4]),
    count: q.kind === 'count' ? fmtFloat(hi) : '10',
  };
}

// ---------- protobuf primitives ----------
function writeVarint(out, value) {
  value = value >>> 0; // treat as uint32
  while (value > 127) {
    out.push((value % 128) + 128);
    value = Math.floor(value / 128);
  }
  out.push(value);
}

function writeKey(out, field, wire) {
  writeVarint(out, field * 8 + wire);
}

function readVarint(bytes, pos) {
  let result = 0;
  let shift = 1;
  let b;
  do {
    if (pos >= bytes.length) throw new Error('truncated varint');
    b = bytes[pos++];
    result += (b & 0x7f) * shift;
    shift *= 128;
  } while (b & 0x80);
  return {value: result, pos};
}

function hexToBytes(str) {
  const clean = (str || '').replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, '');
  if (clean.length % 2 !== 0) throw new Error('hex has an odd number of digits');
  const out = [];
  for (let i = 0; i < clean.length; i += 2) out.push(parseInt(clean.slice(i, i + 2), 16));
  return out;
}

const bytesToHex = (bytes) =>
  Array.from(bytes, (b) => (b & 0xff).toString(16).padStart(2, '0')).join('');

// Encode one scalar/bytes field into out.
function writeField(out, def, value) {
  if (def.type === 'bool') {
    writeKey(out, def.n, 0);
    writeVarint(out, value ? 1 : 0);
  } else if (def.type === 'uint32' || def.type === 'enum') {
    writeKey(out, def.n, 0);
    writeVarint(out, parseInt(value, 10) || 0);
  } else if (def.type === 'bytes') {
    const b = hexToBytes(value);
    writeKey(out, def.n, 2);
    writeVarint(out, b.length);
    out.push(...b);
  }
}

function encodeLevel(entries) {
  const out = [];
  for (const {def, value} of entries) writeField(out, def, value);
  return out;
}

function writeSubMessage(out, n, entries) {
  if (!entries.length) return;
  const sub = encodeLevel(entries);
  writeKey(out, n, 2);
  writeVarint(out, sub.length);
  out.push(...sub);
}

// ---------- decode ----------
function decodeLevel(bytes, fields) {
  const byNum = {};
  fields.forEach((f) => (byNum[f.n] = f));
  const out = {};
  let pos = 0;
  while (pos < bytes.length) {
    const k = readVarint(bytes, pos);
    pos = k.pos;
    const field = Math.floor(k.value / 8);
    const wire = k.value % 8;
    const def = byNum[field];
    if (wire === 0) {
      const v = readVarint(bytes, pos);
      pos = v.pos;
      if (def) out[def.key] = def.type === 'bool' ? v.value !== 0 : v.value;
    } else if (wire === 2) {
      const l = readVarint(bytes, pos);
      pos = l.pos;
      if (pos + l.value > bytes.length) throw new Error('length-delimited field overruns buffer');
      const sub = bytes.slice(pos, pos + l.value);
      pos += l.value;
      if (def) {
        if (def.type === 'msg') out[def.key] = {sub};
        else out[def.key] = bytesToHex(sub); // bytes
      }
    } else if (wire === 1) {
      pos += 8;
    } else if (wire === 5) {
      pos += 4;
    } else {
      throw new Error('unsupported wire type ' + wire);
    }
  }
  return out;
}

// ---------- model ----------
const fieldDefault = (f) => (f.def !== undefined ? f.def
  : f.type === 'bool' ? false
  : f.type === 'enum' ? (f.options[0][1])
  : f.type === 'uint32' ? 0
  : '');

function defaultModel() {
  const m = {};
  for (const g of GENERIC_GROUPS) {
    m[g.key] = {};
    for (const f of g.fields) m[g.key][f.key] = {on: false, value: fieldDefault(f)};
  }
  m.alarms = {};
  for (const f of ALARM_SCALARS) m.alarms[f.key] = {on: false, value: fieldDefault(f)};
  return m;
}

// Decode a hex template into a fresh model + alarm rule list.
function decodeToModel(hex) {
  const bytes = hexToBytes(hex);
  const top = decodeLevel(bytes, ROOT_FIELDS);
  const m = defaultModel();
  for (const g of GENERIC_GROUPS) {
    if (top[g.key] && top[g.key].sub) {
      const sub = decodeLevel(top[g.key].sub, g.fields);
      for (const f of g.fields) {
        if (sub[f.key] !== undefined) m[g.key][f.key] = {on: true, value: sub[f.key]};
      }
    }
  }
  const rules = [];
  if (top.alarms && top.alarms.sub) {
    const sub = decodeLevel(top.alarms.sub, ALARMS_DECODE_FIELDS);
    for (const f of ALARM_SCALARS) {
      if (sub[f.key] !== undefined) m.alarms[f.key] = {on: true, value: sub[f.key]};
    }
    for (let i = 0; i < 16; i++) {
      if (sub['alarm_' + i] !== undefined) rules.push(unpackAlarm(sub['alarm_' + i], i));
    }
  }
  return {model: m, aRules: rules};
}

const copy = (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(text);
};

// Allowed-range text for a numeric field, e.g. "5 to 3600 s, or 0".
function rangeText(f) {
  const unit = f.unit ? ' ' + f.unit : '';
  return `${f.min} to ${f.max}${unit}${f.zeroOk ? ', or 0' : ''}`;
}

// Validate a ticked field. Returns null when valid, or {text, block} where
// `block` true means the value cannot be encoded and the field is skipped.
function fieldIssue(f, value) {
  if (f.type === 'uint32') {
    const s = String(value ?? '').trim();
    if (s === '') return {text: 'enter a value', block: true};
    if (!/^\d+$/.test(s)) return {text: 'digits only', block: true};
    const v = Number(s);
    const ok = (f.zeroOk && v === 0) ||
      ((f.min === undefined || v >= f.min) && (f.max === undefined || v <= f.max));
    if (!ok) return {text: 'must be ' + rangeText(f), block: true};
    return null;
  }
  return null;
}

// Value control for one field. Module-level so its identity is stable across
// renders (an inner component would remount on each keystroke and drop focus).
function renderValue(f, cell, onChange) {
  if (f.type === 'bool') {
    return (
      <select className={styles.select} value={String(cell.value)}
        onChange={(e) => onChange({value: e.target.value === 'true'})}>
        <option value="true">on</option>
        <option value="false">off</option>
      </select>
    );
  }
  if (f.type === 'enum') {
    return (
      <select className={styles.select} value={cell.value}
        onChange={(e) => onChange({value: parseInt(e.target.value, 10)})}>
        {f.options.map(([l, v]) => <option key={v} value={v}>{l}</option>)}
      </select>
    );
  }
  // uint32
  return (
    <>
      <input className={styles.inputSm} type="number" min={f.zeroOk ? 0 : f.min} max={f.max}
        value={cell.value} onChange={(e) => onChange({value: e.target.value})} />
      {f.unit && <span className={styles.unit}>{f.unit}</span>}
    </>
  );
}

// A setting row: include-checkbox + value control, with a help clue that
// appears while the row is hovered or focused.
function FieldRow({f, cell, onChange}) {
  const issue = cell.on ? fieldIssue(f, cell.value) : null;
  return (
    <div className={f.divider ? `${styles.row} ${styles.dividerBelow}` : styles.row}>
      <div className={styles.rowMain}>
        <label className={styles.check}>
          <input type="checkbox" checked={cell.on} onChange={(e) => onChange({on: e.target.checked})} />
          <span className={styles.rowLabel}>{f.label}</span>
        </label>
        <div className={cell.on ? styles.val : `${styles.val} ${styles.dim}`}>
          {renderValue(f, cell, onChange)}
          {issue && <span className={issue.block ? styles.fieldErr : styles.fieldWarn}>{issue.text}</span>}
        </div>
      </div>
      {f.help && <div className={styles.help}>{f.help}</div>}
    </div>
  );
}

export default function StickerTemplateGenerator() {
  const [model, setModel] = useState(defaultModel);
  const [aRules, setARules] = useState(() => []);
  const [hexIn, setHexIn] = useState('');
  const [loadMsg, setLoadMsg] = useState(null);
  const [qr, setQr] = useState(null);
  const [qrErr, setQrErr] = useState(null);
  const [open, setOpen] = useState({}); // which sections are expanded

  // Keep the controlled <details> in sync when the user clicks a summary.
  const onToggle = (key) => (e) => {
    const o = e.currentTarget.open;
    setOpen((s) => (s[key] === o ? s : {...s, [key]: o}));
  };

  const setGroupField = (gkey, fkey, patch) =>
    setModel((m) => ({...m, [gkey]: {...m[gkey], [fkey]: {...m[gkey][fkey], ...patch}}}));

  const clearAll = () => {
    setModel(defaultModel());
    setARules([]);
    setOpen({});
  };

  // --- alarm rule helpers ---
  const updRule = (i, patch) => setARules((rs) => rs.map((r, j) => (j === i ? {...r, ...patch} : r)));
  const setRuleSource = (i, source) =>
    setARules((rs) =>
      rs.map((r, j) => {
        if (j !== i) return r;
        const valid = validQuantityIds(source);
        return {...r, source, quantity: valid.includes(r.quantity) ? r.quantity : valid[0]};
      }),
    );
  const addRule = () =>
    setARules((rs) => {
      const used = rs.map((r) => int(r.slot, 0));
      let next = 0;
      while (next < 15 && used.includes(next)) next++;
      return [...rs, {...DEFAULT_RULE, slot: String(next)}];
    });
  const rmRule = (i) => setARules((rs) => rs.filter((_, j) => j !== i));

  // Build the protobuf bytes + JSON preview from the ticked fields and rules.
  const {hex, json, byteLen, error} = useMemo(() => {
    try {
      const out = [];
      const obj = {};
      for (const g of GENERIC_GROUPS) {
        const entries = [];
        const gObj = {};
        for (const f of g.fields) {
          const cell = model[g.key][f.key];
          if (!cell.on || (fieldIssue(f, cell.value) || {}).block) continue;
          entries.push({def: f, value: cell.value});
          gObj[f.key] = cell.value;
        }
        if (entries.length) {
          writeSubMessage(out, g.n, entries);
          obj[g.key] = gObj;
        }
      }
      // alarms: scalars + packed rules (ascending field order)
      const aEntries = [];
      const aObj = {};
      for (const f of ALARM_SCALARS) {
        const cell = model.alarms[f.key];
        if (!cell.on || (fieldIssue(f, cell.value) || {}).block) continue;
        aEntries.push({def: f, value: cell.value});
        aObj[f.key] = cell.value;
      }
      for (const r of aRules) {
        const slot = Math.max(0, Math.min(15, int(r.slot, 0)));
        const q = byId(QUANTITIES, r.quantity);
        const packed = r.action === 'clear' ? EMPTY_SLOT : packAlarm({
          sourceId: r.source,
          quantityId: r.quantity,
          enabled: r.enabled,
          lo: num(r.lo),
          hi: q.kind === 'count' ? num(r.count) : num(r.hi),
          hst: num(r.hst),
          from: r.from === '1',
          to: r.to === '1',
        });
        aEntries.push({def: {n: 3 + slot, type: 'bytes'}, value: packed});
        aObj['alarm_' + slot] = packed;
      }
      if (aEntries.length) {
        aEntries.sort((a, b) => a.def.n - b.def.n);
        writeSubMessage(out, 8, aEntries);
        obj.alarms = aObj;
      }
      return {hex: bytesToHex(out), json: JSON.stringify(obj, null, 2), byteLen: out.length};
    } catch (e) {
      return {hex: '', json: '', byteLen: 0, error: e.message};
    }
  }, [model, aRules]);

  // Render the QR (client-side only) from the hex string.
  useEffect(() => {
    let cancelled = false;
    if (!hex) {
      setQr(null);
      setQrErr(null);
      return undefined;
    }
    QRCode.toDataURL(hex.toUpperCase(), {errorCorrectionLevel: 'M', margin: 2, width: 240})
      .then((url) => {
        if (!cancelled) {
          setQr(url);
          setQrErr(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setQr(null);
          setQrErr(e.message);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [hex]);

  const loadFromHex = () => {
    try {
      const {model: m, aRules: ar} = decodeToModel(hexIn);
      setModel(m);
      setARules(ar);
      // Expand exactly the sections the template touched, collapse the rest.
      const next = {};
      for (const g of GENERIC_GROUPS) next[g.key] = g.fields.some((f) => m[g.key][f.key].on);
      next.alarms = ALARM_SCALARS.some((f) => m.alarms[f.key].on) || ar.length > 0;
      setOpen(next);
      const n = hexToBytes(hexIn).length;
      const any = Object.values(next).some(Boolean);
      setLoadMsg({
        ok: true,
        text: any
          ? `Loaded ${n} byte(s). Sections with values are expanded below.`
          : `Loaded ${n} byte(s), but no settings recognized by this form.`,
      });
    } catch (e) {
      setLoadMsg({ok: false, text: 'Could not decode: ' + e.message});
    }
  };

  return (
    <div className={styles.generator}>
      <div className={styles.toolbar}>
        <span className={styles.hint}>Open a section and tick the settings to include. Hover or focus a setting to see what it does and its allowed values.</span>
        <button type="button" className={styles.button} onClick={clearAll}>Clear all</button>
      </div>

      {GENERIC_GROUPS.map((g) => (
        <details key={g.key} className={styles.group} open={!!open[g.key]} onToggle={onToggle(g.key)}>
          <summary className={styles.groupTitle}>{g.label}</summary>
          <div className={styles.groupBody}>
            {g.fields.map((f) => (
              <FieldRow key={f.key} f={f} cell={model[g.key][f.key]}
                onChange={(p) => setGroupField(g.key, f.key, p)} />
            ))}
          </div>
        </details>
      ))}

      <details className={styles.group} open={!!open.alarms} onToggle={onToggle('alarms')}>
        <summary className={styles.groupTitle}>Alarms</summary>
        <div className={styles.groupBody}>
          {ALARM_SCALARS.map((f) => (
            <FieldRow key={f.key} f={f} cell={model.alarms[f.key]}
              onChange={(p) => setGroupField('alarms', f.key, p)} />
          ))}

          <div className={styles.field}>
            <label className={styles.label}>Alarm rules</label>
            {aRules.length === 0 && (
              <div className={styles.hint}>No alarm rule yet. Add one to include it in the template.</div>
            )}
            {aRules.map((r, i) => {
              const valid = validQuantityIds(r.source);
              const q = byId(QUANTITIES, r.quantity);
              return (
                <div key={i} className={styles.rule}>
                  <div className={styles.inline}>
                    <div>
                      <label className={styles.label}>Slot (0-15)</label>
                      <input className={styles.inputSm} type="number" min="0" max="15" value={r.slot}
                        onChange={(e) => updRule(i, {slot: e.target.value})} />
                    </div>
                    <div>
                      <label className={styles.label}>Action</label>
                      <select className={styles.select} value={r.action} onChange={(e) => updRule(i, {action: e.target.value})}>
                        <option value="set">Set rule</option>
                        <option value="clear">Clear slot</option>
                      </select>
                    </div>
                    <button type="button" className={styles.remove} onClick={() => rmRule(i)}>Remove</button>
                  </div>
                  {r.action === 'set' && (
                    <>
                      <div className={styles.inline}>
                        <div>
                          <label className={styles.label}>Source</label>
                          <select className={styles.select} value={r.source} onChange={(e) => setRuleSource(i, e.target.value)}>
                            {SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={styles.label}>Quantity</label>
                          <select className={styles.select} value={r.quantity} onChange={(e) => updRule(i, {quantity: e.target.value})}>
                            {QUANTITIES.filter((x) => valid.includes(x.id)).map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                          </select>
                        </div>
                        <label className={styles.check}>
                          <input type="checkbox" checked={r.enabled} onChange={(e) => updRule(i, {enabled: e.target.checked})} /> Enabled
                        </label>
                      </div>
                      {q.kind === 'threshold' && (
                        <div className={styles.inline}>
                          <div><label className={styles.label}>Low</label><input className={styles.inputSm} type="number" value={r.lo} onChange={(e) => updRule(i, {lo: e.target.value})} /></div>
                          <div><label className={styles.label}>High</label><input className={styles.inputSm} type="number" value={r.hi} onChange={(e) => updRule(i, {hi: e.target.value})} /></div>
                          <div><label className={styles.label}>Hysteresis</label><input className={styles.inputSm} type="number" value={r.hst} onChange={(e) => updRule(i, {hst: e.target.value})} /></div>
                        </div>
                      )}
                      {q.kind === 'state' && (
                        <div className={styles.inline}>
                          <div><label className={styles.label}>From</label><select className={styles.inputSm} value={r.from} onChange={(e) => updRule(i, {from: e.target.value})}><option value="0">0</option><option value="1">1</option></select></div>
                          <div><label className={styles.label}>To</label><select className={styles.inputSm} value={r.to} onChange={(e) => updRule(i, {to: e.target.value})}><option value="0">0</option><option value="1">1</option></select></div>
                          <span className={styles.hint}>{r.from === r.to ? 'level (active while line = To)' : 'edge (fires on this transition)'}</span>
                        </div>
                      )}
                      {q.kind === 'count' && (
                        <div className={styles.inline}>
                          <div><label className={styles.label}>Events per report interval</label><input className={styles.inputSm} type="number" value={r.count} onChange={(e) => updRule(i, {count: e.target.value})} /></div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            <button type="button" className={styles.button} onClick={addRule}>+ Add alarm rule</button>
          </div>
        </div>
      </details>

      <div className={styles.field}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <div className={styles.outputHead}>
              <span className={styles.port}>AppConfigMessage hex &middot; {byteLen} byte(s)</span>
              <button type="button" className={styles.button} onClick={() => copy(hex)} disabled={!hex}>Copy hex</button>
            </div>
            <code className={styles.hex}>{hex || '(no settings selected)'}</code>
          </>
        )}
      </div>

      <details className={styles.group}>
        <summary className={styles.groupTitle}>Template (JSON)</summary>
        <div className={styles.groupBody}>
          <code className={styles.code}>{json && json !== '{}' ? json : '(no settings selected)'}</code>
        </div>
      </details>

      <div className={styles.field}>
        <label className={styles.label}>QR code (carries the hex string)</label>
        {qrErr ? (
          <div className={styles.error}>QR error: {qrErr}</div>
        ) : qr ? (
          <div className={styles.qrWrap}>
            <img className={styles.qr} src={qr} alt="Template QR code" width={240} height={240} />
            <a className={styles.button} href={qr} download="sticker-template.png">Download PNG</a>
          </div>
        ) : (
          <span className={styles.hint}>Select at least one setting to generate a QR code.</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="stg-hexin">Read a template from hex</label>
        <textarea id="stg-hexin" className={styles.textarea} rows={3} spellCheck={false}
          placeholder="Paste an AppConfigMessage hex string to load it into the form above"
          value={hexIn} onChange={(e) => setHexIn(e.target.value)} />
        <div className={styles.outputHead}>
          <span className={styles.hint}>Replaces the current selection. Settings outside this form are ignored.</span>
          <button type="button" className={styles.button} onClick={loadFromHex} disabled={!hexIn.trim()}>Load template</button>
        </div>
        {loadMsg && (
          <div className={loadMsg.ok ? styles.warning : styles.error}>{loadMsg.text}</div>
        )}
      </div>

      <p className={styles.note}>
        This is the <strong>plaintext</strong> config template (an <code>AppConfigMessage</code> protobuf).
        On a production device the NFC Configurator encrypts it per device before writing it over NFC.
      </p>
    </div>
  );
}
