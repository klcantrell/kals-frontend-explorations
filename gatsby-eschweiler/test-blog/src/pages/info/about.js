import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout2';
import Greeting from '../../components/greeting';
import cloud from '../../images/cloud.png';

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto 12px auto;
`;

const Avatar = styled.img`
  flex: 0 0 96px;
  width: 96px;
  margin: 0;
`;

const Description = styled.div`
  flex: 1;
  margin-left: 18px;
  padding: 12px;
`;

const Username = styled.div`
  margin: 0 0 12px 0;
`;

const Excerpt = styled.p`
  margin: 0;
`;

const User = ({ avatar, username, excerpt }) => (
  <StyledUser>
    <Avatar src={avatar} />
    <Description>
      <Username>{username}</Username>
      <Excerpt>{excerpt}</Excerpt>
    </Description>
  </StyledUser>
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
