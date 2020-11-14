import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ShareButtons from "../components/ShareButtons";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Content, { HTMLContent } from "../components/Content";
import BlogRoll from "../components/BlogRoll";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  title,
  helmet,
  featuredimage,
  date,
  location,
  similarPosts,
}) => {
  const PostContent = contentComponent || Content;
  const blogRollData = { allMarkdownRemark: similarPosts };

  return (
    <div className="blog-post-container">
      {helmet || ""}
      <article className="post">
        {!featuredimage && (
          <div className="post-thumbnail">
            <h1 className="post-title">{title}</h1>
            <div className="post-meta">{date}</div>
          </div>
        )}
        <PreviewCompatibleImage
          imageInfo={{
            image: featuredimage,
            alt: `featured image for post ${title}`,
          }}
          objectFit="contain"
          imgContainerClass="blog-post-img-container"
          layoutClass="blog-post-featured-image"
        />
        <h1 className="post-title">{title}</h1>
        <div className="post-meta">{date}</div>
        {location && (
          <div className="share-buttons-container">
            <ShareButtons
              title={title}
              imageUrl={featuredimage.publicURL}
              location={location}
            />
          </div>
        )}
        <PostContent content={content} className="blog-post-content" />
      </article>
      {similarPosts.edges && (
        <>
          <h3 className="more-like-this">More Like This</h3>
          <BlogRoll data={blogRollData} clipped />
        </>
      )}
    </div>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
  featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  date: PropTypes.string,
  location: PropTypes.object,
  similarPosts: PropTypes.object,
};

const BlogPost = ({ data, location }) => {
  const {
    markdownRemark: post,
    site: {
      siteMetadata: { title, siteUrl },
    },
    recentPosts,
  } = data;

  const metaTitle = `${post.frontmatter.title} | ${title}`;
  const metaDescription = post.frontmatter.description;
  const metaKeywords = post.frontmatter.keywords;
  const metaImage =
    post.frontmatter.featuredimage &&
    `${siteUrl}${post.frontmatter.featuredimage.publicURL}`;

  return (
    <Layout location={location}>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet title={metaTitle}>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            {metaImage ? (
              <meta name="image" content={`${siteUrl}${metaImage}`} />
            ) : null}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            {metaImage ? (
              <meta property="og:image" content={`${siteUrl}${metaImage}`} />
            ) : null}
            {metaImage ? (
              <meta
                property="og:image:secure_url"
                content={`${siteUrl}${metaImage}`}
              />
            ) : null}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {metaImage ? (
              <meta name="twitter:image" content={`${siteUrl}${metaImage}`} />
            ) : null}
          </Helmet>
        }
        title={post.frontmatter.title}
        featuredimage={post.frontmatter.featuredimage}
        date={post.frontmatter.date}
        location={location}
        similarPosts={recentPosts}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $limit: Int!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 320)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        keywords
        featuredimage {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2400, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { templateKey: { eq: "blog-post" }, isvisible: { eq: true } }
        id: { ne: $id }
      }
      limit: $limit
    ) {
      edges {
        node {
          ...BlogSnippetFragment
        }
      }
    }
  }
`;
