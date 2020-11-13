import CMS from "netlify-cms-app";

import BlogPostPreview from "./preview-templates/BlogPostPreview";

CMS.registerPreviewStyle("../yoast.css");
CMS.registerPreviewStyle("../all.css");
CMS.registerPreviewTemplate("blog", BlogPostPreview);

// In gatsby-config.js, for gatsby-plugin-netlify-cms, we pass
// `manualInit: true`.
// Therefore, we must manually `init` it here.
CMS.init({
  config: {
    backend: {
      name: "github",
      repo: "CollabSauce/collab-blog",
      commit_messages: {
        create: "Create {{collection}} “{{slug}}”",
        update: "Update {{collection}} “{{slug}}”",
        delete: "Delete {{collection}} “{{slug}}”",
        uploadMedia: "[skip ci] Upload “{{path}}”",
        deleteMedia: "[skip ci] Delete “{{path}}”",
      },
    },
    load_config_file: false,
    media_folder: "static/uploads",
    public_folder: "uploads/",
    publish_mode: "editorial_workflow",
    show_preview_links: false,
    collections: [
      {
        name: "blog",
        label: "Blog",
        folder: "src/content",
        slug: "{{slug}}",
        create: true,
        fields: [
          {
            label: "Template Key",
            name: "templateKey",
            widget: "hidden",
            default: "blog-post",
          },
          {
            label: "Path (url)",
            name: "path",
            widget: "string",
            pattern: ["/", "Path must start with /"],
            hint: "Path must start with /",
          },
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "date", widget: "datetime" },
          {
            label: "Meta Description",
            name: "description",
            required: false,
            widget: "text",
          },
          {
            label: "Featured Image",
            name: "featuredimage",
            widget: "image",
            required: true,
          },
          { label: "Body", name: "body", widget: "markdown" },
        ],
      },
      {
        name: "settings",
        label: "Settings",
        files: [
          {
            name: "config",
            label: "Config",
            file: "site-meta-data.json",
            fields: [
              {
                widget: "string",
                name: "title",
                label: "Site Title",
                required: true,
              },
              {
                widget: "string",
                name: "siteUrl",
                label: "Website URL",
                required: true,
              },
              {
                widget: "text",
                name: "description",
                label: "Description",
                required: false,
              },
              {
                widget: "object",
                name: "home",
                label: "Homepage Options",
                fields: [
                  {
                    widget: "string",
                    name: "title",
                    label: "Title",
                    default: "",
                    required: false,
                  },
                  {
                    widget: "markdown",
                    name: "description",
                    label: "Description",
                    default: "",
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
