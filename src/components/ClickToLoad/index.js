import React, {useEffect, useId, useRef, useState} from 'react';
import styles from './styles.module.css';

// A placeholder that stands in for third-party content (a YouTube video, a live
// dashboard) until the visitor asks for it. Until the button is pressed the page
// makes no request to the third party at all: the poster is drawn here, with no
// remote thumbnail, and `children` is not rendered, not even on the server.
//
// The notice under the poster says where the content comes from, so the click
// is an informed one. It stays after loading, so nothing jumps.
//
// After the click, focus moves into the loaded content (its first iframe),
// because the button that had focus no longer exists.

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.play} aria-hidden="true" focusable="false">
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 6-7" />
    </svg>
  );
}

export default function ClickToLoad({label, caption, notice, icon = 'play', ratio = '16 / 9', children}) {
  const [loaded, setLoaded] = useState(false);
  const noticeId = useId();
  const contentRef = useRef(null);

  useEffect(() => {
    if (loaded) contentRef.current?.querySelector('iframe')?.focus();
  }, [loaded]);

  return (
    <div className={styles.root}>
      {loaded ? (
        <div ref={contentRef}>{children()}</div>
      ) : (
        <button
          type="button"
          className={styles.poster}
          style={{aspectRatio: ratio}}
          onClick={() => setLoaded(true)}
          aria-label={label}
          aria-describedby={noticeId}
        >
          <span className={styles.icon}>{icon === 'dashboard' ? <DashboardIcon /> : <PlayIcon />}</span>
          <span className={styles.caption}>{caption}</span>
        </button>
      )}
      <p id={noticeId} className={styles.notice}>
        {notice}
      </p>
    </div>
  );
}
