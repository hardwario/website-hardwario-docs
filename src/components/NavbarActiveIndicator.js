/**
 * The red highlight behind the active top-level navbar item, drawn as one
 * element that slides and resizes to the item the reader moves to, instead of
 * each item switching its own background on and off.
 *
 * The navbar can be remounted on a route change (each docs instance renders
 * its own layout), so the last position is kept at module level: a fresh
 * indicator starts where the previous one ended and animates from there.
 * Styles: .navbar-active-indicator in src/css/custom.css (desktop only).
 */
import React, {useLayoutEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';

let lastRect = null;

function apply(el, rect) {
  el.style.transform = `translate(${rect.x}px, ${rect.y}px)`;
  el.style.width = `${rect.w}px`;
  el.style.height = `${rect.h}px`;
}

export default function NavbarActiveIndicator() {
  const ref = useRef(null);
  const {pathname} = useLocation();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const container = el.parentElement;

    const place = () => {
      const active = container.querySelector('.navbar__link--active');
      if (!active) {
        // Leaving every section (e.g. back to the homepage): shrink into the
        // middle of the last item and fade out.
        if (lastRect) apply(el, {...lastRect, x: lastRect.x + lastRect.w / 2, w: 0});
        el.style.opacity = '0';
        lastRect = null;
        return;
      }
      const c = container.getBoundingClientRect();
      const a = active.getBoundingClientRect();
      if (a.width === 0) return; // hidden (mobile layout)
      const rect = {x: a.left - c.left, y: a.top - c.top, w: a.width, h: a.height};
      // Entering a section from a page with no active item (the homepage):
      // grow out from the middle of the item instead of sliding in.
      if (el.style.opacity !== '1') {
        el.style.transition = 'none';
        apply(el, {...rect, x: rect.x + rect.w / 2, w: 0});
        el.getBoundingClientRect(); // commit the start state before animating
        el.style.transition = '';
        apply(el, rect);
        el.style.opacity = '1';
      } else {
        apply(el, rect);
      }
      lastRect = rect;
    };

    if (lastRect && !el.style.opacity) {
      el.style.transition = 'none';
      apply(el, lastRect);
      el.style.opacity = '1';
      el.getBoundingClientRect();
      el.style.transition = '';
    }
    place();

    // Follow the item when anything in the row changes size: its own label
    // (the "› CHESTER" part), the logo before it finishing loading, web fonts,
    // or the window.
    const observer = new ResizeObserver(place);
    for (const child of container.children) observer.observe(child);
    const active = container.querySelector('.navbar__link--active');
    if (active) observer.observe(active);
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', place);
    };
  }, [pathname]);

  return <span ref={ref} className="navbar-active-indicator" aria-hidden="true" />;
}
