import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import BlogRollPagination from "./BlogRollPagination";
import PostLink from "./PostLink";

export default class BlogRoll extends React.Component {
  render() {
    const { data, pageName, pageContext, clipped } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="grids">
        {posts.map(edge => (
          <PostLink key={edge.node.id} post={edge.node} />
        ))}
        {!clipped && (
          <BlogRollPagination pageContext={pageContext} pageName={pageName} />
        )}
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

// Only used for in other pages that use this Fragment
export const query = graphql`
  fragment BlogSnippetFragment on MarkdownRemark {
    excerpt(pruneLength: 400)
    id
    fields {
      slug
    }
    frontmatter {
      title
      templateKey
      date(formatString: "MMMM DD, YYYY")
      path
      featuredimage {
        childImageSharp {
          fluid(maxWidth: 750, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
