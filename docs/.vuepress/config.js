module.exports = {
  theme: "cosmos",
  title: "Band Protocol Documentation",
  plugins: ["vuepress-plugin-element-tabs"],
  locales: {
    "/": {
      lang: "en-US",
    },
  },
  base: process.env.VUEPRESS_BASE || "/",
  themeConfig: {
    repo: "BandProtocol/bandchain",
    docsRepo: "BandProtocol/bandchain-docs",
    docsDir: "docs",
    editLinks: true,
    // docs 1.0.168: custom true hides subpages searchbar
    // docs 1.0.168: custom true hides hub, ibc, core sidebar footer logos
    custom: true,
    logo: {
      src: "https://i.imgur.com/kzVQJi2.png",
    },
    topbar: {
      banner: false,
    },
    sidebar: {
      auto: false,
      nav: [
        {
          title: "Documentation",
          children: [
            {
              title: "Introduction",
              directory: true,
              path: "/introduction",
            },
            {
              title: "Whitepaper",
              directory: true,
              path: "/whitepaper",
            },
            {
              title: "Technical Specifications",
              directory: true,
              path: "/technical-specifications",
            },
          ],
        },
        {
          title: "Client Library",
          children: [
            {
              title: "Python",
              directory: true,
              path: "/client-library/python",
            },
            {
              title: "TypeScript",
              directory: true,
              path: "/client-library/typescript",
            },
          ],
        },
        {
          title: "Band Standard Dataset",
          children: [
            {
              title: "Introduction",
              path: "/band-standard-dataset/",
            },
            {
              title: "Supported Blockchains",
              path: "/band-standard-dataset/supported-blockchains",
            },
            {
              title: "Supported Price Feeds",
              path: "/band-standard-dataset/supported-feeds",
            },
            {
              title: "Using the Data",
              directory: true,
              path: "/band-standard-dataset/using-band-dataset",
            },
          ],
        },
        {
          title: "Using Any Datasets",
          children: [
            {
              title: "Introduction",
              path: "/using-any-datasets",
            },
            {
              title: "Supported Blockchains",
              path: "/using-any-datasets/supported-blockchains",
            },
            {
              title: "Available Oracle Scripts",
              path: "/using-any-datasets/default-oracle-scripts",
            },
          ],
        },
        {
          title: "Reference",
          children: [
            {
              title: "Contracts",
              path: "/contracts/",
            },
          ],
        },
      ],
    },
    gutter: {
      title: "Help & Support",
      editLink: true,
      chat: {
        title: "Developer Discord",
        text: "For technical-related discussions and queries",
        url: "https://100x.band/discord",
        bg: "linear-gradient(103.75deg, #1B1E36 0%, #22253F 100%)",
      },
      forum: {
        title: "Telegram Group",
        text: "General chat for all things Band Protocol",
        url: "https://100x.band/tg",
        bg: "linear-gradient(221.79deg, #2eb1f3 -1.08%, #0289cc 95.88%)",
        logo: "telegram",
      },
      github: {
        title: "Found an Issue?",
        text: "Help us improve this page by suggesting edits on GitHub.",
        url: "https://github.com/BandProtocol/bandchain-docs",
        bg: "#F8F9FC",
      },
    },
    footer: {
      logo: "https://i.imgur.com/kzVQJi2.png",
      textLink: {
        text: "bandprotocol.com",
        url: "https://bandprotocol.com",
      },
      services: [
        {
          service: "github",
          url: "https://github.com/BandProtocol/bandchain",
        },
        {
          service: "twitter",
          url: "https://twitter.com/bandprotocol",
        },
        {
          service: "telegram",
          url: "https://100x.band/tg",
        },
        {
          service: "discord",
          url: "https://100x.band/discord",
        },
        {
          service: "medium",
          url: "https://medium.com/bandprotocol",
        },
      ],
      smallprint:
        "This website is maintained by [Band Protocol](https://bandprotocol.com). The contents and opinions of this website are those of Band Protocol.",
      links: [
        {
          title: "Links",
          children: [
            {
              title: "Band Protocol Website",
              url: "https://bandprotocol.com",
            },
            {
              title: "BandChain Block Explorer",
              url: "https://cosmoscan.io",
            },
          ],
        },
        {
          title: "Community",
          children: [
            {
              title: "Telegram Group",
              url: "https://100x.band/tg",
            },
            {
              title: "Developer Discord",
              url: "https://100x.band/discord",
            },
            {
              title: "Band Protocol Blog",
              url: "https://medium.com/bandprotocol",
            },
          ],
        },
      ],
    },
  },
};
