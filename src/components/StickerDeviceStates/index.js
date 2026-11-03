import React from 'react';
import {translate} from '@docusaurus/Translate';
import LedPattern from '../LedPattern';
import styles from './styles.module.css';

// Device states of STICKER firmware v2.0.0 as the user sees them on the status LED.
// Facts: sticker/device-behavior/startup.md and network-connection.md.

function Card({title, pattern, text, timing, highlight}) {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ''}`}>
      <div className={styles.title}>{title}</div>
      <LedPattern pattern={pattern} />
      <div className={styles.text}>{text}</div>
      {timing && <div className={styles.timing}>{timing}</div>}
    </div>
  );
}

function Arrow({both}) {
  return (
    <span className={styles.arrow} aria-hidden="true">
      {both ? '⇄' : '→'}
    </span>
  );
}

export default function StickerDeviceStates() {
  const every3s = translate({id: 'sticker.deviceBehavior.states.every3s', message: 'every 3 s'});
  return (
    <div
      className={styles.states}
      role="group"
      aria-label={translate({
        id: 'sticker.deviceBehavior.states.ariaLabel',
        message: 'STICKER device states and their LED patterns',
      })}>
      <div className={styles.section}>
        {translate({id: 'sticker.deviceBehavior.states.normal', message: 'Normal operation'})}
      </div>
      <div className={styles.flow}>
        <Card
          title={translate({id: 'sticker.deviceBehavior.states.startup.title', message: 'Startup'})}
          pattern="red yellow green"
          text={translate({
            id: 'sticker.deviceBehavior.states.startup.text',
            message: 'Lights red, yellow and green once, then joins the network.',
          })}
          timing={translate({id: 'sticker.deviceBehavior.states.startup.timing', message: 'once, about 3 s'})}
        />
        <Arrow />
        <Card
          title={translate({id: 'sticker.deviceBehavior.states.joining.title', message: 'Joining'})}
          pattern="yellow red"
          text={translate({
            id: 'sticker.deviceBehavior.states.joining.text',
            message: 'Not on the network yet. Tries again after about 1 min, then with longer pauses, up to 1 h.',
          })}
          timing={every3s}
        />
        <Arrow />
        <Card
          highlight
          title={translate({id: 'sticker.deviceBehavior.states.connected.title', message: 'Connected'})}
          pattern="green"
          text={translate({
            id: 'sticker.deviceBehavior.states.connected.text',
            message: 'Everything works. Sends measurements every 15 min by default.',
          })}
          timing={every3s}
        />
        <Arrow both />
        <Card
          title={translate({id: 'sticker.deviceBehavior.states.weak.title', message: 'Weak signal'})}
          pattern="yellow yellow"
          text={translate({
            id: 'sticker.deviceBehavior.states.weak.text',
            message: 'Still connected, but the network stopped answering. Tries a more robust data rate.',
          })}
          timing={every3s}
        />
      </div>
      <div className={styles.rejoin}>
        <span className={styles.rejoinIcon} aria-hidden="true">↩</span>
        {translate({
          id: 'sticker.deviceBehavior.states.rejoin',
          message:
            'If the signal does not recover, the device joins the network again, about 4–5 h after the link was lost.',
        })}
      </div>
      <div className={styles.section}>
        {translate({id: 'sticker.deviceBehavior.states.other', message: 'Other states'})}
      </div>
      <div className={styles.grid}>
        <Card
          title={translate({id: 'sticker.deviceBehavior.states.radioOff.title', message: 'Radio off'})}
          pattern="yellow"
          text={translate({
            id: 'sticker.deviceBehavior.states.radioOff.text',
            message: 'Measures but sends nothing. Switch the radio on in HARDWARIO Manager.',
          })}
          timing={every3s}
        />
        <Card
          title={translate({id: 'sticker.deviceBehavior.states.alarm.title', message: 'Alarm active'})}
          pattern="red"
          text={translate({
            id: 'sticker.deviceBehavior.states.alarm.text',
            message: 'A very short red flash, shown only in the Connected state.',
          })}
          timing={every3s}
        />
        <Card
          title={translate({id: 'sticker.deviceBehavior.states.battery.title', message: 'Battery too low'})}
          pattern="red red red"
          text={translate({
            id: 'sticker.deviceBehavior.states.battery.text',
            message: 'Below 1.8 V at startup: blinks red for 5 s and switches off. Replace the batteries.',
          })}
        />
        <Card
          title={translate({id: 'sticker.deviceBehavior.states.calibration.title', message: 'Calibration'})}
          pattern="orange"
          text={translate({
            id: 'sticker.deviceBehavior.states.calibration.text',
            message: 'Service test mode. Lasts 120 min, then the device restarts.',
          })}
          timing={translate({id: 'sticker.deviceBehavior.states.calibration.timing', message: 'every second'})}
        />
      </div>
    </div>
  );
}
