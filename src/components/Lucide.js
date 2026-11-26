import React from 'react';

// Lucide icons (https://lucide.dev, ISC license), the one icon set of the
// HARDWARIO brand guidelines: outline, 24 px grid, 2 px stroke, currentColor.
// Only the paths are copied here, so the site needs no icon package.
const PATHS = {
  sun: [
    ['circle', {cx: 12, cy: 12, r: 4}],
    ['path', {d: 'M12 2v2'}], ['path', {d: 'M12 20v2'}],
    ['path', {d: 'm4.93 4.93 1.41 1.41'}], ['path', {d: 'm17.66 17.66 1.41 1.41'}],
    ['path', {d: 'M2 12h2'}], ['path', {d: 'M20 12h2'}],
    ['path', {d: 'm6.34 17.66-1.41 1.41'}], ['path', {d: 'm19.07 4.93-1.41 1.41'}],
  ],
  moon: [['path', {d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'}]],
  'sun-moon': [
    ['path', {d: 'M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4'}],
    ['path', {d: 'M12 2v2'}], ['path', {d: 'M12 20v2'}],
    ['path', {d: 'm4.9 4.9 1.4 1.4'}], ['path', {d: 'm17.7 17.7 1.4 1.4'}],
    ['path', {d: 'M2 12h2'}], ['path', {d: 'M20 12h2'}],
    ['path', {d: 'm6.3 17.7-1.4 1.4'}], ['path', {d: 'm19.1 4.9-1.4 1.4'}],
  ],
  languages: [
    ['path', {d: 'm5 8 6 6'}], ['path', {d: 'm4 14 6-6 2-3'}], ['path', {d: 'M2 5h12'}],
    ['path', {d: 'M7 2h1'}], ['path', {d: 'm22 22-5-10-5 10'}], ['path', {d: 'M14 18h6'}],
  ],
  'external-link': [
    ['path', {d: 'M15 3h6v6'}], ['path', {d: 'M10 14 21 3'}],
    ['path', {d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'}],
  ],
};

export default function Lucide({name, width = 24, height = 24, className, ...rest}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['lucide', `lucide-${name}`, className].filter(Boolean).join(' ')}
      aria-hidden={rest['aria-label'] ? undefined : true}
      {...rest}>
      {PATHS[name].map(([Tag, attrs], i) => (
        <Tag key={i} {...attrs} />
      ))}
    </svg>
  );
}
