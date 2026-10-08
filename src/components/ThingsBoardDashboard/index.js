import React, {useEffect, useRef, useState} from 'react';

const SRC = 'https://app.hardwario.cloud/dashboard/15bcc940-5504-11f1-b26d-7f43ae666fcf?publicId=b11cbfe0-55bc-11f1-b26d-7f43ae666fcf';

// The dashboard is laid out for a desktop screen. The iframe always keeps this size
// and is scaled down to fit, so ThingsBoard never switches to its narrow mobile layout.
const WIDTH = 1600;
const HEIGHT = 900;
// Inline, the bottom of the dashboard is cut off a little.
const INLINE_HEIGHT = 880;

export default function ThingsBoardDashboard() {
  const containerRef = useRef(null);
  // 'native' = Fullscreen API, 'overlay' = fixed overlay where the API is missing (iPhone Safari).
  const [fullscreen, setFullscreen] = useState(null);
  const [box, setBox] = useState({width: WIDTH * 0.6, height: INLINE_HEIGHT * 0.6});

  useEffect(() => {
    const onChange = () => {
      const active = document.fullscreenElement === containerRef.current;
      setFullscreen((current) => (active ? 'native' : current === 'native' ? null : current));
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    if (fullscreen !== 'overlay') return undefined;
    const onKey = (e) => e.key === 'Escape' && setFullscreen(null);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [fullscreen]);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const {width, height} = entry.contentRect;
      setBox({width, height});
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (fullscreen === 'native') {
      document.exitFullscreen();
    } else if (fullscreen === 'overlay') {
      setFullscreen(null);
    } else if (el.requestFullscreen && document.fullscreenEnabled) {
      el.requestFullscreen()
        // On phones, turn to landscape so the dashboard is not tiny. Fails silently on desktop.
        .then(() => screen.orientation?.lock?.('landscape'))
        .catch(() => {});
    } else {
      setFullscreen('overlay');
    }
  };

  // Inline the scale follows the width only; in fullscreen the whole dashboard must fit.
  const scale = fullscreen
    ? Math.min(box.width / WIDTH, box.height / HEIGHT)
    : box.width / WIDTH;
  const left = fullscreen ? (box.width - WIDTH * scale) / 2 : 0;
  const top = fullscreen ? (box.height - HEIGHT * scale) / 2 : 0;

  return (
    <div style={{margin: '20px 0'}}>
      <div style={{textAlign: 'right', marginBottom: '10px'}}>
        <button
          type="button"
          onClick={toggleFullscreen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            fontSize: '14px',
            textDecoration: 'underline',
          }}
        >
          ⛶ Fullscreen
        </button>
      </div>

      <div
        ref={containerRef}
        style={{
          width: fullscreen ? '100vw' : '100%',
          height: fullscreen ? '100dvh' : `${INLINE_HEIGHT * scale}px`,
          overflow: 'hidden',
          position: fullscreen === 'overlay' ? 'fixed' : 'relative',
          inset: fullscreen === 'overlay' ? 0 : undefined,
          zIndex: fullscreen === 'overlay' ? 1000 : undefined,
          backgroundColor: fullscreen ? '#000' : '#fff',
          border: fullscreen ? 'none' : '1px solid #e0e0e0',
          borderRadius: fullscreen ? '0' : '8px',
        }}
      >
        <iframe
          title="ThingsBoard dashboard"
          src={SRC}
          width={WIDTH}
          height={HEIGHT}
          frameBorder="0"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            position: 'absolute',
            top,
            left,
            backgroundColor: '#fff',
          }}
        />
        {fullscreen && (
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Exit fullscreen"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 36,
              height: 36,
              border: 'none',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.6)',
              color: '#fff',
              fontSize: '20px',
              lineHeight: '36px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
