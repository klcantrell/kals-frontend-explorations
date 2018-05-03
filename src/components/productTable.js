import React from "react";
import ProductCategoryRow from "./productCategoryRow";
import ProductRow from "./productRow";

function ProductTable(props) {
  const categories = Array.from(
    props.data.reduce((acc, item) => {
      !acc.has(item.category) && acc.add(item.category);
      return acc;
    }, new Set())
  );

  return (
    <div className="productTable">
      <div className="productTable__header">
        <h5>Name</h5>
        <h5>Price</h5>
      </div>
      {categories.map((category, idx) => (
        <div key={idx}>
          <ProductCategoryRow value={category} />
          {props.data
            .filter(item => {
              return item.category === category;
            })
            .map((item, idx) => (
              <ProductRow
                key={`item-${idx}`}
                name={item.name}
                price={item.price}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default ProductTable;
