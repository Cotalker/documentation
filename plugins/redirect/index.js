//const { useDocsData } = require("@docusaurus/plugin-content-docs/client");

// const baseItemsEn = [
//   {
//     to: 'docs/products/products_overview',
//     activeBasePath: 'docs',
//     label: 'Products',
//     position: 'left',
//   },
//   {
//     to: 'docs/getting_started/intro_overview',
//     activeBasePath: 'docs',
//     label: 'Getting Started',
//     position: 'left',
//   },      
//   {
//     to: 'docs/documentation/documentation_overview',
//     activeBasePath: 'docs',
//     label: 'Admin Docs',
//     position: 'left',
//   },
//   {
//     to: 'docs/documentation/api/overview_api',
//     activeBasePath: 'docs',
//     label: 'API',
//     position: 'left',
//   },
//   {
//     to: 'docs/documentation/models/overview_model',
//     activeBasePath: 'docs',
//     label: 'Data Models',
//     position: 'left',
//   },
//   {
//     to: 'docs/tutorials/tutorial_overview',
//     activeBasePath: 'docs',
//     label: 'Tutorials',
//     position: 'left',
//   },
//   {
//     to: 'blog',
//     label: `What's New`,
//     position: 'left',
//   },
//   {
//     to: 'docs/support/support_overview',
//     activeBasePath: 'docs',
//     label: 'Support & Help',
//     position: 'left',
//   },
// ]

// const baseItemsEs = [
//   {
//     to: 'docs/products/products_overview',
//     activeBasePath: 'docs',
//     label: 'Products',
//     position: 'left',
//   },
// ]

module.exports = async function myPlugin(context, options) {
    //console.log(context.i18n.currentLocale)
    // console.log('bo',options)
    // if(context.siteConfig)
    return {
      name: 'my-plugin',
      async loadContent() {
        if( context.i18n.currentLocale == 'es' ) {
          console.log(context)
        }
        
      },
      async contentLoaded({content, actions}) {
        console.log(content, actions)
      },

      async postStart(props) {
        console.log(props)
      },
      translateThemeConfig({themeConfig, translationFiles}) {
        console.log(themeConfig, translationFiles)
        if ( context.i18n.currentLocale == 'es' ) {
          
        }
        return themeConfig
      },

      getTranslationFiles({content}) {
        
      },

      translateContent(content) {
        console.log(content)
      },

      // async getDefaultCodeTranslationMessages(content) {
      //   console.log(content)
      // }

    };
  };
