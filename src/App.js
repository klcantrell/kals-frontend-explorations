import React from "react";

/* Need to return a single element in JSX,
otherwise it's the equivalent of returning a function
and then another function */

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1> <p>Hi</p>
      </div>
    );
  }
}

export default App;
