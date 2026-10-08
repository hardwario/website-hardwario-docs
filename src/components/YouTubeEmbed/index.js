import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ClickToLoad from '@site/src/components/ClickToLoad';
import styles from './styles.module.css';

// A YouTube video behind a click. Nothing is requested from Google until the
// visitor presses play; then the video loads from www.youtube-nocookie.com
// (YouTube's privacy-enhanced mode) and starts at once.
//
// Pages do not use this directly: src/remark/youtube-facade.js turns every
// YouTube <iframe> and <ReactPlayer> into it at build time. Writing
// <YouTubeEmbed id="..." title="..." /> by hand works too (it is registered in
// src/theme/MDXComponents.js); `params` is the embed URL's query string.

const TEXT = {
  en: {
    play: (title) => `Play video: ${title}`,
    untitled: 'YouTube video',
    notice: 'Playing the video loads it from YouTube (Google).',
  },
  cs: {
    play: (title) => `Přehrát video: ${title}`,
    untitled: 'Video z YouTube',
    notice: 'Přehrání načte video ze služby YouTube (Google).',
  },
};

export default function YouTubeEmbed({id, title, params = ''}) {
  const {i18n} = useDocusaurusContext();
  const t = TEXT[i18n.currentLocale] ?? TEXT.en;
  const name = title || t.untitled;
  const query = new URLSearchParams(params);
  query.set('autoplay', '1');
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${query}`;

  return (
    <ClickToLoad label={t.play(name)} caption={name} notice={t.notice}>
      {() => (
        <iframe
          className={styles.player}
          src={src}
          title={name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </ClickToLoad>
  );
}
