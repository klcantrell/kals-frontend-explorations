import React from "react";

class App extends React.Component {
  state = {
    txt: "this is the state text"
  };

  update = e => {
    this.setState({ txt: e.target.value });
  };

  render() {
    return (
      <div>
        <Widget update={this.update} />
        <h1>{this.state.txt}</h1>
      </div>
    );
  }
}

const Widget = props => <input onChange={props.update} />;

export default App;
