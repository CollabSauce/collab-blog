import React from "react";
import { Link } from "gatsby";
import ThemeChanger from "../components/themeChanger";

export default props => (
  <nav className="navigation">
    <a href="mailto:info@collabsauce.com">Contact</a>
    <ThemeChanger />
  </nav>
);
