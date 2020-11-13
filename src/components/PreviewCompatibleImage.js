import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image/withIEPolyfill";

const PreviewCompatibleImage = ({
  imageInfo,
  imgContainerClass = "",
  layoutClass = "",
  objectFit = "cover",
  fluidProps = {},
}) => {
  const { alt = "", childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <div className={imgContainerClass}>
        <Img
          className={layoutClass}
          objectFit={objectFit}
          fluid={{ ...image.childImageSharp.fluid, ...fluidProps }}
          alt={alt}
        />
      </div>
    );
  }

  if (!!childImageSharp) {
    return (
      <div className={imgContainerClass}>
        <Img
          className={layoutClass}
          objectFit={objectFit}
          fluid={{ ...childImageSharp.fluid, ...fluidProps }}
          alt={alt}
        />
      </div>
    );
  }

  if (
    (!!image && typeof image.publicURL === "string") ||
    typeof image === "string"
  ) {
    let imgSrc = "";
    if (typeof image.publicURL === "string") {
      imgSrc = image.publicURL;
    } else if (typeof image === "string") {
      imgSrc = image;
    }

    if (imgSrc) {
      return (
        <div className="blog-post-public-url-img-container">
          <img className={layoutClass} src={imgSrc} alt={alt} />
        </div>
      );
    }
  }

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
  objectFit: PropTypes.string,
  imgContainerClass: PropTypes.string,
  layoutClass: PropTypes.string,
  fluidProps: PropTypes.object,
};

export default PreviewCompatibleImage;
