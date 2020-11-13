import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";

class IndexPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h2>Blog Posts</h2>
        <BlogRoll
          data={this.props.data}
          pageContext={this.props.pageContext}
          pageName=""
        />
      </Layout>
    );
  }
}

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...BlogSnippetFragment
        }
      }
    }
  }
`;
