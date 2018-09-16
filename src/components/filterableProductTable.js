import React from "react";
import SearchBar from "./searchBar";
import ProductTable from "./productTable";
import "./../App.css";

const data = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inStockOnly: false,
      userQuery: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleInput(e) {
    this.setState({
      userQuery: e.target.value
    });
  }

  handleCheckbox(e) {
    this.setState({
      inStockOnly: e.target.checked
    });
  }

  render() {
    return (
      <div className="filterableProductTable">
        <SearchBar
          inStockOnly={this.state.inStockOnly}
          userQuery={this.state.userQuery}
          onInputChange={this.handleInput}
          onCheckboxChange={this.handleCheckbox}
        />
        <ProductTable
          data={data}
          userQuery={this.state.userQuery}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

export default FilterableProductTable;
