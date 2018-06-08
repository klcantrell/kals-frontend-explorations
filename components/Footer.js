import React from 'react';
import FilterLink from './FilterLink';

const Footer = ({store}) => {
  return (
    <div>
      <FilterLink filter="SHOW_ALL" store={store}>Show All</FilterLink>
      <FilterLink filter="SHOW_COMPLETED" store={store}>Show Completed</FilterLink>
      <FilterLink filter="SHOW_ACTIVE" store={store}>Show Active</FilterLink>
    </div>
  );
}

export default Footer;