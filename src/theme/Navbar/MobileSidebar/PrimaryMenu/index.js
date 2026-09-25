/**
 * Ejected from @docusaurus/theme-classic (Navbar/MobileSidebar/PrimaryMenu).
 *
 * Only change: the locale dropdown is left out. On a phone it rendered as a
 * "Languages" entry at the bottom of the menu; the language switch now sits in
 * the sidebar header instead (see ../Header/LocaleSwitch.js).
 *
 * Re-check against the upstream source on every Docusaurus major upgrade:
 * node_modules/@docusaurus/theme-classic/src/theme/Navbar/MobileSidebar/PrimaryMenu/index.tsx
 */
import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';

function useNavbarItems() {
  return useThemeConfig().navbar.items.filter(
    (item) => item.type !== 'localeDropdown',
  );
}

export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );
}
