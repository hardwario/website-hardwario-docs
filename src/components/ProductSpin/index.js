import React, {useCallback, useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// A product you can turn round: a sequence of pre-rendered frames (one every
// 360/frames degrees, 48 by default) drawn into a canvas. It spins once when it scrolls into
// view, then follows drag (mouse, touch) and the arrow keys.
//
// Frames live in static/img/spin/<product>/<variant>/frame-01.webp ... frame-48.webp and have
// a transparent background, so the same set works in light and dark mode.
//
//   <ProductSpin product="sticker"
//     variants={[{id: 'clime', label: 'STICKER Clime'}, {id: 'motion', label: 'STICKER Motion'}]} />
//
//
// Nothing beyond the first frame (the poster) is downloaded until the spinner
// is on screen. Visitors who prefer reduced motion get no automatic spin.

const TEXT = {
  en: {
    hint: 'Drag to turn',
    hintVariants: 'Drag to turn, or pick a variant',
    label: (name) => `${name}, 360° view. Use the left and right arrow keys to rotate.`,
    variants: 'Variant',
  },
  cs: {
    hint: 'Otočte tažením',
    hintVariants: 'Otočte tažením nebo vyberte variantu',
    label: (name) => `${name}, pohled 360°. Otáčejte šipkami vlevo a vpravo.`,
    variants: 'Varianta',
  },
};

const PX_PER_TURN = 216; // drag distance for a full turn, whatever the frame count
const ease = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
const pad = (n) => String(n).padStart(2, '0');

// ratio: frame width / height (frames are 470 × 960 by default)
// caption: what the visitor is looking at, shown under the product (e.g. which model or variant)
export default function ProductSpin({product, variants, frames = 48, start = 0, width = 220, ratio = 470 / 960, caption, alt}) {
  const {i18n} = useDocusaurusContext();
  const t = TEXT[i18n.currentLocale] ?? TEXT.en;
  const base = useBaseUrl(`/img/spin/${product}`);
  const list = variants?.length ? variants : [{id: '', label: alt ?? product}];
  const [variant, setVariant] = useState(list[0]);
  const [live, setLive] = useState(false);

  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const st = useRef({pos: start, target: start, imgs: [], ready: false, raf: 0, touched: false, shown: -1, shownW: 0});

  const dir = `${base}${variant.id ? `/${variant.id}` : ''}`;
  const src = (i) => `${dir}/frame-${pad(i + 1)}.webp`;
  const wrap = (x) => ((x % frames) + frames) % frames;

  const draw = useCallback(() => {
    const s = st.current, c = canvasRef.current;
    if (!s.ready || !c) return;
    // always the nearest whole frame: blending two frames shows a ghost of the previous angle
    const g = c.getContext('2d'), i = Math.round(wrap(s.pos)) % frames;
    if (i === s.shown && c.width === s.shownW) return;
    s.shown = i; s.shownW = c.width;
    g.clearRect(0, 0, c.width, c.height);
    g.imageSmoothingQuality = 'high';
    g.drawImage(s.imgs[i], 0, 0, c.width, c.height);
    rootRef.current?.setAttribute('aria-valuenow', String(Math.round((i * 360) / frames)));
  }, [frames]);

  const resize = useCallback(() => {
    const c = canvasRef.current, s = st.current;
    if (!c || !s.imgs[0]) return;
    const r = c.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(r.width * dpr);
    c.height = Math.round(r.height * dpr);
    s.shown = -1; // resizing the canvas clears it
    draw();
  }, [draw]);

  const animateTo = useCallback((to, ms) => {
    const s = st.current;
    cancelAnimationFrame(s.raf);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || ms <= 0) { s.pos = s.target = to; draw(); return; }
    const from = s.pos, t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      s.pos = from + (to - from) * ease(k);
      draw();
      if (k < 1) s.raf = requestAnimationFrame(step); else s.target = s.pos;
    };
    s.raf = requestAnimationFrame(step);
  }, [draw]);

  // load the frames of the current variant once the spinner is visible
  const load = useCallback(() => {
    const s = st.current;
    s.ready = false;
    const imgs = Array.from({length: frames}, (_, i) => { const im = new Image(); im.src = src(i); return im; });
    return Promise.all(imgs.map((im) => im.decode().catch(() => undefined))).then(() => {
      s.imgs = imgs; s.ready = true; s.shown = -1; setLive(true); resize();
    });
  }, [dir, frames, resize]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    let first = true;
    const io = new IntersectionObserver((entries, obs) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      obs.disconnect();
      load().then(() => {
        const s = st.current;
        if (first && !s.touched) setTimeout(() => !st.current.touched && animateTo(s.pos + frames, 3000), 250);
        first = false;
      });
    }, {threshold: 0.35});
    io.observe(el);
    const ro = new ResizeObserver(() => resize());
    ro.observe(el);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(st.current.raf); };
  }, [load, animateTo, resize, frames]);

  // pointer drag with a little inertia
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const pxPerFrame = PX_PER_TURN / frames;
    let down = false, x0 = 0, p0 = 0, lastX = 0, lastT = 0, vel = 0;
    const onDown = (e) => {
      const s = st.current;
      s.touched = true; down = true; cancelAnimationFrame(s.raf);
      x0 = lastX = e.clientX; p0 = s.pos; lastT = performance.now(); vel = 0;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!down) return;
      const now = performance.now(), dx = e.clientX - lastX;
      // dragging right turns the front of the product to the right (frame index goes up)
      if (now > lastT) vel = 0.7 * (dx / pxPerFrame / (now - lastT)) + 0.3 * vel;
      lastX = e.clientX; lastT = now;
      st.current.pos = p0 + (e.clientX - x0) / pxPerFrame;
      draw();
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      const s = st.current, fling = Math.max(-frames / 4, Math.min(frames / 4, vel * 300));
      animateTo(Math.round(s.pos + fling), 600 + Math.abs(fling) * (1680 / frames));
    };
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const s = st.current;
      s.touched = true;
      animateTo(Math.round(s.pos) + (e.key === 'ArrowRight' ? 1 : -1) * Math.max(1, Math.round(frames / 24)), 320);
    };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('keydown', onKey);
    };
  }, [draw, animateTo, frames]);

  const pick = (v) => {
    if (v.id === variant.id) return;
    st.current.touched = true;
    setVariant(v);
  };
  // switching variant: reload its frames, keep the current angle
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    load();
  }, [dir]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <figure className={styles.spin} style={{maxWidth: width}}>
      <div
        ref={rootRef}
        className={`${styles.stage} ${live ? styles.live : ''}`}
        style={{aspectRatio: String(ratio)}}
        role="slider"
        tabIndex={0}
        aria-label={t.label(variant.label)}
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={0}>
        {/* poster: the first frame, shown until the canvas has every frame */}
        <img className={styles.poster} src={src(wrap(start))} alt="" draggable={false} />
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      </div>
      <figcaption className={styles.caption}>
        {caption && <span className={styles.title}>{caption}</span>}
        {list.length > 1 && (
          <span className={styles.variants} role="group" aria-label={t.variants}>
            {list.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`${styles.variant} ${v.id === variant.id ? styles.active : ''}`}
                aria-pressed={v.id === variant.id}
                onClick={() => pick(v)}>
                {v.label}
              </button>
            ))}
          </span>
        )}
        <span className={styles.hint}>
          <span aria-hidden="true" className={styles.hintIcon}>⟲</span>
          {list.length > 1 ? t.hintVariants : t.hint}
        </span>
      </figcaption>
    </figure>
  );
}
