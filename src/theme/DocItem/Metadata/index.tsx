import React from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import type MetadataType from '@theme/DocItem/Metadata';
import type { WrapperProps } from '@docusaurus/types';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { PageMetadata } from '@docusaurus/theme-common';

type Props = WrapperProps<typeof MetadataType>;

// Structured data for every docs page: a TechArticle (what the page is, in which
// language, who publishes it) so search and AI answer engines cite the right page.
// The theme already emits a BreadcrumbList on nested pages and the site-wide
// Organization block lives in docusaurus.config.js headTags, so neither is repeated here.
export default function MetadataWrapper(props: Props): React.JSX.Element {
  const { metadata, frontMatter } = useDoc();
  // `title_meta` front matter (the blog plugin's field, honoured here for docs too) overrides the
  // <title> and og:title without touching the visible heading, so section pages that share a
  // heading ("Installation", "Theory") still get unique titles.
  const titleMeta = (frontMatter as { title_meta?: string }).title_meta;
  const { siteConfig, i18n } = useDocusaurusContext();
  const origin = siteConfig.url.replace(/\/$/, '');
  // Doc permalinks come without the trailing slash even with trailingSlash: true; the
  // served (and canonical) URL has it, so normalise here to match.
  const withSlash = (path: string): string =>
    siteConfig.trailingSlash && !/\.[a-z0-9]+$/i.test(path) && !path.endsWith('/') ? path + '/' : path;
  const url = origin + withSlash(metadata.permalink);
  const image = (frontMatter as { image?: string }).image;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description,
    url,
    inLanguage: i18n.currentLocale,
    isPartOf: { '@type': 'WebSite', name: siteConfig.title, url: origin },
    publisher: { '@type': 'Organization', name: 'HARDWARIO', url: 'https://www.hardwario.com' },
    ...(image
      ? { image: image.startsWith('http') ? image : origin + siteConfig.baseUrl.replace(/\/$/, '') + '/' + image.replace(/^\//, '') }
      : {}),
  };

  return (
    <>
      <Metadata {...props} />
      {titleMeta && <PageMetadata title={titleMeta} />}
      <Head>
        <script type="application/ld+json">{JSON.stringify(article)}</script>
      </Head>
    </>
  );
}
