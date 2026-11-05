import React, {useMemo} from 'react';
import clsx from 'clsx';
import {matchPath, useLocation} from '@docusaurus/router';
import routes from '@generated/routes';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';

// True when the path is a real page: some branch of the route tree ends in an
// exact route. A missing page matches only the catch-all `*` route or a docs
// root without a matching doc.
function isKnownPage(routeList, pathname) {
  return routeList.some((route) => {
    if (!matchPath(pathname, route)) {
      return false;
    }
    return route.exact || (route.routes ? isKnownPage(route.routes, pathname) : false);
  });
}

// Shows which entry of a dropdown the reader is in, inline after the label
// ("Products › CHESTER"), and marks the dropdown itself active so it gets the
// same highlight as a plain navbar link. Styles: .navbar-dropdown-current in
// src/css/custom.css. Matching uses activeBaseRegex, which also matches the
// /cs/ prefixed paths.
//
// Not on a 404 page: its HTML is rendered once, for /404.html, without an
// active entry, and the browser then hydrates it at the missing path
// (/chester/xyz/). Marking CHESTER there changed the markup during hydration
// (React error #418).
export default function DropdownNavbarItemWrapper(props) {
  const {pathname} = useLocation();
  const knownPage = useMemo(() => isKnownPage(routes, pathname), [pathname]);

  const activeSubItem = knownPage
    ? props.items.find(
        (item) => item.activeBaseRegex && new RegExp(item.activeBaseRegex).test(pathname),
      )
    : undefined;

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
