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
          label: 'Accessing the Platform',
          collapsed: true,
          items: [
            'documentation/client/platform_access/system_requirements',
            'documentation/client/platform_access/first_steps',
          ]
        },
        {
          type: 'category',
          label: 'User-Interface Basics',
          items: [
            'documentation/client/layout',
            'documentation/client/main_menu',
            'documentation/client/tool_bar',
            'documentation/client/groups',
            'documentation/client/channels'
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Basic Tools',
          items: [
            'documentation/client/client_search',
            'documentation/client/actions_button',
            {
              type: 'category',
              label: 'Surveys',
              link: {
                type: 'doc',
                id: 'documentation/client/surveys/overview'
              },
              items: [
                'documentation/client/surveys/access',
                'documentation/client/surveys/automations',
                'documentation/client/surveys/dynamic',
                'documentation/client/surveys/location',
                'documentation/client/surveys/bulkloader',
              ]
            },
            {
              type: 'category',
              label: 'Tasks',
              link: {
                type: 'doc',
                id: 'documentation/client/tasks/overview',
              },
              items: [
                'documentation/client/tasks/access_task',
                {
                  type: 'category',
                  label: 'User Interface',
                  items: [
                    'documentation/client/tasks/taskview',
                    'documentation/client/tasks/group_view',
                    {
                      type: 'category',
                      label: 'Task Workspace',
                      link: {
                        type: 'doc',
                        id: 'documentation/client/tasks/task_workspace',
                      },
                      items: [
                        'documentation/client/tasks/task_notes',
                        'documentation/client/tasks/task_chat',
                        'documentation/client/tasks/task_details'
                      ],
                      collapsed: true
                    },
                  ],
                  collapsed: true
                },
                {
                  type: 'category',
                  label: 'How-To',
                  items: [
                    'documentation/client/tasks/create_task',
                    'documentation/client/tasks/update_task',
                    'documentation/client/tasks/filter_tasks'
                  ],
                  collapsed: true
                },
              ]
            },
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
        'documentation/client/offline',
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
                    'documentation/admin/tips/task_view'
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            'documentation/admin/admin_links',
            {
              type: 'category',
              label: 'Groups',
              items: [
                'documentation/admin/groups/overview_groups',
                'documentation/admin/groups/admin_groups',
                'documentation/admin/groups/admin_channels',
              ],
              collapsed: true,
            },
            'documentation/admin/admin_categories',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Data',
          items: [
            {
              type: 'category',
              label: 'Database',
              items: [
                'documentation/admin/database/admin_database_overview',
                'documentation/admin/database/admin_collections',
                {
                  type: 'category',
                  label: 'Elements',
                  link: {
                      type: 'doc',
                      id: 'documentation/admin/database/admin_elements'
                    },
                  items: [
                    'documentation/admin/database/asset_create',
                    {
                      type: 'category',
                      label: 'Asset Viewer',
                      link: {
                        type: 'doc',
                        id: 'documentation/admin/database/asset_viewer',
                      },
                      items: [
                        'documentation/admin/database/asset_qr',
                        {
                          type: 'category',
                          label: 'Reports & Actions',
                          link: {
                            type: 'doc',
                            id: 'documentation/admin/database/asset_reports_actions',
                          },
                          items: [
                            'documentation/admin/database/asset_tasks',
                            'documentation/admin/database/asset_actions',
                            'documentation/admin/database/asset_forms',
                          ]
                        },
                        'documentation/admin/database/asset_edit'
                      ],
                      collapsed: true,
                    }
                  ],
                  collapsed: true
                }
              ],
              collapsed: true,
            },
            {
              type: 'category',
              label: 'Surveys',
              link: {
                type: 'doc',
                id: 'documentation/admin/survey/survey_overview',
              },
              items: [
                'documentation/admin/survey/settings',
                'documentation/admin/survey/edit_template',
                {
                  type: 'category',
                  label: 'Components',
                  link: {
                    type: 'doc',
                    id: 'documentation/admin/survey/components_overview',
                  },
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
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Company',
          items: [
            'documentation/admin/users',
            'documentation/admin/admin_jobtitles',
            'documentation/admin/admin_company',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Automations',
          items: [
            'documentation/admin/admin_bots',
            'documentation/admin/admin_scheduler',
            'documentation/automation/automation_log',
            'documentation/admin/routines',
            'documentation/admin/admin_webhooks',
          ],
          collapsed: true,
        },
        {
          type: 'category',
          label: 'Security',
          items: [
            'documentation/admin/admin_accessrole',
            'documentation/admin/admin_token',
            'documentation/admin/admin_auditlogs',
          ],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Automation Tools',
      items: [
        {
          type: 'category',
          label: 'COTLang Guide',
          link: {
            type: 'doc',
            id: 'documentation/automation/cotlang/admin_cotlang'
          },
          items: [
            'documentation/automation/cotlang/cotlang_guide',
            'documentation/automation/cotlang/triggers_and_contexts',
            'documentation/automation/cotlang/extract_survey_element'
          ],
          collapsed: true,
          collapsible: true
        },
        ,
        'documentation/automation/code_editor',
        'documentation/automation/admin_routine',
        'documentation/automation/existing_routines',
        {
          type: 'category',
          label: 'Survey Automations',
          items: [
            'documentation/automation/surveys/question_exec',
            'documentation/automation/surveys/survey_editable_code',
            'documentation/automation/surveys/survey_hidden_code',
          ]
        },
        //'documentation/automation/scheduling',
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
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Special Configurations',
      items: [
        'documentation/admin/special_configurations/azure_config',
        'documentation/admin/special_configurations/branding',
      ],
      collapsed: true,
    },
   ],
  tutorials: [
    'tutorials/tutorial_overview',
    {
      type: 'category',
      label: 'Basic',
      items: [
        'tutorials/basic/configure_company',
        'tutorials/basic/create_accessroles',
        'tutorials/basic/create_user',
        'tutorials/basic/create_database',
        'tutorials/basic/create_group',
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
      label: 'Automations',
      items: [
        'documentation/api/automations/bots',
        'documentation/api/automations/scheduler',
        'documentation/api/automations/pbscripts',
        'documentation/api/automations/webhooks',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Company & Users',
      items: [
        'documentation/api/company',
        'documentation/api/users/users',
        'documentation/api/users/accessroles',
        'documentation/api/users/jobtitles',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Database',
      items: [
        'documentation/api/databases/property_types',
        'documentation/api/databases/properties',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Groups & Messages',
      items: [
        'documentation/api/communication/channels',
        'documentation/api/communication/messages',
        'documentation/api/communication/groups',
        'documentation/api/communication/files',
      ],
      collapsed: true,
    },
    'documentation/api/notes/notes',
    'documentation/api/search',
    {
      type: 'category',
      label: 'Survey Forms',
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
      label: 'Workflows & Tasks',
      items: [
        'documentation/api/tasks/tasks',
        'documentation/api/tasks/tasks-v1',
        'documentation/api/tasks/statemachines',
      ],
      collapsed: true,
    }
  ],
  models: [
    'documentation/models/overview_model',
    {
      type: 'category',
      label: '1. Company & Users',
      items: [
        {
          type: 'category',
          label: 'COTCompany',
          link: {
            type: 'doc',
            id: 'documentation/models/company/model_company',
          },
          items: [
            'documentation/models/company/company_branding',
            'documentation/models/company/company_searchengine'
          ],
          collapsed: true
        },
        
        'documentation/models/users/model_users',
        'documentation/models/users/model_jobtitles',
        'documentation/models/users/model_accessroles',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: '2. Groups & Messages',
      items: [
        'documentation/models/communication/model_channels',
        'documentation/models/communication/model_groups',
        'documentation/models/communication/model_messages',
        'documentation/models/communication/model_messageContent',
        'documentation/models/communication/file',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: '3. Survey Forms',
      items: [
        'documentation/models/surveys/model_answers',
        'documentation/models/surveys/model_answer_data',
        'documentation/models/surveys/model_questions',
        'documentation/models/surveys/model_questionContentType',
        'documentation/models/surveys/model_questionExec',
        'documentation/models/surveys/model_surveys',
        'documentation/models/surveys/model_surveychats',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: '4. Database',
      items: [
        'documentation/models/databases/model_properties',
        'documentation/models/databases/model_propertytypes',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: '5. Tasks & Workflows',
      items: [
        'documentation/models/tasks/model_sla',
        'documentation/models/tasks/model_state',
        'documentation/models/tasks/model_statemachine',
        'documentation/models/tasks/model_tasks',
        'documentation/models/tasks/model_taskgroup',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: '6. Automations',
      items: [
        'documentation/models/automations/model_bots',
        'documentation/models/automations/model_parametrizedbot',
        'documentation/models/automations/model_pbscripts',
        'documentation/models/automations/model_scheduler',
        {
          type: 'category',
          label: 'Webhooks',
          items: [
            'documentation/models/webhooks/event',
            'documentation/models/webhooks/survey_execution',
            'documentation/models/webhooks/webhook',
            'documentation/models/webhooks/webhooklog',
          ],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: '7. Search',
      items: [
        'documentation/models/search/searchengine',
        'documentation/models/search/searchresult'
      ],
      collapsed: true,
    },
    'documentation/models/notes/model_notes'
  ],
  support: [
    'support/support_overview',
    // 'support/commercial',
    // 'support/technical',
    // 'support/bug_report',
    // 'support/feature_request',
    // 'support/report_abuse',
  ],
  products: [
    {
      type: 'category',
      label: 'Products Overview',
      link: {
        type: 'doc',
        id: 'products/products_overview'
      },
      items: [
        {
          type: 'category',
          label: 'Corrective Maintenance',
          link: {
            type: 'doc',
            id: 'products/corrective_maintenance/landing/overview',
          },
          collapsed: true,
          collapsible: true,
          items: [
            'products/corrective_maintenance/user_types/overview',
            {
              type: 'category',
              label: 'Actions & Forms',
              link: {
                type: 'doc',
                id: 'products/corrective_maintenance/actions/overview'
              },
              items: [
                'products/corrective_maintenance/actions/create_notification',
                'products/corrective_maintenance/actions/wo_create',
                'products/corrective_maintenance/actions/wo_accept',
                'products/corrective_maintenance/actions/wo_close',
                'products/corrective_maintenance/actions/wo_validate',
                'products/corrective_maintenance/actions/wo_feedback',
                'products/corrective_maintenance/actions/wo_fast_close',
                'products/corrective_maintenance/actions/wo_reject_request',
                'products/corrective_maintenance/actions/wo_reject_accept',
              ],
              collapsed: true
            },
            {
              type: 'category',
              label: 'Configure Master Data',
              link: {
                type: 'doc',
                id: 'products/corrective_maintenance/master_data/overview',
              },
              collapsed: true,
              collapsible: true,
              items: [
                'products/corrective_maintenance/master_data/workstation',
                'products/corrective_maintenance/master_data/users',
                'products/corrective_maintenance/master_data/job_title',
                'products/corrective_maintenance/master_data/rol',
                'products/corrective_maintenance/master_data/failure_catalog',
                'products/corrective_maintenance/master_data/failure_symptoms',
                'products/corrective_maintenance/master_data/failure_cause',
                'products/corrective_maintenance/master_data/failure_priority',
                'products/corrective_maintenance/master_data/equipment_sector',
                'products/corrective_maintenance/master_data/equipment_family',
                'products/corrective_maintenance/master_data/equipment_category',
                'products/corrective_maintenance/master_data/asset_class',
                'products/corrective_maintenance/master_data/checklist',
                'products/corrective_maintenance/master_data/center_type',
                'products/corrective_maintenance/master_data/center',
                'products/corrective_maintenance/master_data/equipment',
                'products/corrective_maintenance/master_data/equipment_condition',
                'products/corrective_maintenance/master_data/material',
                'products/corrective_maintenance/master_data/service'
              ]
            },
            {
              type: 'category',
              label: 'Reports',
              link: {
                type: 'doc',
                id: 'products/corrective_maintenance/reports/overview',
              },
              items: [
                'products/corrective_maintenance/reports/asset_report',
                'products/corrective_maintenance/reports/maintenance_report',
              ]
            }
          ]
        },
        {
          type: 'category',
          label: '📋 Cotalker Forms',
          link: {
            type: 'doc',
            id: 'products/forms/overview',
          },
          collapsed: true,
          collapsible: true,
          items: [
            {
              type: 'category',
              label: 'Tasks',
              link: {
                type: 'doc',
                id: 'products/forms/tasks/overview',
              },
              collapsed: true,
              collapsible: true,
              items: []
            },
            {
              type: 'category',
              label: 'Configuration',
              link: {
                type: 'doc',
                id: 'products/forms/configuration/overview',
              },
              collapsed: true,
              collapsible: true,
              items: [
                'products/forms/configuration/users/overview',
                'products/forms/configuration/locations/overview',
                'products/forms/configuration/forms/overview',
              ]
            },
            {
              type: 'category',
              label: 'Reports',
              link: {
                type: 'doc',
                id: 'products/forms/reports/overview',
              },
              collapsed: true,
              collapsible: true,
              items: []
            },
            {
              type: 'category',
              label: 'Dashboards',
              link: {
                type: 'doc',
                id: 'products/forms/configuration/overview',
              },
              collapsed: true,
              collapsible: true,
              items: []
            },
          ],
        },
        'products/preventive_maintenance/pm_overview',
        'products/work_order_product/wo_overview',
        'products/purchase_order_product/po_overview',
        'products/service_orders/so_overview',
        'products/service_quotations/sq_overview'
      ],
      collapsed: false,
      collapsible: false,
    },
  ],
}
