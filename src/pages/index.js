import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import Head from '@docusaurus/Head';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

// The full name of the site: the homepage heading and title. Every other page ends its title with the short
// site title "HARDWARIO Docs" (docusaurus.config.js).
const heading = () =>
  translate({
    id: 'home.heading',
    message: 'HARDWARIO Documentation',
  });

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{heading()}</h1>
        {/* siteConfig.tagline is not localized by Docusaurus, so the subtitle
            goes through translate() instead. The message has to be the literal
            English string — write-translations extracts it statically and would
            skip a `siteConfig.tagline` reference. Keep it in step with the
            tagline in docusaurus.config.js. */}
        <p className="hero__subtitle">
          {translate({
            id: 'home.tagline',
            message: 'Technical Resources for Products and Services',
          })}
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      description={translate({
        id: 'home.metaDescription',
        message: 'Documentation for HARDWARIO devices and HARDWARIO Cloud: CHESTER, STICKER, EMBER, FIBER, GAUGER and TOWER, with firmware, APIs and integration guides.',
      })}>
      <Head>
        <title>{heading()}</title>
        <meta property="og:title" content={heading()} />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
