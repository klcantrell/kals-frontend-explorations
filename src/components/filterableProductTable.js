import React from "react";

class FilterableProductTable extends React.Component {
  const data = [1, 2, 3];
  render() {
    <div>
      <SearchBar />
      <ProductTable>
        <ProductCategoryRow />
        {
          data.map((item) =>
            <ProductRow key={item.toString()}
                        value={item}/>
          )
        }
      </ProductTable>
    </div>
  }
}

export default FilterableProductTable;