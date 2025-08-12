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
    title: <Translate>Basic</Translate>,
    imageUrl: styles.featureImageWorkflow,
    description: (
      <Translate>
        End users who navigate workflows, manage and execute tasks, respond to forms, or perform field operations
      </Translate>
    ),
    link: '/docs/getting_started/intro_overview',
  },
  {
    title: <Translate>Advanced</Translate>,
    imageUrl: styles.featureImageTools,
    description: (
      <Translate>
        Power users who can manage users, permissions and roles, create end-to-end workflows, routines, automations, build forms and model their own data collections
      </Translate>
    ),
    link: '/docs/documentation/documentation_overview',
  },
  {
    title: <Translate>Developer</Translate>,
    imageUrl: styles.featureImageAdmin,
    description: (
      <Translate>
        The user who implements advanced network calls and custom code in workflows, developing middlewares to execute complex functions and specific integrations.
      </Translate>
    ),
    link: '/docs/documentation/api/overview_api',
  },
];

function Feature({imageUrl, title, description, link}) {
  return (
    <div className="col col--3 col--offset-1">
      <a className="card2 padding--lg cardContainer_qNfC" href={link} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div className={imageUrl}></div>
        </div>
        <div className="text--center" style={{ flex: 1 }}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>
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
          <img src={useBaseUrl('img/home_wemaketheworkflow.svg')} alt="Cotalker" width={200} />
          <h1 className={classnames('hero__title', styles.heroTitle)}>
            {/* {siteConfig.title} */}
            <Translate>Cotalker Documentation</Translate>
          </h1>

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
