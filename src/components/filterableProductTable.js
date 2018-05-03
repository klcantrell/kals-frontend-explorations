import React from "react";
import SearchBar from "./searchBar";
import ProductTable from "./productTable";
import ProductCategoryRow from "./productCategoryRow";
import ProductRow from "./productRow";
import "./../App.css";

const data = [1, 2, 3];

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div className="filterableProductTable">
        <SearchBar />
        <ProductTable>
          <ProductCategoryRow />
          {data.map(item => <ProductRow key={item.toString()} value={item} />)}
        </ProductTable>
      </div>
    );
  }
}

export default FilterableProductTable;
