import React, { useState } from "react";

function Search( { searchValue, onSearch } ) {

  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" value={searchValue} onChange={(e)=>onSearch(e.target.value.toLowerCase())}/>
        <i className="search icon" />
      </div>
    </div>
  );
}

export default Search;
