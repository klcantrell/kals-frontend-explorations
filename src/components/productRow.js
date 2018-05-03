import React from "react";

function ProductRow(props) {
  return (
    <div className="productRow">
      <p>{props.value}</p>
    </div>
  );
}

export default ProductRow;
