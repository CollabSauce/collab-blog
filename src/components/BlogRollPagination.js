import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

export default class BlogRollPagination extends React.Component {
  render() {
    const { pageName, pageContext } = this.props;
    const { currentPage, numPages } = pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
      <div className="pagination-row">
        <div>
          {!isFirst && (
            <Link to={`${pageName}/${prevPage}`} rel="prev">
              ← Previous
            </Link>
          )}
        </div>
        <div>
          {!isLast && (
            <Link to={`${pageName}/${nextPage}`} rel="next">
              Next →
            </Link>
          )}
        </div>
      </div>
    );
  }
}

BlogRollPagination.propTypes = {
  pageName: PropTypes.string,
};
