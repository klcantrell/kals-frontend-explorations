import React from "react";

function SearchBar(props) {
  return (
    <input
      placeholder="Search..."
      value={props.userQuery}
      className="searchBar"
    />
  );
}

export default SearchBar;
