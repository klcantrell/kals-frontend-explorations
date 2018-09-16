import React, { Component } from 'react';
import Link from './Link';
import { connect } from 'react-redux';
import { filterTodos } from '../actionCreators';

class FilterLink extends Component {

  render() {
    const {filter, active, filterTodos} = this.props;

    return (
      <Link
        active={active}
        handleClick={filterTodos}
      >
        {this.props.children}
      </Link>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.visibilityFilter === ownProps.filter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filterTodos: () => dispatch(filterTodos(ownProps.filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);