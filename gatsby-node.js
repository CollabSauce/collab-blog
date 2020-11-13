/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

const POSTS_PER_PAGE = 10;
const SIMILAR_POSTS_PER_PAGE = 3;

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              date
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;
    const tags = {};
    const categories = {};
    posts.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
        ),
        // additional data can be passed via context. (Available as a `pageContext`
        // prop in each React-page component, as well as the keys in the GraphQL query
        // for each page).
        context: {
          id,
          limit: SIMILAR_POSTS_PER_PAGE,
        },
      });
    });

    // Create index-page pages (pagination of blog posts)
    const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve("./src/templates/index.js"),
        context: {
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = node.frontmatter.path;

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }

  // frontmatter featuredimage so gatsby-transformer-sharp picks up on Netlify CMS' media uploads.
  // i.e,path to image need to be relative to path of markdown file.
  // OLD: /uploads/some_image.jpg
  // NEW: ../../static/uploads/some_image.jpg (translates to collab-blog/static/uploads/some_image.jpg)
  const { frontmatter } = node;
  if (frontmatter) {
    const { featuredimage } = frontmatter;
    if (featuredimage && featuredimage.indexOf("/uploads") === 0) {
      frontmatter.featuredimage = path.relative(
        path.dirname(node.fileAbsolutePath),
        path.join(__dirname, "/static/", featuredimage),
      );
    }
  }
};



//
//
//
// const path = require(`path`)
//
// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions
//
//   const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
//
//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             id
//             frontmatter {
//               path
//             }
//           }
//         }
//       }
//     }
//   `)
//
//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//
//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: node.frontmatter.path,
//       component: blogPostTemplate,
//       context: {}, // additional data can be passed via context
//     })
//   })
// }
