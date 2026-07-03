import React, {useMemo, useState} from 'react';
import * as ttnModule from './ttn';
import styles from './styles.module.css';

// The vendored ttn.js is CommonJS (module.exports). Resolve the codec object
// across webpack interop shapes (named, default, or namespace).
const codec = ttnModule.encodeDownlink ? ttnModule : ttnModule.default || ttnModule;

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

// Curated config parameters. Enum values MUST be numeric (the codec does not map
// enum names on the downlink path).
const CONFIG_FIELDS = [
  {key: 'interval_report', group: 'application', label: 'Report interval (s)', type: 'int', def: '600'},
  {key: 'interval_sample', group: 'application', label: 'Sample interval (s)', type: 'int', def: '60'},
  {key: 'history_enable', group: 'application', label: 'History enable', type: 'bool', def: true},
  {key: 'adr', group: 'lorawan', label: 'ADR', type: 'bool', def: true},
  {key: 'region', group: 'lorawan', label: 'LoRaWAN region', type: 'enum', def: 0, options: [['EU868', 0], ['US915', 1], ['AU915', 2]]},
  {key: 'cap_barometer', group: 'sensors', label: 'Barometer capability', type: 'bool', def: true},
  {key: 'cap_accelerometer', group: 'sensors', label: 'Accelerometer capability', type: 'bool', def: true},
  {key: 'accel_motion_sensitivity', group: 'sensors', label: 'Motion sensitivity', type: 'enum', def: 0, options: [['Off', 0], ['Low', 1], ['Medium', 2], ['High', 3]]},
];

const SIMPLE = [
  ['get_info', 'Get device info'],
  ['force_send', 'Force a report now'],
  ['get_config', 'Dump configuration'],
  ['w1_scan', 'Scan 1-Wire bus'],
  ['clock_sync', 'Sync wall clock'],
  ['settings_save', 'Save config (reboots)'],
  ['reboot', 'Reboot'],
  ['factory_reset', 'Factory reset'],
  ['lrw_reset', 'Reset LoRaWAN counters'],
  ['lrw_join', 'Force (re)join'],
  ['enter_calibration', 'Enter calibration'],
];

const DEFAULT_RULE = {
  slot: '0', action: 'set', enabled: true, source: 'onboard', quantity: 'temperature',
  lo: '5', hi: '30', hst: '1', from: '0', to: '1', count: '10',
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

  const [cfgRows, setCfgRows] = useState([defaultCfgRow()]);
  const [aRules, setARules] = useState([{...DEFAULT_RULE}]);

  const [cHallL, setCHallL] = useState(true);
  const [cHallR, setCHallR] = useState(false);
  const [cInA, setCInA] = useState(false);
  const [cInB, setCInB] = useState(false);

  const [hFrom, setHFrom] = useState('1780000000');
  const [hTo, setHTo] = useState('1780003600');

  const [custom, setCustom] = useState('{\n  "command": "get_info",\n  "seq": 1\n}');

  const seqN = int(seq, 1) & 0xff;

  // --- config row helpers ---
  const updCfg = (i, patch) => setCfgRows((rs) => rs.map((r, j) => (j === i ? {...r, ...patch} : r)));
  const addCfg = () => setCfgRows((rs) => [...rs, defaultCfgRow()]);
  const rmCfg = (i) => setCfgRows((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : rs));

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
        const slot = Math.max(0, Math.min(15, int(r.slot, 0)));
        const q = byId(QUANTITIES, r.quantity);
        alarms['alarm_' + slot] =
          r.action === 'clear'
            ? EMPTY_SLOT
            : packAlarm({
                sourceId: r.source,
                quantityId: r.quantity,
                enabled: r.enabled,
                lo: num(r.lo),
                hi: q.kind === 'count' ? num(r.count) : num(r.hi),
                hst: num(r.hst),
                from: r.from === '1',
                to: r.to === '1',
              });
      }
      const sp = {alarms};
      if (saveAfter) sp.save = true;
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

    return null;
  }, [cmd, seqN, cfgRows, aRules, saveAfter, cHallL, cHallR, cInA, cInB, hFrom, hTo]);

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
    return built ? encodeObject(built) : {error: 'Nothing to encode'};
  }, [cmd, custom, built]);

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
            const valid = validQuantityIds(r.source);
            const q = byId(QUANTITIES, r.quantity);
            return (
              <div key={i} className={styles.rule}>
                <div className={styles.inline}>
                  <div><label className={styles.label}>Slot (0-15)</label><input className={styles.inputSm} type="number" min="0" max="15" value={r.slot} onChange={(e) => updRule(i, {slot: e.target.value})} /></div>
                  <div><label className={styles.label}>Action</label>
                    <select className={styles.select} value={r.action} onChange={(e) => updRule(i, {action: e.target.value})}>
                      <option value="set">Set rule</option>
                      <option value="clear">Clear slot</option>
                    </select>
                  </div>
                  {aRules.length > 1 && <button type="button" className={styles.remove} onClick={() => rmRule(i)}>Remove</button>}
                </div>
                {r.action === 'set' && (
                  <>
                    <div className={styles.inline}>
                      <div><label className={styles.label}>Source</label>
                        <select className={styles.select} value={r.source} onChange={(e) => setRuleSource(i, e.target.value)}>
                          {SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      </div>
                      <div><label className={styles.label}>Quantity</label>
                        <select className={styles.select} value={r.quantity} onChange={(e) => updRule(i, {quantity: e.target.value})}>
                          {QUANTITIES.filter((x) => valid.includes(x.id)).map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                        </select>
                      </div>
                      <label className={styles.check}><input type="checkbox" checked={r.enabled} onChange={(e) => updRule(i, {enabled: e.target.checked})} /> Enabled</label>
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
        v1.4.0. Queue the hex on fPort 85, or send the JSON if the codec is installed as the downlink
        payload formatter.
      </p>
    </div>
  );
}
