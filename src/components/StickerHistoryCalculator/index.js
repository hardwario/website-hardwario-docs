import React, {useId, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {usePluralForm} from '@docusaurus/theme-common';
import styles from './styles.module.css';

// --- History buffer model (app_history.c, boards/sticker/sticker.dts, firmware v2.0.0) ---
// The 32 KB history partition is a ring of 16 flash pages of 2 KB. Each page opens with a
// 40 B header; the rest is programmed in 8 B double words that carry 7 B of record data
// each, so a page holds (2048 - 40) / 8 * 7 = 1757 B of records. A record never crosses a
// page boundary and stores values only (its time is the page base + ordinal * interval).
const FIRMWARE = 'v2.0.0';
const PAGES = 16;
const PAGE_DATA = 1757;

// config history-channels: up to 24 one-byte entries (slot << 5 | channel), 0xff = unused.
const MAX_ENTRIES = 24;
const UNUSED = 0xff;
const entryOf = (slot, ch) => (slot << 5) | ch;
const slotOf = (entry) => entry >> 5;

// Default selection: onboard temperature + humidity.
const DEFAULT_ENTRIES = [entryOf(0, 0), entryOf(0, 1)];

// config interval-report: range and default (app_config.yml).
const INTERVAL_MIN = 60;
const INTERVAL_MAX = 86400;
const INTERVAL_DEFAULT = 900;

// Motherboard channels (slot 0, app_sensor_types.yaml type 1) with their history encoding
// size in bytes (u8 = 1, i16/u16 = 2, u32 = 4), grouped for display.
const MB_CHANNELS = [
  [0, 'temperature', 2, 'ambient'],
  [1, 'humidity', 1, 'ambient'],
  [2, 'pressure', 2, 'ambient'],
  [3, 'illuminance', 2, 'ambient'],
  [4, 'temperature-baro', 2, 'ambient'],
  [21, 'altitude', 2, 'ambient'],
  [5, 'hall-left-state', 1, 'hall'],
  [6, 'hall-left-count', 4, 'hall'],
  [7, 'hall-right-state', 1, 'hall'],
  [8, 'hall-right-count', 4, 'hall'],
  [9, 'input-a-state', 1, 'inputs'],
  [10, 'input-a-count', 4, 'inputs'],
  [11, 'input-a-voltage', 2, 'inputs'],
  [12, 'input-b-state', 1, 'inputs'],
  [13, 'input-b-count', 4, 'inputs'],
  [14, 'input-b-voltage', 2, 'inputs'],
  [15, 'pir-motion', 1, 'pir'],
  [16, 'pir-count', 4, 'pir'],
  [17, 'accel-motion', 1, 'accel'],
  [18, 'accel-count', 4, 'accel'],
  [19, 'accel-orientation', 1, 'accel'],
  [20, 'battery-voltage', 2, 'supply'],
].map(([ch, name, size, group]) => ({entry: entryOf(0, ch), name, size, group}));

const MB_GROUPS = ['ambient', 'hall', 'inputs', 'pir', 'accel', 'supply'];

// 1-Wire sensor types (sensorN-type) and their channels with the history size in bytes.
const W1_TYPES = {
  2: {name: 'dallas (DS18B20)', channels: [[0, 'temperature', 2]]},
  3: {
    name: 'machine-probe',
    channels: [
      [0, 'temperature', 2],
      [1, 'humidity', 1],
      [2, 'temperature-aux', 2],
      [3, 'illuminance', 2],
      [4, 'magnetic-field', 2],
      [5, 'tilt', 1],
      [6, 'accel-x', 2],
      [7, 'accel-y', 2],
      [8, 'accel-z', 2],
    ],
  },
};
const W1_SLOTS = [1, 2, 3, 4];

const w1Channels = (slot, type) =>
  (W1_TYPES[type]?.channels ?? []).map(([ch, name, size]) => ({
    entry: entryOf(slot, ch), name: `s${slot}-${name}`, base: name, size, slot,
  }));

const DAY = 86400;
const round1 = (x) => Math.round(x * 10) / 10;
const hex2 = (n) => n.toString(16).padStart(2, '0');

const copy = (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(text);
};

// 900 -> "15 min", 5400 -> "1 h 30 min", 61 -> "1 min 1 s"
function clock(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h && `${h} h`, m && `${m} min`, sec && `${sec} s`].filter(Boolean).join(' ');
}

export default function StickerHistoryCalculator() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const {selectMessage} = usePluralForm();
  const [entries, setEntries] = useState(DEFAULT_ENTRIES);
  const [slotTypes, setSlotTypes] = useState([0, 0, 0, 0]);
  const [intervalText, setIntervalText] = useState(String(INTERVAL_DEFAULT));
  const uid = useId();

  // What each channel records, shown while the channel is hovered or focused. Resolutions
  // follow the history encodings in app_sensor_types.yaml.
  const input = translate({
    id: 'sticker.historyCalculator.info.input',
    message: 'Running total of pulses counted on input {input}, for example from an S0 meter output.',
  });
  const inputState = translate({
    id: 'sticker.historyCalculator.info.inputState',
    message: 'State of input {input} in digital mode: 1 or 0.',
  });
  const inputVoltage = translate({
    id: 'sticker.historyCalculator.info.inputVoltage',
    message: 'Voltage on input {input} in analog mode, stored in 0.001 V steps.',
  });
  const mbInfo = {
    temperature: translate({id: 'sticker.historyCalculator.info.temperature', message: 'Air temperature from the built-in sensor, stored in 0.01 °C steps.'}),
    humidity: translate({id: 'sticker.historyCalculator.info.humidity', message: 'Relative humidity from the built-in sensor, stored in 0.5 % steps.'}),
    pressure: translate({id: 'sticker.historyCalculator.info.pressure', message: 'Atmospheric pressure from the built-in barometer, stored in 0.1 hPa steps.'}),
    illuminance: translate({id: 'sticker.historyCalculator.info.illuminance', message: 'Ambient light from the built-in light sensor, stored in 2 lx steps.'}),
    'temperature-baro': translate({id: 'sticker.historyCalculator.info.temperatureBaro', message: 'Temperature measured by the built-in barometer, stored in 0.01 °C steps.'}),
    altitude: translate({id: 'sticker.historyCalculator.info.altitude', message: 'Barometric altitude from the built-in barometer, stored in 1 m steps.'}),
    'hall-left-state': translate({id: 'sticker.historyCalculator.info.hallLeftState', message: 'State of the left Hall sensor, which reacts to a magnet: 1 or 0.'}),
    'hall-left-count': translate({id: 'sticker.historyCalculator.info.hallLeft', message: 'Running total of activations of the left Hall sensor, for example door openings detected by a magnet.'}),
    'hall-right-state': translate({id: 'sticker.historyCalculator.info.hallRightState', message: 'State of the right Hall sensor, which reacts to a magnet: 1 or 0.'}),
    'hall-right-count': translate({id: 'sticker.historyCalculator.info.hallRight', message: 'Running total of activations of the right Hall sensor, for example door openings detected by a magnet.'}),
    'input-a-state': inputState.replace('{input}', 'A'),
    'input-a-count': input.replace('{input}', 'A'),
    'input-a-voltage': inputVoltage.replace('{input}', 'A'),
    'input-b-state': inputState.replace('{input}', 'B'),
    'input-b-count': input.replace('{input}', 'B'),
    'input-b-voltage': inputVoltage.replace('{input}', 'B'),
    'pir-motion': translate({id: 'sticker.historyCalculator.info.pirMotion', message: '1 if the PIR sensor detected motion during the interval, otherwise 0.'}),
    'pir-count': translate({id: 'sticker.historyCalculator.info.motion', message: 'Running total of motion detections by the PIR sensor.'}),
    'accel-motion': translate({id: 'sticker.historyCalculator.info.accelMotionFlag', message: '1 if the accelerometer detected movement during the interval, otherwise 0.'}),
    'accel-count': translate({id: 'sticker.historyCalculator.info.accelMotion', message: 'Running total of movement events detected by the accelerometer, counted separately from the PIR sensor.'}),
    'accel-orientation': translate({id: 'sticker.historyCalculator.info.orientation', message: 'How the device is oriented, from the accelerometer, as a value from 1 to 6.'}),
    'battery-voltage': translate({id: 'sticker.historyCalculator.info.battery', message: 'Battery voltage, stored in 0.001 V steps.'}),
  };
  const w1Info = {
    dallas: translate({id: 'sticker.historyCalculator.info.w1Temp', message: 'Temperature from the 1-Wire sensor in slot {slot}, for example a DS18B20 probe, stored in 0.01 °C steps.'}),
    temperature: translate({id: 'sticker.historyCalculator.info.mpTemperature', message: 'Temperature from the machine probe in slot {slot}, stored in 0.01 °C steps.'}),
    humidity: translate({id: 'sticker.historyCalculator.info.mpHumidity', message: 'Relative humidity from the machine probe in slot {slot}, stored in 0.5 % steps.'}),
    'temperature-aux': translate({id: 'sticker.historyCalculator.info.mpTemperatureAux', message: 'Second temperature from the machine probe in slot {slot} (TMP112 sensor), stored in 0.01 °C steps.'}),
    illuminance: translate({id: 'sticker.historyCalculator.info.mpIlluminance', message: 'Ambient light from the machine probe in slot {slot}, stored in 2 lx steps.'}),
    'magnetic-field': translate({id: 'sticker.historyCalculator.info.mpMagnetic', message: 'Magnetic field from the machine probe in slot {slot}, stored in 0.01 mT steps.'}),
    tilt: translate({id: 'sticker.historyCalculator.info.mpTilt', message: 'Tilt alert from the machine probe in slot {slot}: 1 or 0.'}),
    accel: translate({id: 'sticker.historyCalculator.info.mpAccel', message: 'Acceleration along the {axis} axis from the machine probe in slot {slot}, stored in 0.01 m/s² steps.'}),
  };
  const w1Text = (c, type) => {
    const key = type === 2 ? 'dallas' : c.base.startsWith('accel-') ? 'accel' : c.base;
    return w1Info[key].replace('{slot}', `s${c.slot}`).replace('{axis}', c.base.slice(-1).toUpperCase());
  };

  const groupLabels = {
    ambient: translate({id: 'sticker.historyCalculator.group.ambient', message: 'Integrated ambient sensors'}),
    hall: translate({id: 'sticker.historyCalculator.group.hall', message: 'Hall sensors'}),
    inputs: translate({id: 'sticker.historyCalculator.group.inputs', message: 'External inputs A and B'}),
    pir: translate({id: 'sticker.historyCalculator.group.pir', message: 'PIR motion detection'}),
    accel: translate({id: 'sticker.historyCalculator.group.accel', message: 'Accelerometer'}),
    supply: translate({id: 'sticker.historyCalculator.group.supply', message: 'Battery'}),
    w1: translate({id: 'sticker.historyCalculator.group.w1', message: '1-Wire sensor slots'}),
  };

  // Plural messages: "one|other" in English, "one|few|many|other" in Czech.
  const units = {
    records: translate({id: 'sticker.historyCalculator.records', message: '{count} record|{count} records'}),
    hours: translate({id: 'sticker.historyCalculator.hours', message: '{count} hour|{count} hours'}),
    days: translate({id: 'sticker.historyCalculator.days', message: '{count} day|{count} days'}),
    weeks: translate({id: 'sticker.historyCalculator.weeks', message: '{count} week|{count} weeks'}),
    months: translate({id: 'sticker.historyCalculator.months', message: '{count} month|{count} months'}),
    years: translate({id: 'sticker.historyCalculator.years', message: '{count} year|{count} years'}),
  };

  const format = (n) => new Intl.NumberFormat(currentLocale, {maximumFractionDigits: 1}).format(n);
  const plural = (count, message) => selectMessage(count, message.split('{count}').join(format(count)));

  // The main figure is in hours below two days and in days above; longer spans add weeks and
  // months, the longest years.
  const span = (sec) => (sec < 2 * DAY ? plural(round1(sec / 3600), units.hours) : plural(round1(sec / DAY), units.days));
  const covered = (sec) => {
    const days = sec / DAY;
    const main = span(sec);
    if (days >= 730) return `${main} (${plural(round1(days / 365.25), units.years)})`;
    if (days >= 61) return `${main} (${plural(round1(days / 7), units.weeks)}, ${plural(round1(days / 30.44), units.months)})`;
    if (days >= 14) return `${main} (${plural(round1(days / 7), units.weeks)})`;
    return main;
  };

  // Every channel that can be picked now: the motherboard plus the typed 1-Wire slots.
  const available = [...MB_CHANNELS, ...W1_SLOTS.flatMap((slot) => w1Channels(slot, slotTypes[slot - 1]))];
  const sizeOf = new Map(available.map((c) => [c.entry, c.size]));

  const full = entries.length >= MAX_ENTRIES;
  // The record keeps the order of history-channels, so a new channel is appended.
  const toggle = (entry) => setEntries((list) =>
    list.includes(entry) ? list.filter((e) => e !== entry) : list.length < MAX_ENTRIES ? [...list, entry] : list);
  // A slot's channels depend on its sensor type, so a new type drops the slot's entries.
  const setSlotType = (slot, type) => {
    setSlotTypes((types) => types.map((t, i) => (i === slot - 1 ? type : t)));
    setEntries((list) => list.filter((e) => slotOf(e) !== slot));
  };

  const recordSize = entries.reduce((sum, e) => sum + (sizeOf.get(e) ?? 0), 0);
  const interval = Number(intervalText);
  const intervalOk = Number.isInteger(interval) && interval >= INTERVAL_MIN && interval <= INTERVAL_MAX;

  const perPage = recordSize ? Math.floor(PAGE_DATA / recordSize) : 0;
  const capacity = PAGES * perPage;
  const seconds = capacity * interval;
  // Once the ring is full, the oldest page is erased in one step before the next one opens,
  // so the stored history moves between 15 and 16 pages' worth of records.
  const lowSeconds = (PAGES - 1) * perPage * interval;
  const range = `${format(round1(lowSeconds / (seconds < 2 * DAY ? 3600 : DAY)))}–${span(seconds)}`;

  const hex = [...entries, ...Array(MAX_ENTRIES - entries.length).fill(UNUSED)].map(hex2).join('');
  const typedSlots = W1_SLOTS.filter((slot) => slotTypes[slot - 1] && entries.some((e) => slotOf(e) === slot));
  const commands = [
    ...typedSlots.map((slot) => `config sensor${slot}-type ${slotTypes[slot - 1]}`),
    `config history-channels ${hex}`,
    'config history-enable true',
    `config interval-report ${interval}`,
    'settings save',
  ].join('\n');

  const renderChannel = (c, help) => {
    const checked = entries.includes(c.entry);
    return (
      <span key={c.entry} className={styles.channel}>
        <label className={styles.check}>
          <input type="checkbox" checked={checked} disabled={!checked && full} onChange={() => toggle(c.entry)}
            aria-describedby={`${uid}-${c.entry}`} />
          <code>{c.name}</code>
          <span className={styles.size}>{c.size} B</span>
        </label>
        <span id={`${uid}-${c.entry}`} role="tooltip" className={styles.help}>{help}</span>
      </span>
    );
  };

  return (
    <div className={styles.calculator}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>
          {translate({id: 'sticker.historyCalculator.channels', message: 'Channels'})} (<code>history-channels</code>)
        </legend>
        <div className={styles.hint}>
          {translate({id: 'sticker.historyCalculator.infoHint', message: 'Hover over or focus a channel to see what it records.'})}
        </div>
        {MB_GROUPS.map((group) => (
          <div key={group} className={styles.group}>
            <div className={styles.groupLabel}>{groupLabels[group]}</div>
            <div className={styles.inline}>
              {MB_CHANNELS.filter((c) => c.group === group).map((c) => renderChannel(c, mbInfo[c.name]))}
            </div>
          </div>
        ))}
        <div className={styles.group}>
          <div className={styles.groupLabel}>{groupLabels.w1}</div>
          <div className={styles.hint}>
            {translate({
              id: 'sticker.historyCalculator.w1Hint',
              message: 'Pick the sensor type of a slot (config sensor1-type … sensor4-type) to list its channels.',
            })}
          </div>
        </div>
        {W1_SLOTS.map((slot) => {
          const type = slotTypes[slot - 1];
          return (
            <div key={slot} className={styles.group}>
              <div className={styles.inline}>
                <label className={styles.check} htmlFor={`${uid}-slot${slot}`}><code>s{slot}</code></label>
                <select id={`${uid}-slot${slot}`} className={styles.select} value={type}
                  onChange={(e) => setSlotType(slot, Number(e.target.value))}>
                  <option value={0}>none</option>
                  {Object.entries(W1_TYPES).map(([id, t]) => <option key={id} value={id}>{t.name}</option>)}
                </select>
                {w1Channels(slot, type).map((c) => renderChannel(c, w1Text(c, type)))}
              </div>
            </div>
          );
        })}
        {full && (
          <div className={`${styles.hint} ${styles.limit}`}>
            {translate(
              {id: 'sticker.historyCalculator.limit', message: 'history-channels holds at most {max} channels.'},
              {max: MAX_ENTRIES},
            )}
          </div>
        )}
      </fieldset>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${uid}-interval`}>
          {translate({id: 'sticker.historyCalculator.interval', message: 'Report interval'})} (<code>interval-report</code>)
        </label>
        <div className={styles.inline}>
          <input id={`${uid}-interval`} className={styles.input} type="number" min={INTERVAL_MIN} max={INTERVAL_MAX} step="1"
            value={intervalText} onChange={(e) => setIntervalText(e.target.value)} />
          <span className={styles.hint}>s{intervalOk ? ` (${clock(interval)})` : ''}</span>
        </div>
      </div>

      <div className={styles.results} aria-live="polite">
        {!recordSize ? (
          <div className={styles.warning}>
            {translate({id: 'sticker.historyCalculator.emptySelection', message: 'Select at least one channel. With no channel selected, STICKER records no history.'})}
          </div>
        ) : !intervalOk ? (
          <div className={styles.error}>
            {translate(
              {id: 'sticker.historyCalculator.badInterval', message: 'Enter a report interval from {min} to {max} seconds.'},
              {min: format(INTERVAL_MIN), max: format(INTERVAL_MAX)},
            )}
          </div>
        ) : (
          <>
            <dl className={styles.grid}>
              <dt>{translate({id: 'sticker.historyCalculator.channels', message: 'Channels'})}</dt>
              <dd>{entries.length} / {MAX_ENTRIES}</dd>
              <dt>{translate({id: 'sticker.historyCalculator.recordSize', message: 'Record size'})}</dt>
              <dd>{recordSize} B</dd>
              <dt>{translate({id: 'sticker.historyCalculator.perPage', message: 'Records per page'})}</dt>
              <dd>{format(perPage)}</dd>
              <dt>{translate({id: 'sticker.historyCalculator.capacity', message: 'Capacity'})}</dt>
              <dd>{plural(capacity, units.records)}</dd>
              <dt>{translate({id: 'sticker.historyCalculator.covered', message: 'Time covered'})}</dt>
              <dd><strong>{covered(seconds)}</strong></dd>
            </dl>
            <p className={styles.wrap}>
              {translate(
                {
                  id: 'sticker.historyCalculator.wrap',
                  message: 'Once the buffer is full, STICKER erases its oldest page ({pageRecords}) in one step to make room, so the stored history then spans {range}.',
                },
                {pageRecords: plural(perPage, units.records), range},
              )}
            </p>
            <div className={styles.outputHead}>
              <span className={styles.label}>{translate({id: 'sticker.historyCalculator.commands', message: 'Shell commands'})}</span>
              <button type="button" className={styles.button} onClick={() => copy(commands)}>
                {translate({id: 'sticker.historyCalculator.copy', message: 'Copy commands'})}
              </button>
            </div>
            <code className={styles.code}>{commands}</code>
          </>
        )}
      </div>

      <p className={styles.note}>
        {translate(
          {id: 'sticker.historyCalculator.noteVersion', message: 'Channel sizes and the flash layout follow STICKER firmware {version}.'},
          {version: FIRMWARE},
        )}
      </p>
    </div>
  );
}
