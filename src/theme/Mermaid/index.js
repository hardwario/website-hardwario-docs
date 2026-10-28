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
  darkMode: true,
  background: '#1b1b1d',
  primaryColor: '#0d2b45',
  primaryBorderColor: '#009cfa',
  primaryTextColor: '#e3e3e3',
  secondaryColor: '#2b2e35',
  tertiaryColor: '#1b1b1d',
  lineColor: '#a3a7ae',
  textColor: '#e3e3e3',
  edgeLabelBackground: '#1b1b1d',
  signalColor: '#a3a7ae',
  signalTextColor: '#e3e3e3',
  labelTextColor: '#e3e3e3',
  loopTextColor: '#e3e3e3',
  noteBkgColor: '#3d3519',
  noteBorderColor: '#b39b3e',
  noteTextColor: '#f2ead0',
};

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
      dangerouslySetInnerHTML={{__html: renderResult.svg}}
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
