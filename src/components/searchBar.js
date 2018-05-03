import React from "react";

function SearchBar(props) {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search..."
        value={props.userQuery}
        onChange={props.onInputChange}
      />
      <label>
        <input
          type="checkbox"
          checked={props.inStockOnly}
          onChange={props.onCheckboxChange}
        />
        In Stock Only
      </label>
    </div>
  );
}

export default SearchBar;
