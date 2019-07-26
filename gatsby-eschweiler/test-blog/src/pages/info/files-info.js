import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout2';

export default ({ data }) => (
  <Layout>
    <div>
      <h1>My Files</h1>
      <table>
        <thead>
          <tr>
            <th>relativePath</th>
            <th>prettySize</th>
            <th>extension</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(({ node: file }, index) => (
            <tr key={index}>
              <td>{file.relativePath}</td>
              <td>{file.prettySize}</td>
              <td>{file.extension}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
      edges {
        node {
          relativePath
          prettySize
          extension
        }
      }
    }
  }
`;
