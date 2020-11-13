import React from "react";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import useSiteMetadata from "./SiteMetadata";

const ShareButtons = ({ title, imageUrl, location }) => {
  const { siteUrl } = useSiteMetadata();
  const url = `${siteUrl}${location.pathname}`;
  return (
    <div className="share-buttons">
      <FacebookShareButton url={url} quote={title} className="share-button">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} className="share-button">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url} className="share-button">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};
export default ShareButtons;

ShareButtons.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  location: PropTypes.object,
};
