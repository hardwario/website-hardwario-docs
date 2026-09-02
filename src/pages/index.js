import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={translate({
        id: 'home.metaDescription',
        message: 'Technical Resources for Products and Services',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
