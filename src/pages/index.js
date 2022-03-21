import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const features = [
  {
    title: <Translate>Learn how to setup Workflows</Translate>,
    imageUrl: styles.featureImageWorkflow,
    description: (
      <Translate>
        Workflows are a central piece in the automation of your company. Follow the tutorial to build a simple Project Manager.
      </Translate>
    ),
  },
  {
    title: <Translate>Get to know the tools</Translate>,
    imageUrl: styles.featureImageTools,
    description: (
      <Translate>
        Learn how to create and manage users, workflows, survey forms, access roles, database elements, and more using Cotalker's UI or through the API.
      </Translate>
    ),
  },
  {
    title: <Translate>Become a Cotalker Admin</Translate>,
    imageUrl: styles.featureImageAdmin,
    description: (
      <Translate>
        Learn to configure and extend Cotalker's capacities. Get certified as an Administrator.
      </Translate>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  return (
    <div className="col col--3 col--offset-1 card">
      <div>
        <div className={imageUrl}></div>
      </div>
      <div className="text--center">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Cotalker Documentation">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className={classnames('hero__title', styles.heroTitle)}>
            {/* {siteConfig.title} */}
            <Translate>Partner & Technical Consultants Documentation</Translate>
          </h1>
          <h2 className={classnames('hero__subtitle', styles.heroSubTitle)}>
              {/* {siteConfig.tagline} */}
              <Translate>Cotalker Training Center</Translate>
          </h2>
          <div className={classnames(styles.buttons)}>
            <Link
              className={classnames(
                'button button--danger button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting_started/intro_overview')}>
              <Translate>Get Started</Translate>
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
