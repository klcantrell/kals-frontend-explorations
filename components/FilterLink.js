import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from './Link';

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
    filterTodos: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);