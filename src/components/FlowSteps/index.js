import React from 'react';
import styles from './styles.module.css';

// A vertical sequence of steps drawn as a block diagram in the HARDWARIO style
// (Brand Guidelines HBG.261028.01, chapter 06): white nodes with a Hairline frame
// on a quiet Panel zone, a Red caps role, a bold title of one to three words and
// one Gray line of detail; thin Gray wires run from a pad at the source to an
// arrow, top to bottom because the docs column is narrow.
//
// The text comes from the page, so each language passes its own:
//   <FlowSteps zone="Firmware update" steps={[
//     {role: 'Stage 1', title: 'Preparing…', detail: 'Getting the device ready'},
//     ...
//   ]} />
export default function FlowSteps({zone, steps, label}) {
  return (
    <figure className={styles.zone} aria-label={label || zone}>
      {zone && <figcaption className={styles.zoneLabel}>{zone}</figcaption>}
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li key={i} className={styles.item}>
            {i > 0 && (
              <svg className={styles.wire} width="12" height="28" viewBox="0 0 12 28" aria-hidden="true">
                <circle cx="6" cy="2.5" r="2.5" fill="currentColor" />
                <line x1="6" y1="2.5" x2="6" y2="22" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 21.5 L6 27.5 L10 21.5 Z" fill="currentColor" />
              </svg>
            )}
            <div className={styles.node}>
              {s.role && <span className={styles.role}>{s.role}</span>}
              <span className={styles.title}>{s.title}</span>
              {s.detail && <span className={styles.detail}>{s.detail}</span>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
