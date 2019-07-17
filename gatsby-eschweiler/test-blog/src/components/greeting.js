import React from 'react';
import PropTypes from 'prop-types';

const Greeting = ({ greeting, name }) => (
  <div style={{ color: 'teal' }}>
    <h2>
      {greeting} {name}
    </h2>
  </div>
);

Greeting.propTypes = {
  greeting: PropTypes.shape.isRequired,
  name: PropTypes.string.isRequired,
};

Greeting.defaultProps = {
  greeting: 'Hello',
  name: 'Kalalau',
};

export default Greeting;
