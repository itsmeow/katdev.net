console.log("BUILD ON: " + process.env.NODE_ENV)
module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `wyattdev.net`,
    description: `Wyatt S - Human, Software Developer, Tech Enthusiast, Learner, Advocate`,
    author: `wyattdev`,
    siteURL: `https://wyattdev.net`,
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/blogs/`,
        name: `blogs`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-meta-redirect`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `G-S1CT8K8BV2`,
        head: true,
        anonymize: false,
      },
    },
    `gatsby-plugin-image`,
    `babel-preset-gatsby`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `wyattdev.net`,
        short_name: `wyattdev.net`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#121212`,
        display: `standalone`,
        icon: `src/data/icon.png`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
  ],
}
