import React from 'react';
import Layout from '../../components/layout2';
import Greeting from '../../components/greeting';
import styles from './about.module.css';
import cloud from '../../images/cloud.png';

const User = ({ avatar, username, excerpt }) => (
  <div className={styles.user}>
    <img src={avatar} className={styles.avatar} alt="avatar" />
    <div className={styles.description}>
      <h2 className={styles.username}>{username}</h2>
      <p className={styles.excerpt}>{excerpt}</p>
    </div>
  </div>
);

const About = ({ location }) => (
  <Layout location={location}>
    <div>
      <h1>About Page</h1>
      <User avatar={cloud} username="Cloud" excerpt="Dude with a big sword" />
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
