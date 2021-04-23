module.exports = {
  getting_started: [
    'getting_started/intro_overview',
    'getting_started/quick_start',
    {
      type: 'category',
      label: 'Solutions',
      items: [
        'getting_started/solutions',
        'getting_started/mobility',
      ],
      collapsed: false,
    },
    'getting_started/partners',
    'getting_started/faq',
    'getting_started/glossary'
  ],
  updates: [
    'updates/new_features',
    'updates/versioning',
    'updates/roadmap'
  ],
  documentation: [
    'documentation/documentation_overview',
    {
      type: 'category',
      label: 'Cotalker App',
      items: [
        'documentation/client/platforms',
        'documentation/client/main_menu',
        'documentation/client/groups_channels',
        'documentation/client/surveys',
        'documentation/client/taskview',
        'documentation/client/database',
        'documentation/client/dashboard',
        'documentation/client/reports',
        'documentation/client/videocalls',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Admin',
      items: [
        'documentation/admin/admin_overview',
        'documentation/admin/users',
        'documentation/admin/admin_group',
        'documentation/admin/admin_channels',
        'documentation/admin/admin_properties',
        'documentation/admin/admin_accessrole',
        'documentation/admin/admin_survey',
        'documentation/admin/admin_bots',
        'documentation/admin/admin_scheduler',
        {
          type: 'category',
          label: 'Workflows',
          items: [
            'documentation/admin/workflows/admin_workflow_overview',
            'documentation/admin/workflows/admin_workflow_groups',
            'documentation/admin/workflows/admin_workflow_configure',
            'documentation/admin/workflows/admin_workflow_required_survey',
          ],
          collapsed: true,
        },
        'documentation/admin/admin_links',
        'documentation/admin/admin_company',
        'documentation/admin/routines',

      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'documentation/api/model',
        'documentation/api/auth',
        {
          type: 'category',
          label: 'Users',
          items: [
            'documentation/api/users/users',
            'documentation/api/users/accessroles',
            'documentation/api/other/versiontracker',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Communication',
          items: [
            'documentation/api/communication/channels',
            'documentation/api/communication/messages',
            'documentation/api/communication/groups',
            'documentation/api/communication/files',
            'documentation/api/communication/unreadmessages',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Databases',
          items: [
            'documentation/api/databases/property_types',
            'documentation/api/databases/properties',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Surveys',
          items: [
            'documentation/api/surveys/surveys',
            'documentation/api/surveys/survey_chats',
            'documentation/api/surveys/questions',
            'documentation/api/surveys/answers',

          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Tasks & State Machines',
          items: [
            'documentation/api/tasks/tasks',
            'documentation/api/tasks/task_groups',
            'documentation/api/tasks/statemachines',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Automations',
          items: [
            'documentation/api/bots',
            'documentation/api/scheduler',
            'documentation/api/pbscripts',
            'documentation/api/documentation',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Others',
          items: [
            'documentation/api/other/search',
            'documentation/api/other/redirect',
            'documentation/api/other/kb_legacy',
            'documentation/api/other/ratelimits',
          ],
          collapsed: true,
        },

        'documentation/api/company',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Automations',
      items: [
        'documentation/automation/overview',
        'documentation/automation/admin_routine',
        'documentation/automation/admin_cotlang',
        'documentation/automation/triggers_and_contexts',
        'documentation/automation/existing_routines',
        'documentation/automation/question_exec',
        'documentation/automation/scheduling',
        'documentation/automation/sla',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'BI & SQL',
      items: [
        'documentation/sql_bi/overview',
        'documentation/sql_bi/model',
        'documentation/sql_bi/bi_examples',
        'documentation/sql_bi/sql_examples',
        'documentation/sql_bi/sql_connection',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Extensions (FAAS)',
      items:  [
        'documentation/extensions/overview',
        'documentation/extensions/getting_started',
        'documentation/extensions/cli',
        {
          type: 'category',
          label: 'Examples',
          items:  [
            'documentation/extensions/examples/send_survey',
            'documentation/extensions/examples/static_site',
            'documentation/extensions/examples/survey_api',
            'documentation/extensions/examples/write_api'
          ],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Infrastructure',
      items:  [
        'documentation/infrastructure/overview',
      ],
      collapsed: true,
    }
  ],
  tutorials: [
    'tutorials/tutorial_overview',
    {
      type: 'category',
      label: 'Basic',
      items: [
        'tutorials/basic/configure_company',
        'tutorials/basic/create_user',
        'tutorials/basic/create_accessroles',
        'tutorials/basic/create_database',
        'tutorials/basic/create_group',
        'tutorials/basic/create_channel',
        'tutorials/basic/create_survey',
        'tutorials/basic/create_bot',
        'tutorials/basic/create_state_machines',
        'tutorials/basic/tutorial_taskview',

      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Intermediate',
      items: [
        'tutorials/intermediate/create_cmd_bot',
        'tutorials/intermediate/create_survey_sm',
        'tutorials/intermediate/create_survey_bot',
        'tutorials/intermediate/isCommanded',
        'tutorials/intermediate/sla',
        'tutorials/intermediate/tutorial_scheduler',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'tutorials/advanced/project_manager',
        'tutorials/advanced/tutorial_approval_flow',
        'tutorials/advanced/cutomizebot',
      ],
      collapsed: false,
    }
  ],
  certification: [
    'certification/certification_overview',
    {
      type: 'category',
      label: '[1.a] Basic Admin',
      items: [
        'certification/basic_admin/certification_admin_ws1',
        'certification/basic_admin/certification_admin_ws2',
        'certification/basic_admin/certification_admin_ws3',
        'certification/basic_admin/certification_admin_ws4',
        'certification/basic_admin/certification_admin_ws5',
        'certification/basic_admin/certification_admin_ws6'
      ],
      collapsed: true,
    },

  ],
  support: [
    'support/support_overview',
    'support/commercial',
    'support/technical',
    'support/bug_report',
    'support/feature_request',
    'support/report_abuse',
  ],
}

