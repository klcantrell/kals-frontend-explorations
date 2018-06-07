import React from 'react';

const FilterLink = ({ filter, currentFilter, children, handleFilter }) => {
  const styles = {
    link: {
      margin: 10,
    },
  };

  const handleClick = ({ event, filter }) => {
    event.preventDefault();
    handleFilter(filter);
  };

  return filter == currentFilter ? (
    <span style={styles.link}>{children}</span>
  ) : (
    <a
      href="#"
      onClick={event => handleClick({ event, filter })}
      style={styles.link}
    >
      {children}
    </a>
  );
};

export default FilterLink;
