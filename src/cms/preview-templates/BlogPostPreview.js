import React from "react";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/blog-post";

const BlogPostPreview = ({ entry, widgetFor }) => {
  return (
    <BlogPostTemplate
      content={widgetFor("body") || ""}
      title={entry.getIn(["data", "title"]) || ""}
      featuredimage={`/${entry.getIn(["data", "featuredimage"])}`}
      date={entry.getIn(["data", "date"]).toDateString()}
      similarPosts={{}}
    />
  );
};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default BlogPostPreview;
