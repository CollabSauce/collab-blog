import React from "react";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/blog-post";

const BlogPostPreview = ({ entry, widgetFor }) => {
  const date = (entry.getIn(["data", "date"]) || new Date()).toDateString();

  return (
    <BlogPostTemplate
      content={widgetFor("body") || ""}
      title={entry.getIn(["data", "title"]) || ""}
      featuredimage={`/${entry.getIn(["data", "featuredimage"])}`}
      date={date}
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
