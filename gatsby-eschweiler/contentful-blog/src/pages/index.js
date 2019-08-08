/** @jsx jsx */
import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css, jsx } from '@emotion/core';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allContentfulPost.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.title || node.slug;
          return (
            <div
              key={node.slug}
              css={css`
                display: flex;
                margin-bottom: 20px;
              `}
            >
              <Img
                fluid={node.image.fluid}
                css={css`
                  flex: 25%;
                  margin-right: 1rem;
                  height: ;
                `}
              />
              <div
                css={css`
                  flex: 75%;
                `}
              >
                <h3
                  css={css`
                    margin-top: 0;
                  `}
                >
                  <Link style={{ boxShadow: `none` }} to={`/${node.slug}`}>
                    {title}
                  </Link>
                </h3>
                <small>{node.createdAt}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.description || node.subtitle,
                  }}
                />
              </div>
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      totalCount
      edges {
        node {
          createdAt
          title
          subtitle
          slug
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;
