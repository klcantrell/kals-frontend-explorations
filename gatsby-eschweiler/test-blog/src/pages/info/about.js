import React from 'react';
import { Link } from 'gatsby';
import Layout from '../../components/layout';
import Greeting from '../../components/greeting';

const About = ({ location }) => (
  <Layout location={location}>
    <div>
      <h1>About Page</h1>
      <Link to="/">Home</Link>
      <p>
        Consequat sunt minim enim mollit esse non elit consectetur esse esse
        labore eiusmod. Nostrud ullamco nisi dolore reprehenderit adipisicing eu
        est aute duis esse minim fugiat aliquip laboris. Laborum qui consectetur
        magna ea.
      </p>
      <Greeting greeting="Sup" name="my dude" />
    </div>
  </Layout>
);

export default About;
