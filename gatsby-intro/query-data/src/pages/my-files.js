import React from 'react';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import { rhythm } from '../utils/typography';
import Layout from '../components/layout';

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1
          className={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={`${node.id}-${node.frontmatter.title}`}>
            <h3
              className={css`
                margin-bottom: ${rhythm(1/4)}
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                className={css`
                  color: #bbb;
                `}
              >
                - {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  );   
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
          }
          timeToRead
          excerpt
          html
        }
      }
    }
  }
`;
