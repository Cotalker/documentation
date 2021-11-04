module.exports = {
  getting_started: [
    'getting_started/intro_overview',
    'getting_started/doc_guide',
    {
      type: 'category',
      label: 'The Basics',
      items: [
        'documentation/client/client_overview',
        'documentation/client/basic_concepts',
        {
          type: 'category',
          label: 'Platform Basics',
          items: [
            'documentation/client/first_steps',
            'documentation/client/layout',
            'documentation/client/main_menu',
            'documentation/client/tool_bar',
            'documentation/client/groups',
            'documentation/client/channels',
            // 'documentation/client/videocalls',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Basic Tools',
          items: [
            'documentation/client/client_search',
            'documentation/client/actions_button',
            'documentation/client/surveys',
            'documentation/client/taskview',
            'documentation/client/database',
            'documentation/client/dashboard',
            'documentation/client/reports',
            {
              type: 'category',
              label: 'Notes',
              items: [
                'documentation/client/notes',
                'documentation/client/notes_markdown',
              ],
              collapsed: true,
            },
          ],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    'getting_started/support',
  ],
  documentation: [
    'documentation/documentation_overview',
    'documentation/admin_basic_concepts',
    {
      type: 'category',
      label: 'Administrative Panel',
      items: [
        'documentation/admin/admin_overview',
        {
          type: 'category',
          label: 'Sections',
          items: [
            {
              type: 'category',
              label: 'Workflows',
              items: [
                'documentation/admin/workflows/admin_workflow_overview',
                {
                  type: 'category',
                  label: 'Settings Panels',
                  items: [
                    'documentation/admin/workflows/settings_panels/workflowgroups-initial',
                    'documentation/admin/workflows/settings_panels/workflowgroup-create-edit',
                    'documentation/admin/workflows/settings_panels/workflowgroup_channels',
                    'documentation/admin/workflows/settings_panels/workflows-setup',
                    'documentation/admin/workflows/settings_panels/workflow_create_edit',
                    'documentation/admin/workflows/settings_panels/create_edit_state',
                  ],
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: 'Basic Operations',
                  items: [
                    // 'documentation/admin/workflows/admin_workflow_configure',
                    'documentation/admin/workflows/admin_workflow_required_survey',
                    'documentation/admin/workflows/admin_workflow_public_survey',
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            'documentation/admin/admin_links',
            'documentation/admin/admin_group',
          ],
          collapsed: false,
        },
        {
          type: 'category',
          label: 'Data',
          items: [
            'documentation/admin/admin_properties',
            {
              type: 'category',
              label: 'Surveys',
              items: [
                'documentation/admin/survey/survey_overview',
                {
                  type: 'category',
                  label: 'Components',
                  items: [
                    {
                      type: 'autogenerated',
                      dirName: 'documentation/admin/survey/components',
                    },
                  ]
                }
              ],
              collapsed: true,
            },
            
          ],
          collapsed: false,
        },
        {
          type: 'category',
          label: 'Company',
          items: [
            'documentation/admin/users',
            'documentation/admin/admin_jobtitles',
            'documentation/admin/admin_company',
          ],
          collapsed: false,
        },
        {
          type: 'category',
          label: 'Automations',
          items: [
            'documentation/admin/admin_bots',
            'documentation/admin/admin_scheduler',
            'documentation/automation/automation_log',
            'documentation/admin/routines',
          ],
          collapsed: false,
        },
        {
          type: 'category',
          label: 'Security',
          items: [
            'documentation/admin/admin_accessrole',
            'documentation/admin/admin_token',
            'documentation/admin/admin_auditlogs',
          ],
          collapsed: false,
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Automation Tools',
      items: [
        // 'documentation/automation/overview',
        'documentation/automation/admin_routine',
        'documentation/automation/existing_routines',
        'documentation/automation/question_exec',
        // 'documentation/automation/scheduling',
        'documentation/automation/sla',
        'documentation/automation/automation_log',
        'documentation/automation/admin_cotlang',
        'documentation/automation/triggers_and_contexts',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'BI & SQL',
      items: [
        'documentation/sql_bi/overview',
        'documentation/sql_bi/model',
        // 'documentation/sql_bi/bi_examples',
        // 'documentation/sql_bi/sql_examples',
        // 'documentation/sql_bi/sql_connection',
      ],
      collapsed: true,
    },
    // {
    //   type: 'category',
    //   label: 'Extensions (FAAS)',
    //   items:  [
    //     'documentation/extensions/overview',
    //     'documentation/extensions/getting_started',
    //     'documentation/extensions/cli',
    //     {
    //       type: 'category',
    //       label: 'Examples',
    //       items:  [
    //         'documentation/extensions/examples/send_survey',
    //         'documentation/extensions/examples/static_site',
    //         'documentation/extensions/examples/survey_api',
    //         'documentation/extensions/examples/write_api'
    //       ],
    //       collapsed: true,
    //     },
    //   ],
    //   collapsed: true,
    // },
    // {
    //   type: 'category',
    //   label: 'Infrastructure',
    //   items:  [
    //     'documentation/infrastructure/overview',
    //   ],
    //   collapsed: true,
    // }
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
  // certification: [
  //   'certification/certification_overview',
  //   {
  //     type: 'category',
  //     label: '[1.a] Basic Admin',
  //     items: [
  //       'certification/basic_admin/certification_admin_ws1',
  //       'certification/basic_admin/certification_admin_ws2',
  //       'certification/basic_admin/certification_admin_ws3',
  //       'certification/basic_admin/certification_admin_ws4',
  //       'certification/basic_admin/certification_admin_ws5',
  //       'certification/basic_admin/certification_admin_ws6'
  //     ],
  //     collapsed: true,
  //   },

  // ],
  api: [
    'documentation/api/overview_api',
    'documentation/api/auth',
    {
      type: 'category',
      label: 'Users',
      items: [
        'documentation/api/users/users',
        'documentation/api/users/accessroles',
        // 'documentation/api/other/versiontracker',
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
        // 'documentation/api/communication/unreadmessages',
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
        // 'documentation/api/tasks/task_groups',
        'documentation/api/tasks/statemachines',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Automations',
      items: [
        'documentation/api/automations/bots',
        'documentation/api/automations/scheduler',
        // 'documentation/api/pbscripts',
        // 'documentation/api/documentation',
      ],
      collapsed: true,
    },
    // {
    //   type: 'category',
    //   label: 'Others',
    //   items: [
    //     'documentation/api/other/search',
    //     'documentation/api/other/redirect',
    //     'documentation/api/other/kb_legacy',
    //     'documentation/api/other/ratelimits',
    //   ],
    //   collapsed: true,
    // },
    'documentation/api/company',
  ],
  models: [
    'documentation/models/overview_model',
    'documentation/models/model_company',
    'documentation/models/users/model_users',
    'documentation/models/users/model_accessroles',
    'documentation/models/communication/model_groups',
    'documentation/models/communication/model_channels',
    'documentation/models/communication/model_messages',
    'documentation/models/communication/model_messageContent',
    'documentation/models/surveys/model_surveys',
    'documentation/models/surveys/model_surveychats',
    'documentation/models/surveys/model_questions',
    'documentation/models/surveys/model_questionContentType',
    'documentation/models/surveys/model_questionExec',
    'documentation/models/surveys/model_answers',
    'documentation/models/surveys/model_answer_data',
    'documentation/models/databases/model_propertytypes',
    'documentation/models/databases/model_properties',
    'documentation/models/tasks/model_statemachine',
    'documentation/models/tasks/model_state',
    'documentation/models/tasks/model_sla',
    'documentation/models/tasks/model_taskgroup',
    'documentation/models/tasks/model_tasks',
    'documentation/models/automations/model_parametrizedbot',
    'documentation/models/automations/model_bots',
    'documentation/models/automations/model_scheduler',
  ],
  support: [
    'support/support_overview',
    // 'support/commercial',
    // 'support/technical',
    // 'support/bug_report',
    // 'support/feature_request',
    // 'support/report_abuse',
  ],

}

