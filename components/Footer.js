import React from 'react';
import FilterLink from './FilterLink';

const Footer = ({filter, filterTodos}) => {
  return (
    <div>
      <FilterLink
        filter="SHOW_ALL"
        currentFilter={filter}
        handleFilter={filterTodos}
      >
        Show All
      </FilterLink>
      <FilterLink
        filter="SHOW_COMPLETED"
        currentFilter={filter}
        handleFilter={filterTodos}
      >
        Show Completed
      </FilterLink>
      <FilterLink
        filter="SHOW_ACTIVE"
        currentFilter={filter}
        handleFilter={filterTodos}
      >
        Show Active
      </FilterLink>
    </div>
  )
}

export default Footer;