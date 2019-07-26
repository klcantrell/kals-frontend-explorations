import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';

const ListLink = props => (
  <li
    style={{
      display: 'inline',
      marginRight: '1rem',
    }}
  >
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const Layout2 = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div
        className="my-background"
        style={{
          margin: '0 auto',
          maxWidth: 650,
          padding: '0 1rem',
        }}
      >
        <header style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'inline' }}>
            {data.site.siteMetadata.title} Site
          </h3>
          <ul
            style={{
              listStyle: 'none',
              float: 'right',
            }}
          >
            <ListLink to="/">Home</ListLink>
            <ListLink to="/info/about">About</ListLink>
            <ListLink to="/blog-practice">Blog</ListLink>
          </ul>
        </header>
        {children}
      </div>
    )}
  ></StaticQuery>
);

Layout2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout2;
