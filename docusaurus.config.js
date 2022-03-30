module.exports = {
  title: 'Partner & Technical Consultants Documentation',
  tagline: 'Cotalker Training Center',
  url: 'https://doc.cotalker.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'Cotalker', // Usually your GitHub org/user name.
  projectName: 'Cotalker', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    [require.resolve('@cmfcmf/docusaurus-search-local'), {
      // blogRouteBasePath: '/blog', // must correspond to the base route path configured for the blog plugin
      // docsRouteBasePath: '/docs', // must correspond to the base route path configured for the docs plugin
      // indexBlog: true, // whether to index blog pages
      // indexDocs: true, // whether to index docs pages
      // indexPages: false, // whether to index static pages
      // // /404.html is never indexed
      // language: "en" // language of your documentation, see next section
    }]
  ],
  themeConfig: {
    disableDark: 'light',
    navbar: {
      title: '',
      logo: {
        alt: 'Cotalker',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
        {
          to: 'docs/products/products_overview',
          activeBasePath: 'docs',
          label: 'Products',
          position: 'left',
        },
        {
          to: 'docs/getting_started/intro_overview',
          activeBasePath: 'docs',
          label: 'Getting Started',
          position: 'left',
        },      
        {
          to: 'docs/documentation/documentation_overview',
          activeBasePath: 'docs',
          label: 'Admin Docs',
          position: 'left',
        },
        {
          to: 'docs/documentation/api/overview_api',
          activeBasePath: 'docs',
          label: 'API',
          position: 'left',
        },
        {
          to: 'docs/documentation/models/overview_model',
          activeBasePath: 'docs',
          label: 'Data Models',
          position: 'left',
        },
        {
          to: 'docs/tutorials/tutorial_overview',
          activeBasePath: 'docs',
          label: 'Tutorials',
          position: 'left',
        },
        {
          to: 'blog',
          label: `What's New`,
          position: 'left',
        },
        // {
        //   to: 'docs/certification/certification_overview',
        //   activeBasePath: 'docs',
        //   label: 'Certification',
        //   position: 'left',
        // },
        {
          to: 'docs/support/support_overview',
          activeBasePath: 'docs',
          label: 'Support & Help',
          position: 'left',
        },
        // --- Language Dropdown Menu ----
        // --- Uncomment code to activate i18n options ---
        // {
        //   type: 'localeDropdown',
        //   position: 'left',
        // },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'General',
          items: [
            {
              label: 'Cotalker',
              to: 'https://www.cotalker.com',
            },
          ],
        },
        {
          title: 'Clients',
          items: [
            {
              label: 'Web Client',
              to: 'https://web.cotalker.com',
            },
            {
              label: 'Android', 
              to: 'https://play.google.com/store/apps/details?id=com.cotalker.universal'
            },
            {
              label: 'iOS', 
              to: 'https://apps.apple.com/app/cotalker/id1525633301'
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cotalker`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/Cotalker/documentation/tree/main/',
          sidebarCollapsible: true,
          breadcrumbs: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: {
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Latest features:',
          feedOptions: {
            type: 'all',
          },
        },
        googleAnalytics: {
          trackingID: 'G-BP7YHW5W2P',
        }
      },
    ],
  ],
  // --- Language Options ---
  // --- Uncomment code to activate i18n options
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'es'],
  //   localeConfigs: {
  //     en: {
  //       label: 'English',
  //       direction: 'ltr',
  //     },
  //     es: {
  //       label: 'Español',
  //       direction: 'ltr',
  //     },
  //   },
  // },
};
