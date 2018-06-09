import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from './Link';

class FilterLink extends Component {

  render() {
    const {filter, currentFilter, filterTodos} = this.props;

    return (
      <Link
        active={filter === currentFilter}
        handleClick={() => filterTodos(filter)}
      >
        {this.props.children}
      </Link>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentFilter: state.visibilityFilter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterTodos: filter => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter,
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);