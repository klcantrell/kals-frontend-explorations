import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

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
        file(name: { eq: "cloud" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <Img
          fluid={data.file.childImageSharp.fluid}
          style={{ maxHeight: '400vh' }}
        />
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
      </div>
    )}
  ></StaticQuery>
);

Layout2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout2;
