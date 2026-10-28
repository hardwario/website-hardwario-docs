import React, { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useBreadcrumbsStructuredData } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocBreadcrumbs/StructuredData';

// The theme's BreadcrumbList, with item URLs that match the served and canonical
// URLs. Sidebar hrefs come without the trailing slash even with trailingSlash: true,
// so the theme listed /x where the page lives at /x/ (a redirect hop for every
// crawler following them). Same normalisation as the TechArticle url in
// DocItem/Metadata.
export default function DocBreadcrumbsStructuredData(props: Props): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const structuredData = useBreadcrumbsStructuredData({ breadcrumbs: props.breadcrumbs });
  const withSlash = (url: string): string => {
    const cut = url.search(/[?#]/);
    const [path, rest] = cut < 0 ? [url, ''] : [url.slice(0, cut), url.slice(cut)];
    return siteConfig.trailingSlash && !/\.[a-z][a-z0-9]*$/i.test(path) && !path.endsWith('/') ? `${path}/${rest}` : url;
  };
  const data = {
    ...structuredData,
    itemListElement: structuredData.itemListElement.map((item) => ({ ...item, item: withSlash(item.item) })),
  };
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
