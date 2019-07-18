import React from 'react';
import Layout from '../../components/layout2';
import Greeting from '../../components/greeting';

import cloud from '../../images/cloud.png';

const About = ({ location }) => (
  <Layout location={location}>
    <div>
      <h1>About Page</h1>
      <img style={{ width: '150px' }} src={cloud} alt="cloud" />
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
