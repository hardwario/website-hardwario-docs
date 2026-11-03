import React from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

// STICKER status LED colours as the user sees them. Orange is red and green lit
// together. The pattern is a space-separated list of colours, e.g. "yellow red".
const COLORS = ['red', 'yellow', 'green', 'orange'];

function colorName(color) {
  switch (color) {
    case 'red':
      return translate({id: 'sticker.deviceBehavior.led.red', message: 'red'});
    case 'yellow':
      return translate({id: 'sticker.deviceBehavior.led.yellow', message: 'yellow'});
    case 'green':
      return translate({id: 'sticker.deviceBehavior.led.green', message: 'green'});
    default:
      return translate({id: 'sticker.deviceBehavior.led.orange', message: 'orange'});
  }
}

export default function LedPattern({pattern = ''}) {
  const dots = pattern.split(/\s+/).filter((color) => COLORS.includes(color));
  const label = translate(
    {id: 'sticker.deviceBehavior.led.label', message: 'LED: {colors}'},
    {colors: dots.map(colorName).join(', ')},
  );
  return (
    <span className={styles.pattern} role="img" aria-label={label} title={label}>
      {dots.map((color, index) => (
        <span key={index} className={`${styles.dot} ${styles[color]}`} />
      ))}
    </span>
  );
}
