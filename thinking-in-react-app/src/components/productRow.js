import React from "react";

function ProductRow(props) {
  return (
    <div className="productRow">
      <p>{props.name}</p>
      <p>{props.price}</p>
    </div>
  );
}

export default ProductRow;
