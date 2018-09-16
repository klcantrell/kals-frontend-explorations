import React from 'react';

const Link = ({ active, children, handleClick }) => {
  const styles = {
    link: {
      margin: 10,
    },
  };

  return active ? (
    <span style={styles.link}>{children}</span>
  ) : (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        handleClick();
      }}
      style={styles.link}
    >
      {children}
    </a>
  );
};

export default Link;
