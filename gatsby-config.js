/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: require("./site-meta-data.json"),
  plugins: [
    // Provides drop-in support for server rendering data added with React Helmet.
    // React Helmet is a component which lets you control your document head using their React component.
    // With this plugin, attributes you add in their component, e.g. title, meta attributes, etc. will
    // get added to the static HTML pages Gatsby builds.
    "gatsby-plugin-react-helmet",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      // looks in the `static/uploads` folder for files to turn into gatsby-nodes
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/uploads`,
        name: "uploads",
      },
    },
    {
      // looks in the `src/content` folder for files to turn into gatsby-nodes
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/content`,
        name: "content",
      },
    },
    {
      // looks in the `src/page` folder for files to turn into gatsby-nodes
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      // looks in the `src/images` folder for files to turn into gatsby-nodes
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp", // for each file-node that is an image, use the plugin-sharp library that creates multiple image sizes
    // Creates ImageSharp nodes from image types that are supported by the Sharp image
    // processing library and provides fields in their GraphQL types for processing your images
    // in a variety of ways including resizing, cropping, and creating responsive images.
    // Pretty sure similar to gatsby-remark-images, but slightly better. Works for images
    // in `src/img` as well as images in `static/uploads` referenced in frontmatter.
    // See gastby-node how we get the frontmatter images to work.
    // Also note: Only transforms images that are actually used/referenced in the site.
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          {
            // Convert image src(s) in markdown to be relative to their node’s parent directory.
            // This will help gatsby-remark-images match images outside the node folder.
            // For example, use with NetlifyCMS.
            // NOTE: this doesn't work for frontmatter images. Just images direclty embedded in the markdown body.
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            // Processes images in markdown so they can be used in the production build.
            // (Pretty sure it's similar to transformer-sharp, but for markdown images directly in the body)
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            // Wraps iframes or objects (e.g. embedded YouTube videos) within markdown files in a responsive
            // elastic container with a fixed aspect ratio. This ensures that the iframe or object
            // will scale proportionally and to the full width of its container.
            resolve: "gatsby-remark-responsive-iframe",
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-remark-emojis",
          },
        ],
      },
    },
    // Intercepts local links from markdown and other non-react pages and does a client-side
    // pushState to avoid the browser having to refresh the page.
    "gatsby-plugin-catch-links",
    "gatsby-plugin-robots-txt", // generates robot.txt (not super necessary but nice to have) (using defaults)
    // Loads the Twitter JavaScript for embedding tweets, timelines, share and follow buttons.
    // Lets you add tweets to markdown and in other places.
    "gatsby-plugin-twitter",
    {
      resolve: "gatsby-plugin-favicon", // favicon
      options: {
        logo: "./static/images/logo192.png",
        appName: "Collab Sauce Blog", // used for "application-name" meta-tag
      },
    },
    `gatsby-plugin-sass`, // sass support in gatsby
    {
      // Automatically generates an admin/index.html with a default Netlify CMS implementation.
      // Essentially does netflify-cms for us.
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        manualInit: true, // so we can do custom configuration per environment
        customizeWebpackConfig: (config, { plugins, stage }) => {
          // By default, doing `yarn build-production` will not put a contenthash for cms.js.
          // This means that the file name in prod for cms.js is always `cms.js`. However, if we
          // change that file, we want the cache to be invalidated. Currently it will not be invalidated.
          // Therefore, we want to add a unique `contenthash` that will change if the contents of cms.js change.
          if (stage === "build-javascript") {
            config.output = {
              ...config.output,
              filename: "[name]-[contenthash].js",
              chunkFilename: "[name]-[contenthash].js",
            };
          }
        },
      },
    },
    "gatsby-plugin-dark-mode", // handles some of the details of implementing a dark mode theme.
    // siteURL is a must for sitemap generation
    "gatsby-plugin-sitemap", // Create a sitemap for your Gatsby site.
    // Automatically generates a _headers file and a _redirects file at the root of the
    // public folder to configure HTTP headers and redirects on Netlify.
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
