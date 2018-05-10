import React from "react";

class App extends React.Component {
  state = { items: [], filter: undefined };
  filter = e => {
    this.setState({ filter: e.target.value });
  };

  componentWillMount() {
    fetch("https://swapi.co/api/people/?format=json")
      .then(response => response.json())
      .then(({ results: items }) => this.setState({ items }));
  }

  render() {
    let { items, filter } = this.state;
    if (filter) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return (
      <div>
        <input type="text" onChange={this.filter} />
        <div>{items.map(item => <Person key={item.name} person={item} />)}</div>
      </div>
    );
  }
}

const Person = props => <h4>{props.person.name}</h4>;

export default App;
