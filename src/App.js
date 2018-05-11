import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    input: "/* add your jsx here */",
    output: "",
    err: ""
  };

  update = e => {
    let code = e.target.value;
    try {
      this.setState({
        output: window.Babel.transform(code, { presets: ["es2015", "react"] })
          .code,
        err: ""
      });
    } catch (err) {
      this.setState({
        err: err.message
      });
    }
  };
  render() {
    const { err, input, output } = this.state;
    return (
      <div>
        <div className="container">
          <header>{err}</header>
          <textarea onChange={this.update} defaultValue={input} />
          <pre>{output}</pre>
        </div>
      </div>
    );
  }
}

export default App;
