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
      query: ""
    };
  }

  render() {
    return (
      <div className="filterableProductTable">
        <SearchBar userQuery={this.state.userQuery} />
        <ProductTable data={data} />
      </div>
    );
  }
}

export default FilterableProductTable;
