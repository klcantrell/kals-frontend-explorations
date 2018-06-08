import React, { Component } from 'react';
import Link from './Link';

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  filterTodos = filter => {
    this.props.store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter,
    });
  };

  render() {
    const props = this.props;
    const state = props.store.getState();

    return (
      <Link
        active={props.filter == state.visibilityFilter}
        handleClick={() => this.filterTodos(props.filter)}
      >
        {props.children}
      </Link>
    );
  }
}

export default FilterLink;