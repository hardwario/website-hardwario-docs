/**
 * Ejected from @docusaurus/theme-classic (Navbar/MobileSidebar/Header).
 *
 * Upstream renders the full HARDWARIO DOCS wordmark here, and on a phone the
 * color-mode toggle and the close button end up on top of it. The header now
 * carries only the circuit mark, then [language] [light/dark] [close]. The
 * language switch lives here because the dropdown at the bottom of the mobile
 * menu (hidden in PrimaryMenu) was easy to miss.
 *
 * Re-check against the upstream source on every Docusaurus major upgrade:
 * node_modules/@docusaurus/theme-classic/src/theme/Navbar/MobileSidebar/Header/index.tsx
 */
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThemedImage from '@theme/ThemedImage';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import LocaleSwitch from './LocaleSwitch';
import styles from './styles.module.css';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}>
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}

function BrandMark() {
  const {
    siteConfig: {title},
  } = useDocusaurusContext();
  return (
    <Link to="/" className={styles.brandMark} aria-label={title}>
      <ThemedImage
        alt=""
        sources={{
          light: useBaseUrl('img/hardwario-mark.svg'),
          dark: useBaseUrl('img/hardwario-mark-dark.svg'),
        }}
      />
    </Link>
  );
}

export default function NavbarMobileSidebarHeader() {
  return (
    <div className="navbar-sidebar__brand">
      <BrandMark />
      <div className={styles.actions}>
        <LocaleSwitch />
        <NavbarColorModeToggle />
        <CloseButton />
      </div>
    </div>
  );
}
