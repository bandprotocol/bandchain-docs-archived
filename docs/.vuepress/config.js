module.exports = {
  theme: 'cosmos',
  title: 'Band Protocol Documentation',
  locales: {
    '/': {
      lang: 'en-US',
    },
  },
  base: process.env.VUEPRESS_BASE || '/',
  themeConfig: {
    repo: 'BandProtocol/bandchain',
    docsRepo: 'BandProtocol/bandchain-docs',
    docsDir: 'docs',
    editLinks: true,
    // docs 1.0.168: custom true hides subpages searchbar
    // docs 1.0.168: custom true hides hub, ibc, core sidebar footer logos
    custom: true,
    logo: {
      src: 'https://i.imgur.com/kzVQJi2.png',
    },
    topbar: {
      banner: false,
    },
    sidebar: {
      auto: false,
      nav: [
        {
          title: 'Reference',
          children: [
            {
              title: 'Introduction',
              directory: true,
              path: '/introduction',
            },
            {
              title: 'Whitepaper',
              directory: true,
              path: '/whitepaper',
            },
          ],
        },
        {
          title: 'Developer',
          children: [
            {
              title: 'Technical Specifications',
              directory: true,
              path: '/developer/technical-specifications',
            },
            {
              title: 'dApp Integrations',
              directory: true,
              path: '/developer/dapp-integrations',
            },
          ],
        },
      ],
    },
    gutter: {
      title: 'Help & Support',
      editLink: true,
      chat: {
        title: 'Developer Discord',
        text: 'For technical-related discussions and queries',
        url: 'https://100x.band/discord',
        bg: 'linear-gradient(103.75deg, #1B1E36 0%, #22253F 100%)',
      },
      forum: {
        title: 'Telegram Group',
        text: 'General Chat for all things Band Protocol',
        url: 'https://100x.band/tg',
        bg: 'linear-gradient(221.79deg, #2eb1f3 -1.08%, #0289cc 95.88%)',
        logo: 'telegram',
      },
      github: {
        title: 'Found an Issue?',
        text: 'Help us improve this page by suggesting edits on GitHub.',
        url: 'https://github.com/BandProtocol/bandchain-docs',
        bg: '#F8F9FC',
      },
    },
    footer: {
      logo: 'https://i.imgur.com/kzVQJi2.png',
      textLink: {
        text: 'bandprotocol.com',
        url: 'https://bandprotocol.com',
      },
      services: [
        {
          service: 'github',
          url: 'https://github.com/BandProtocol/bandchain',
        },
        {
          service: 'twitter',
          url: 'https://twitter.com/bandprotocol',
        },
        {
          service: 'telegram',
          url: 'https://100x.band/tg',
        },
        {
          service: 'discord',
          url: 'https://100x.band/discord',
        },
        {
          service: 'medium',
          url: 'https://medium.com/bandprotocol',
        },
      ],
      smallprint:
        'This website is maintained by [Band Protocol](https://bandprotocol.com). The contents and opinions of this website are those of Band Protocol.',
      links: [
        {
          title: 'Links',
          children: [
            {
              title: 'Band Protocol Website',
              url: 'https://bandprotocol.com',
            },
            {
              title: 'BandChain Block Explorer',
              url: 'https://cosmoscan.io',
            },
          ],
        },
        {
          title: 'Community',
          children: [
            {
              title: 'Telegram Group',
              url: 'https://100x.band/tg',
            },
            {
              title: 'Developer Discord',
              url: 'https://100x.band/discord',
            },
            {
              title: 'Band Protocol Blog',
              url: 'https://medium.com/bandprotocol',
            },
          ],
        },
      ],
    },
  },
};
