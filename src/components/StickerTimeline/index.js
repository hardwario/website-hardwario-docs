import React from 'react';
import {translate} from '@docusaurus/Translate';
import LedPattern from '../LedPattern';
import styles from './styles.module.css';

// Timelines for the STICKER device behavior chapter (firmware v2.0.0, default settings).
// Facts: sticker/device-behavior/messages.md and network-connection.md.

function messagesSteps() {
  return [
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.messages.powerUp.title', message: 'Power-up'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.messages.powerUp.text', message: 'Boot sequence, about 3 s'}),
      pattern: 'red yellow green',
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.messages.join.title', message: 'Join'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.messages.join.text', message: 'Joins the network'}),
      pattern: 'yellow red',
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.messages.info.title', message: 'Info and settings'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.messages.info.text', message: 'Sent after every join'}),
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.messages.telemetry.title', message: 'Telemetry'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.messages.telemetry.text', message: 'Every 15 min by default'}),
      pattern: 'green',
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.messages.daily.title', message: 'Info and settings'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.messages.daily.text', message: 'Again every 24 h'}),
    },
  ];
}

function linkLossSteps() {
  return [
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.lost.title', message: 'Link lost'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.lost.text', message: 'The gateway no longer hears the device'}),
      pattern: 'green',
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.checks.title', message: 'Checks fail'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.checks.text', message: 'Every 5th report carries a link check'}),
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.weak.title', message: 'Weak signal'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.weak.text', message: 'After 3 failed checks, a slower and more robust data rate'}),
      pattern: 'yellow yellow',
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.rejoin.title', message: 'Rejoin'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.rejoin.text', message: 'About 4–5 h after the link was lost'}),
      pattern: 'yellow red',
    },
    {
      title: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.back.title', message: 'Connected'}),
      text: translate({id: 'sticker.deviceBehavior.timeline.linkLoss.back.text', message: 'Data arrives again'}),
      pattern: 'green',
    },
  ];
}

export default function StickerTimeline({variant = 'messages'}) {
  const steps = variant === 'link-loss' ? linkLossSteps() : messagesSteps();
  const label =
    variant === 'link-loss'
      ? translate({
          id: 'sticker.deviceBehavior.timeline.linkLoss.ariaLabel',
          message: 'What STICKER does when it loses the radio link',
        })
      : translate({
          id: 'sticker.deviceBehavior.timeline.messages.ariaLabel',
          message: 'What STICKER sends after power-up',
        });
  return (
    <div className={styles.timeline} role="group" aria-label={label}>
      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          <div className={styles.node} aria-hidden="true">
            {index + 1}
          </div>
          <div className={styles.body}>
            <div className={styles.title}>{step.title}</div>
            <div className={styles.text}>{step.text}</div>
            {step.pattern && (
              <div className={styles.led}>
                <LedPattern pattern={step.pattern} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
