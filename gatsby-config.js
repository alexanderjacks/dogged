module.exports = {
  siteMetadata: {
    title: 'StardewDex',
    description:
      'Stardew Valley bundling, questing, gifting, farming, foraging, fishing, etc guide.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'items',
        engine: 'flexsearch',
        query:`
        {
          allMarkdownRemark {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  type
                }
              }
            }
          }
        }
        `,
        ref:'id',
        store: ['id', 'slug', 'title', 'type'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.edges.map(({ node }) => ({
            id: node.id,
            slug: node.slug,
            title: node.title,
            type: node.type,
          })),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-google-adsense`, // <-- really wish this could magically work w PWA architecture; love that it exists at all
      options: {
        publisherId: `ca-pub-1699472970547311` // AdSense acct, use on other sites amply
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: { // PWA specs
        name: `StardewDex`,
        short_name: `StardewDex`,
        start_url: `/`,
        background_color: `#0000ff`,
        theme_color: `#ff00ff`,//possible entirely too loud but a nice branding attempt for now
        display: `standalone`,
        icon: `static/img/apple-touch-icon.png`, // This path is relative to the root of the site.
      },
    },
    // `gatsby-plugin-offline`, // PWA flag! breaks AdSense ;_;
    'gatsby-plugin-netlify', // plz keep this last in the plugins array
  ],
}
