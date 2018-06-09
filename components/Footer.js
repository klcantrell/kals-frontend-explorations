import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => {
  return (
    <div>
      <FilterLink filter="SHOW_ALL">Show All</FilterLink>
      <FilterLink filter="SHOW_COMPLETED">Show Completed</FilterLink>
      <FilterLink filter="SHOW_ACTIVE">Show Active</FilterLink>
    </div>
  );
}

export default Footer;