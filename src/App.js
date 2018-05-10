import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = { val: 0 };
  update = () => {
    this.setState({
      val: this.state.val + 1
    });
  };
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  render() {
    console.log("render");
    return <button onClick={this.update}>{this.state.val}</button>;
  }
  componentWillUnmount() {
    console.log("componentWillUmount");
  }
}

class Wrapper extends React.Component {
  mount = () => {
    ReactDOM.render(<App />, document.getElementById("a"));
  };
  unmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("a"));
  };

  render() {
    return (
      <div>
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount}>Unmount</button>
        <div id="a" />
      </div>
    );
  }
}

export default Wrapper;
