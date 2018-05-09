import React from "react";
import PropTypes from "prop-types";

/* Need to return a single element in JSX,
otherwise it's the equivalent of returning a function
and then another function */

class App extends React.Component {
  render() {
    const txt = this.props.txt;
    return (
      <div>
        <h1>{txt}</h1>
      </div>
    );
  }
}

App.propTypes = {
  txt: PropTypes.string.isRequired,
  cat: PropTypes.number.isRequired
};

App.defaultProps = {
  txt: "this is the default txt"
};

export default App;
