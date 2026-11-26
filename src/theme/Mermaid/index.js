import React, {useEffect, useMemo, useRef} from 'react';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {ErrorBoundaryErrorMessageFallback, useColorMode} from '@docusaurus/theme-common';
import {
  MermaidContainerClassName,
  useMermaidConfig,
  useMermaidRenderResult,
} from '@docusaurus/theme-mermaid/client';
import styles from './styles.module.css';

// Ejected from @docusaurus/theme-mermaid 3.10 only to give dark mode its own
// colours: themeConfig.mermaid.options is shared by both modes, so the light
// palette in docusaurus.config.js also painted the dark diagrams (edge labels
// on light boxes, message text dark on the dark page). These values replace the
// light ones in dark mode; the rest of the component is the original.
const DARK_THEME_VARIABLES = {
  // Brand dark mode (proposal): the #16161D ground, Ink nodes with the dark
  // Hairline, Mist zones and notes, White type, light-gray wires.
  darkMode: true,
  background: '#16161d',
  primaryColor: '#252532',
  primaryBorderColor: '#3b3b46',
  primaryTextColor: '#ffffff',
  secondaryColor: '#2e2e3a',
  tertiaryColor: '#16161d',
  lineColor: '#a3a7ae',
  textColor: '#ffffff',
  edgeLabelBackground: '#16161d',
  clusterBkg: '#2e2e3a',
  clusterBorder: '#2e2e3a',
  actorBkg: '#252532',
  actorBorder: '#3b3b46',
  actorTextColor: '#ffffff',
  actorLineColor: '#3b3b46',
  signalColor: '#a3a7ae',
  signalTextColor: '#ffffff',
  labelBoxBkgColor: '#2e2e3a',
  labelBoxBorderColor: '#3b3b46',
  labelTextColor: '#ffffff',
  loopTextColor: '#ffffff',
  noteBkgColor: '#2e2e3a',
  noteBorderColor: '#3b3b46',
  noteTextColor: '#ffffff',
  activationBkgColor: '#2e2e3a',
  activationBorderColor: '#3b3b46',
};

// The key node (`class X hero`) gets the brand's gradient frame, Red to Sky.
// Mermaid cannot fill a stroke with a gradient, so the gradient is added to the
// rendered SVG here and styles.module.css points the hero frame at it. Every
// diagram carries the same definition, so the shared id is harmless.
const KEY_FRAME_DEFS =
  '<defs><linearGradient id="hw-key-frame" x1="0" y1="0" x2="1" y2="0">' +
  '<stop offset="0" stop-color="#e30427"/><stop offset="1" stop-color="#009cfa"/>' +
  '</linearGradient></defs>';

function withKeyFrame(svg) {
  return svg.replace(/(<svg\b[^>]*>)/, `$1${KEY_FRAME_DEFS}`);
}

function useColorModeMermaidConfig() {
  const config = useMermaidConfig();
  const {colorMode} = useColorMode();
  return useMemo(
    () =>
      colorMode === 'dark'
        ? {...config, themeVariables: {...config.themeVariables, ...DARK_THEME_VARIABLES}}
        : config,
    [config, colorMode],
  );
}

function MermaidRenderResult({renderResult}) {
  const ref = useRef(null);
  useEffect(() => {
    const div = ref.current;
    renderResult.bindFunctions?.(div);
  }, [renderResult]);
  return (
    <div
      ref={ref}
      className={`${MermaidContainerClassName} ${styles.container}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: withKeyFrame(renderResult.svg)}}
    />
  );
}

function MermaidRenderer({value}) {
  const config = useColorModeMermaidConfig();
  const renderResult = useMermaidRenderResult({text: value, config});
  if (renderResult === null) {
    return null;
  }
  return <MermaidRenderResult renderResult={renderResult} />;
}

export default function Mermaid(props) {
  return (
    <ErrorBoundary fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
      <MermaidRenderer {...props} />
    </ErrorBoundary>
  );
}
