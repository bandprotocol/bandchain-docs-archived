const { description } = require('../../package');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'BandChain Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#516ffa' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/bandprotocol/bandchain',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    logo: 'https://i.imgur.com/3gNsqzZ.png',
    nav: [
      {
        text: 'Whitepaper',
        link: '/whitepaper/',
      },
      {
        text: 'Developer',
        link: '/developer/',
      },
      {
        text: 'Website',
        link: 'https://bandprotocol.com',
      },
    ],
    sidebar: {
      '/developer/': [
        {
          title: 'Introduction to BandChain',
          sidebarDepth: 1,
          collapsable: false,
          children: [''],
        },
        {
          title: 'Technical Specifications',
          sidebarDepth: 1,
          collapsable: false,
          children: [
            'technical-specifications/obi',
            'technical-specifications/owasm',
            'technical-specifications/remote-data-source-executor',
            'technical-specifications/bandchain-cli-rest-endpoints',
          ],
        },
        {
          title: 'For dApp Developers',
          sidebarDepth: 1,
          collapsable: false,
          children: [
            'dapp-developers/',
            'dapp-developers/supported-blockchains',
            'dapp-developers/requesting-data-from-bandchain',
            'dapp-developers/using-bandchain-data-evm',
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};
