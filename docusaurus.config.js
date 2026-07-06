module.exports = {
  title: 'Cotalker Technical Documentation',
  url: 'https://doc.cotalker.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'Cotalker', // Usually your GitHub org/user name.
  projectName: 'Cotalker', // Usually your repo name.
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-live-codeblock','@docusaurus/theme-mermaid'],
  plugins: [
    require.resolve('docusaurus-lunr-search')
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
        // {
        //   to: 'docs/products/products_overview',
        //   activeBasePath: 'docs',
        //   label: 'Products',
        //   position: 'left',
        // },
        {
          type: 'dropdown',
          label: 'Basic',
          position: 'left',
          className: 'basic-dropdown',
          to: 'docs/getting_started/intro_overview',
          items: [
            {
              to: 'docs/getting_started/intro_overview',
              label: 'What is Cotalker?',
            },
            {
              to: 'docs/getting_started/basic_overview',
              label: 'Welcome to Cotalker!',
            },
            {
              to: 'docs/documentation/client/basic_concepts',
              label: 'Essential Concepts',
            },
            {
              to: 'docs/documentation/client/platform_access/system_requirements',
              label: 'Accessing the Platform',
            },
            {
              to: 'docs/documentation/client/layout',
              label: 'Platform User Interface',
            },
            {
              to: 'docs/documentation/client/client_search',
              label: 'Basic Tools',
            },
            {
              to: 'docs/documentation/client/surveys/access',
              label: 'Surveys',
            },
            {
              to: 'docs/documentation/client/tasks/overview',
              label: 'Tasks',
            },
            {
              to: 'docs/documentation/client/database',
              label: 'Database',
            },
            {
              to: 'docs/documentation/client/dashboard',
              label: 'Dashboard',
            },
            {
              to: 'docs/documentation/client/reports',
              label: 'Reports',
            },
          ],
        },      
        {
          type: 'dropdown',
          label: 'Advanced',
          position: 'left',
          className: 'advanced-dropdown',
          to: 'docs/documentation/documentation_overview',
          items: [
            {
              to: 'docs/documentation/admin_basic_concepts',
              label: 'Administrator Fundamentals',
            },
            {
              to: 'docs/documentation/admin/admin_overview',
              label: 'Administrative Panel',
            },
            {
              to: 'docs/documentation/automation/admin_routine',
              label: 'Automation Tools',
            },
            {
              to: 'docs/documentation/automation/cotlang/triggers_and_contexts',
              label: 'COTLang Guide',
            },
            {
              to: 'docs/documentation/admin/special_configurations/azure_config',
              label: 'Special Configurations',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Developer',
          position: 'left',
          className: 'developer-dropdown',
          to: 'docs/developer/developer_overview',
          items: [
            {
              to: 'docs/documentation/automation/code_editor',
              label: 'DevTools',
            },
            {
              to: 'docs/developer/cli/overview',
              label: 'CLI (cotctl)',
            },
            {
              to: 'docs/documentation/api/overview_api',
              label: 'API Reference',
            },
            {
              to: 'docs/documentation/models/overview_model',
              label: 'Data Models',
            },
            {
              to: 'docs/documentation/sql_bi/overview',
              label: 'BI & SQL',
            },
            {
              to: 'docs/documentation/admin/special_configurations/branding',
              label: 'Branding Settings',
            },
          ],
        },
        // {
        //   to: 'docs/tutorials/tutorial_overview',
        //   activeBasePath: 'docs',
        //   label: 'Tutorials',
        //   position: 'left',
        // },
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
          label: 'Support',
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
          title: 'Basic',
          items: [
            {
              label: 'What is Cotalker?',
              to: 'docs/getting_started/intro_overview',
            },
            {
              label: 'Essential Concepts',
              to: 'docs/documentation/client/basic_concepts',
            },
            {
              label: 'Accessing the Platform',
              to: 'docs/documentation/client/platform_access/system_requirements',
            },
            {
              label: '  • System Requirements',
              to: 'docs/documentation/client/platform_access/system_requirements',
            },
            {
              label: '  • First Steps',
              to: 'docs/documentation/client/platform_access/first_steps',
            },
            {
              label: 'Platform User Interface',
              to: 'docs/documentation/client/layout',
            },
            {
              label: '  • Main Menu',
              to: 'docs/documentation/client/main_menu',
            },
            {
              label: 'Basic Tools',
              to: 'docs/documentation/client/client_search',
            },
            {
              label: 'Surveys',
              to: 'docs/documentation/client/surveys/access',
            },
            {
              label: '  • Survey Automations',
              to: 'docs/documentation/client/surveys/automations',
            },
            {
              label: 'Tasks',
              to: 'docs/documentation/client/tasks/overview',
            },
            {
              label: 'Database',
              to: 'docs/documentation/client/database',
            },
            {
              label: 'Dashboard',
              to: 'docs/documentation/client/dashboard',
            },
            {
              label: 'Reports',
              to: 'docs/documentation/client/reports',
            },
          ],
        },
        {
          title: 'Advanced',
          items: [
            {
              label: 'Administrator Fundamentals',
              to: 'docs/documentation/admin_basic_concepts',
            },
            {
              label: 'Administrative Panel',
              to: 'docs/documentation/admin/admin_overview',
            },
            {
              label: '  • Workflows',
              to: 'docs/documentation/admin/workflows/admin_workflow_overview',
            },
            {
              label: '  • Groups',
              to: 'docs/documentation/admin/groups/overview_groups',
            },
            {
              label: '  • Database',
              to: 'docs/documentation/admin/database/admin_database_overview',
            },
            {
              label: '  • Surveys',
              to: 'docs/documentation/admin/survey/survey_overview',
            },
            {
              label: '  • Company',
              to: 'docs/documentation/admin/users',
            },
            {
              label: '  • Automations',
              to: 'docs/documentation/admin/admin_bots',
            },
            {
              label: '  • Security',
              to: 'docs/documentation/admin/admin_accessrole',
            },
            {
              label: 'Automation Tools',
              to: 'docs/documentation/automation/admin_routine',
            },
            {
              label: 'COTLang Guide',
              to: 'docs/documentation/automation/cotlang/admin_cotlang',
            },
            {
              label: '  • Triggers & Contexts',
              to: 'docs/documentation/automation/cotlang/triggers_and_contexts',
            },
            {
              label: 'Special Configurations',
              to: 'docs/documentation/admin/special_configurations/azure_config',
            },
          ],
        },
        {
          title: 'Developer',
          items: [
            {
              label: 'DevTools',
              to: 'docs/documentation/automation/code_editor',
            },
            {
              label: '  • Survey Automations',
              to: 'docs/documentation/automation/surveys/question_exec',
            },
            {
              label: 'API Reference',
              to: 'docs/documentation/api/overview_api',
            },
            {
              label: '  • Authentication',
              to: 'docs/documentation/api/auth',
            },
            {
              label: '  • Automations',
              to: 'docs/documentation/api/automations/bots',
            },
            {
              label: '  • Database',
              to: 'docs/documentation/api/databases/properties',
            },
            {
              label: '  • Groups & Messages',
              to: 'docs/documentation/api/communication/channels',
            },
            {
              label: 'Data Models',
              to: 'docs/documentation/models/overview_model',
            },
            {
              label: '  • Groups & Messages',
              to: 'docs/documentation/models/communication/model_channels',
            },
            {
              label: '  • Automations',
              to: 'docs/documentation/models/automations/model_bots',
            },
            {
              label: 'BI & SQL',
              to: 'docs/documentation/sql_bi/overview',
            },
            {
              label: 'Branding Settings',
              to: 'docs/documentation/admin/special_configurations/branding',
            },
          ],
        },
        {
          title: 'Support & Resources',
          items: [
            {
              label: 'Support Overview',
              to: 'docs/support/support_overview',
            },
            {
              label: 'Cotalker Website',
              href: 'https://www.cotalker.com',
            },
            {
              label: 'Web Platform',
              href: 'https://web.cotalker.com',
            },
            {
              label: 'Android App',
              href: 'https://play.google.com/store/apps/details?id=com.cotalker.universal'
            },
            {
              label: 'iOS App',
              href: 'https://apps.apple.com/app/cotalker/id1525633301'
            },
            {
              label: 'Documentation Guide',
              to: 'docs/getting_started/doc_guide',
            },
            {
              label: 'soporte@cotalker.com',
              href: 'mailto:soporte@cotalker.com',
            },
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
          sidebarCollapsed: false,
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
        gtag: {
          trackingID: 'G-WK2V3XQYBD',
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
