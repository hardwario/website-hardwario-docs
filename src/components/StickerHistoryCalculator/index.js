import React, {useId, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {usePluralForm} from '@docusaurus/theme-common';
import styles from './styles.module.css';

// --- History buffer model (app_history.c, boards/sticker/sticker.dts, firmware v1.4.0) ---
// The 32 KB history partition is a ring of 16 flash pages of 2 KB. Each page opens with a
// 32 B header; the rest is programmed in 8 B double words that carry 7 B of record data
// each, so a page holds (2048 - 32) / 8 * 7 = 1764 B of records. A record never crosses a
// page boundary and stores values only (its time is buffer start + ordinal * interval).
const PAGES = 16;
const PAGE_DATA = 1764;

// config interval-report: range and default (app_config.c).
const INTERVAL_MIN = 60;
const INTERVAL_MAX = 86400;
const INTERVAL_DEFAULT = 900;

// config history-sensors default: temperature + humidity.
const MASK_DEFAULT = 0b11;

// Recordable channels in the bit order of the history-sensors mask
// (enum app_history_sensor), with their stored size in bytes (m_desc).
const CHANNELS = [
  ['temperature', 2, 'ambient'],
  ['humidity', 1, 'ambient'],
  ['s1-temp', 2, 'w1'],
  ['s1-hum', 1, 'w1'],
  ['s2-temp', 2, 'w1'],
  ['s2-hum', 1, 'w1'],
  ['s3-temp', 2, 'w1'],
  ['s3-hum', 1, 'w1'],
  ['s4-temp', 2, 'w1'],
  ['s4-hum', 1, 'w1'],
  ['hall-left', 4, 'counters'],
  ['hall-right', 4, 'counters'],
  ['input-a', 4, 'counters'],
  ['input-b', 4, 'counters'],
  ['motion', 4, 'pir'],
  ['pressure', 2, 'other'],
  ['illuminance', 2, 'other'],
  ['orientation', 1, 'other'],
  ['accel-motion', 4, 'other'],
].map(([name, size, group], bit) => ({name, size, group, bit}));

const GROUPS = ['ambient', 'w1', 'counters', 'pir', 'other'];

const DAY = 86400;
const round1 = (x) => Math.round(x * 10) / 10;

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
  const [mask, setMask] = useState(MASK_DEFAULT);
  const [intervalText, setIntervalText] = useState(String(INTERVAL_DEFAULT));
  const uid = useId();

  // What each channel records, shown while the channel is hovered or focused. Resolutions
  // follow the stored encodings in m_desc (app_history.c).
  const w1Temp = translate({
    id: 'sticker.historyCalculator.info.w1Temp',
    message: 'Temperature from the 1-Wire sensor in slot {slot}, for example a DS18B20 probe, stored in 0.01 °C steps.',
  });
  const w1Hum = translate({
    id: 'sticker.historyCalculator.info.w1Hum',
    message: 'Humidity from the 1-Wire sensor in slot {slot}. Stays empty for temperature-only probes such as the DS18B20.',
  });
  const input = translate({
    id: 'sticker.historyCalculator.info.input',
    message: 'Running total of pulses counted on input {input}, for example from an S0 meter output.',
  });
  const info = {
    temperature: translate({id: 'sticker.historyCalculator.info.temperature', message: 'Air temperature from the built-in sensor, stored in 0.01 °C steps.'}),
    humidity: translate({id: 'sticker.historyCalculator.info.humidity', message: 'Relative humidity from the built-in sensor, stored in 0.5 % steps.'}),
    ...Object.fromEntries([1, 2, 3, 4].flatMap((slot) => [
      [`s${slot}-temp`, w1Temp.replace('{slot}', slot)],
      [`s${slot}-hum`, w1Hum.replace('{slot}', slot)],
    ])),
    'hall-left': translate({id: 'sticker.historyCalculator.info.hallLeft', message: 'Running total of activations of the left Hall sensor, for example door openings detected by a magnet.'}),
    'hall-right': translate({id: 'sticker.historyCalculator.info.hallRight', message: 'Running total of activations of the right Hall sensor, for example door openings detected by a magnet.'}),
    'input-a': input.replace('{input}', 'A'),
    'input-b': input.replace('{input}', 'B'),
    motion: translate({id: 'sticker.historyCalculator.info.motion', message: 'Running total of motion detections by the PIR sensor.'}),
    pressure: translate({id: 'sticker.historyCalculator.info.pressure', message: 'Atmospheric pressure from the built-in barometer, stored in 0.1 hPa steps.'}),
    illuminance: translate({id: 'sticker.historyCalculator.info.illuminance', message: 'Ambient light from the built-in light sensor, stored in 2 lx steps.'}),
    orientation: translate({id: 'sticker.historyCalculator.info.orientation', message: 'How the device is oriented, from the accelerometer, as a value from 1 to 6.'}),
    'accel-motion': translate({id: 'sticker.historyCalculator.info.accelMotion', message: 'Running total of movement events detected by the accelerometer, counted separately from the PIR sensor.'}),
  };

  const groupLabels = {
    ambient: translate({id: 'sticker.historyCalculator.group.ambient', message: 'Integrated ambient sensors'}),
    w1: translate({id: 'sticker.historyCalculator.group.w1', message: '1-Wire sensor slots'}),
    counters: translate({id: 'sticker.historyCalculator.group.counters', message: 'Pulse and counter inputs'}),
    pir: translate({id: 'sticker.historyCalculator.group.pir', message: 'PIR motion detection'}),
    other: translate({id: 'sticker.historyCalculator.group.other', message: 'Barometer, light sensor and accelerometer'}),
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

  const toggle = (bit) => setMask((m) => m ^ (1 << bit));
  const recordSize = CHANNELS.reduce((sum, c) => (mask & (1 << c.bit) ? sum + c.size : sum), 0);
  const interval = Number(intervalText);
  const intervalOk = Number.isInteger(interval) && interval >= INTERVAL_MIN && interval <= INTERVAL_MAX;

  const perPage = recordSize ? Math.floor(PAGE_DATA / recordSize) : 0;
  const capacity = PAGES * perPage;
  const seconds = capacity * interval;
  // Once the ring is full, the oldest page is erased in one step before the next one opens,
  // so the stored history moves between 15 and 16 pages' worth of records.
  const lowSeconds = (PAGES - 1) * perPage * interval;
  const range = `${format(round1(lowSeconds / (seconds < 2 * DAY ? 3600 : DAY)))}–${span(seconds)}`;

  const hex = `0x${mask.toString(16).toUpperCase().padStart(4, '0')}`;
  const commands = [
    'config history-enable true',
    `config history-sensors ${mask}`,
    `config interval-report ${interval}`,
    'settings save',
  ].join('\n');

  return (
    <div className={styles.calculator}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>
          {translate({id: 'sticker.historyCalculator.channels', message: 'Channels'})} (<code>history-sensors</code>)
        </legend>
        <div className={styles.hint}>
          {translate({id: 'sticker.historyCalculator.infoHint', message: 'Hover over or focus a channel to see what it records.'})}
        </div>
        {GROUPS.map((group) => (
          <div key={group} className={styles.group}>
            <div className={styles.groupLabel}>{groupLabels[group]}</div>
            <div className={styles.inline}>
              {CHANNELS.filter((c) => c.group === group).map((c) => (
                <span key={c.name} className={styles.channel}>
                  <label className={styles.check}>
                    <input type="checkbox" checked={Boolean(mask & (1 << c.bit))} onChange={() => toggle(c.bit)}
                      aria-describedby={`${uid}-${c.name}`} />
                    <code>{c.name}</code>
                    <span className={styles.size}>{c.size} B</span>
                  </label>
                  <span id={`${uid}-${c.name}`} role="tooltip" className={styles.help}>{info[c.name]}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
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
            {translate({id: 'sticker.historyCalculator.empty', message: 'Select at least one channel. With an empty mask, STICKER records no history.'})}
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
              <dt>{translate({id: 'sticker.historyCalculator.recordSize', message: 'Record size'})}</dt>
              <dd>{recordSize} B</dd>
              <dt>{translate({id: 'sticker.historyCalculator.perPage', message: 'Records per page'})}</dt>
              <dd>{format(perPage)}</dd>
              <dt>{translate({id: 'sticker.historyCalculator.capacity', message: 'Capacity'})}</dt>
              <dd>{plural(capacity, units.records)}</dd>
              <dt>{translate({id: 'sticker.historyCalculator.covered', message: 'Time covered'})}</dt>
              <dd><strong>{covered(seconds)}</strong></dd>
              <dt>{translate({id: 'sticker.historyCalculator.mask', message: 'Mask'})}</dt>
              <dd><code>{mask}</code> ({hex})</dd>
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
        {translate({id: 'sticker.historyCalculator.note', message: 'Channel sizes and the flash layout follow STICKER firmware v1.4.0.'})}
      </p>
    </div>
  );
}
