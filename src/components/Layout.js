import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import Navigation from "./navigation";
import useSiteMetadata from "./SiteMetadata";

const Layout = ({ location, children }) => {
  const { title, description, siteUrl } = useSiteMetadata();
  return (
    <div className="site-wrapper">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content="/images/collab-logo.svg" />

        <link
          rel="icon"
          type="image/png"
          href="images/logo192.png"
          sizes="192x192"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}${location.pathname}`} />
        <meta property="og:image" content="/images/collab-logo.svg" />
        <meta
          property="og:image:secure_url"
          content="/images/collab-logo.svg"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/images/collab-logo.svg" />
      </Helmet>
      <header className="site-header">
        <div className="site-title">
          <Link to="/">{title}</Link>
        </div>
        <Navigation />
      </header>
      <div>{children}</div>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Collab Sauce</p>
      </footer>
    </div>
  );
};

export default Layout;
