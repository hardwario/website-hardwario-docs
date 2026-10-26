import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';

// Shows which entry of a dropdown the reader is in, inline after the label
// ("Products › CHESTER"), and marks the dropdown itself active so it gets the
// same highlight as a plain navbar link. Styles: .navbar-dropdown-current in
// src/css/custom.css. Matching uses activeBaseRegex, which also matches the
// /cs/ prefixed paths.
export default function DropdownNavbarItemWrapper(props) {
  const {pathname} = useLocation();

  const activeSubItem = props.items.find(
    (item) => item.activeBaseRegex && new RegExp(item.activeBaseRegex).test(pathname),
  );

  const label = (
    <>
      {props.label}
      {activeSubItem && (
        // Keyed by the entry, so a change of entry remounts the span and
        // replays its fade-in.
        <span key={activeSubItem.label} className="navbar-dropdown-current">
          {activeSubItem.label}
        </span>
      )}
    </>
  );

  return (
    <DropdownNavbarItem
      {...props}
      label={label}
      className={clsx(props.className, activeSubItem && !props.mobile && 'navbar__link--active')}
    />
  );
}
