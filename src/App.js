import React from "react";

class App extends React.Component {
  state = { currentEvent: "---" };

  update = e => {
    this.setState({ currentEvent: e.type });
  };

  render() {
    return (
      <div>
        <textarea
          cols="30"
          rows="10"
          onKeyPress={this.update}
          onCut={this.update}
          onCopy={this.update}
          onPaste={this.update}
          onBlur={this.update}
          onFocus={this.update}
          onDoubleClick={this.update}
          onTouchMove={this.update}
          onTouchEnd={this.update}
          onTouchStart={this.update}
        />
        <h1>{this.state.currentEvent}</h1>
      </div>
    );
  }
}

export default App;
