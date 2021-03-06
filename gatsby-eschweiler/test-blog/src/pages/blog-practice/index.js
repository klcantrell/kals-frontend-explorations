import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Layout from '../../components/layout2';

const Headline = styled.h1`
  display: inline-block;
  color: plum;
`;

export default ({ data }) => (
  <Layout>
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content="Free Web Tutorials" />
        <meta name="keywords" content="React, JavaScript" />
        <meta name="author" content="Kal" />
        <title>My Blog Posts Overview</title>
      </Helmet>
      <Headline>My Blog Posts</Headline>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges
        .map(({ node }) => (
          <div key={node.id}>
            <hr />
            <h3>{node.frontmatter.title}</h3>
            <p>
              <i>{node.frontmatter.date}</i>
            </p>
            <p>{node.excerpt}</p>
          </div>
        ))
        .reverse()}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;
