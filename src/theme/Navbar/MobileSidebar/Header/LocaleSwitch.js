/**
 * Language menu for the mobile sidebar header.
 *
 * The button shows the current language; tapping it opens a small list of all
 * locales, the way the desktop navbar dropdown does, and the reader picks one.
 * Each entry links to the same page in that locale, built the same way the
 * navbar locale dropdown builds its links. Plain <a> elements on purpose: each
 * locale is a separate build, so switching has to be a full page load, not a
 * client-side route change. Because of that reload, the menu state is saved
 * first and restored on the new page (see ../keepOpenAcrossLocales.js).
 */
import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import IconLanguage from '@theme/Icon/Language';
import {rememberSidebarState} from '../keepOpenAcrossLocales';
import styles from './styles.module.css';

export default function LocaleSwitch() {
  const {
    i18n: {currentLocale, locales, localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const {search, hash} = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close on a tap outside the menu or on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (locales.length < 2) return null;

  const hrefFor = (locale) =>
    `${alternatePageUtils.createUrl({locale, fullyQualified: false})}${search}${hash}`;

  const menuLabel = translate({
    id: 'theme.navbar.mobileLanguageDropdown.label',
    message: 'Languages',
    description: 'The label for the mobile language switcher dropdown',
  });

  return (
    <div className={styles.localeSwitch} ref={rootRef}>
      <button
        type="button"
        className={styles.localeButton}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={menuLabel}
        title={menuLabel}
        onClick={() => setOpen((value) => !value)}>
        <IconLanguage width={18} height={18} />
        <span>{currentLocale.toUpperCase()}</span>
      </button>
      {open && (
        <ul className={clsx('dropdown__menu', styles.localeMenu)}>
          {locales.map((locale) => {
            const {label, htmlLang} = localeConfigs[locale];
            const isCurrent = locale === currentLocale;
            return (
              <li key={locale}>
                <a
                  href={hrefFor(locale)}
                  hrefLang={htmlLang}
                  lang={htmlLang}
                  target="_self"
                  aria-current={isCurrent ? 'true' : undefined}
                  className={clsx(
                    'dropdown__link',
                    isCurrent && 'dropdown__link--active',
                  )}
                  onClick={(event) => {
                    if (isCurrent) {
                      event.preventDefault();
                      setOpen(false);
                    } else {
                      rememberSidebarState();
                    }
                  }}>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
