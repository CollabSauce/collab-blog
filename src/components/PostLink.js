import React from "react";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const PostLink = ({ post }) => (
  <article className="card ">
    <Link to={post.fields.slug}>
      <PreviewCompatibleImage
        imageInfo={{
          image: post.frontmatter.featuredimage,
          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
        }}
        objectFit="cover"
        layoutClass="blog-post-blog-roll"
        fluidProps={{ aspectRatio: 1 }}
      />
    </Link>
    <header>
      <h2 className="post-title">
        <Link to={post.fields.slug} className="post-link">
          {post.frontmatter.title}
        </Link>
      </h2>
      <div className="post-meta">{post.frontmatter.date}</div>
    </header>
  </article>
);
export default PostLink;
