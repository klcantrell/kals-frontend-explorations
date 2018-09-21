import React from 'react';
import { css } from 'react-emotion';
import { Link, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';
import Layout from '../components/layout';

export default ({ data }) => (
  <Layout>
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
        <Link
          to={node.fields.slug}
          className={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <h3
            className={css`
              margin-bottom: ${rhythm(1 / 4)}
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
        </Link>
      </div>
    ))}
    <div>
      <img
        src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
        alt="Group of pandas eating bamboo"
      />
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;