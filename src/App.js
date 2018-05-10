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
    this.setState({ m: 2 });
  }
  render() {
    console.log("render");
    const { val, m } = this.state;
    return <button onClick={this.update}>{val * m}</button>;
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.inc = setInterval(this.update, 500);
  }
  componentWillUnmount() {
    console.log("componentWillUmount");
    clearInterval(this.inc);
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
