/**
 * Keeps the mobile sidebar where it was when the reader switches language.
 *
 * Switching locale is a full page load (each locale is its own build), which
 * would normally drop the reader back on a closed menu. Just before leaving,
 * rememberSidebarState() notes which panel was showing (the page's own sidebar
 * or the main menu) and how far it was scrolled; on the next page,
 * useRestoreSidebarState() reopens it the same way.
 *
 * sessionStorage is shared by /cs/ and the English pages (same origin) and is
 * gone with the tab. Every access is wrapped: storage can be unavailable
 * (private mode, blocked site data), and then the menu simply stays closed.
 */
import {useEffect} from 'react';
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';

const KEY = 'hw:mobile-sidebar-after-locale-switch';

function visiblePanel() {
  const items = document.querySelector('.navbar-sidebar__items');
  if (!items) return {secondary: false, panel: null};
  const secondary = items.classList.contains(
    'navbar-sidebar__items--show-secondary',
  );
  const panels = items.querySelectorAll(':scope > .navbar-sidebar__item');
  return {secondary, panel: panels[secondary ? 1 : 0] || null};
}

export function rememberSidebarState() {
  try {
    const {secondary, panel} = visiblePanel();
    sessionStorage.setItem(
      KEY,
      JSON.stringify({secondary, scrollTop: panel ? panel.scrollTop : 0}),
    );
  } catch {
    // Storage unavailable: the switch still works, the menu just won't reopen.
  }
}

export function useRestoreSidebarState() {
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();

  // Step 1: reopen the sidebar if the previous page asked for it. On the first
  // render after load Docusaurus does not know the window size yet and reports
  // the mobile sidebar as disabled, so this waits for `disabled` to settle
  // rather than giving up on the first pass.
  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    } catch {
      return;
    }
    if (!saved) return;
    const isPhone = window.matchMedia('(max-width: 996px)').matches;
    if (isPhone && mobileSidebar.disabled) return; // not hydrated yet
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      // ignore
    }
    if (!isPhone || mobileSidebar.shown) return;
    window.__hwSidebarRestore = saved;
    mobileSidebar.toggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileSidebar.disabled]);

  // Step 2, once it is open: pick the same panel and scroll it back. The page's
  // own sidebar registers itself a moment after the menu opens and switches the
  // menu to it, so this re-runs on every change of the shown panel and only
  // finishes once the panel matches (or after a second, whichever comes first).
  useEffect(() => {
    const saved = window.__hwSidebarRestore;
    if (!saved || !mobileSidebar.shown) return undefined;
    if (!saved.deadline) saved.deadline = Date.now() + 1000;
    if (!saved.secondary && secondaryMenu.shown) secondaryMenu.hide();
    const timer = setTimeout(() => {
      if (window.__hwSidebarRestore !== saved) return;
      if (saved.secondary !== secondaryMenu.shown && Date.now() < saved.deadline) return;
      delete window.__hwSidebarRestore;
      const {panel} = visiblePanel();
      if (panel) panel.scrollTop = saved.scrollTop || 0;
    }, 250);
    return () => clearTimeout(timer);
  }, [mobileSidebar.shown, secondaryMenu]);
}
