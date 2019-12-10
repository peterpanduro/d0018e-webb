import React from 'react';
import './SearchBox.css';


function SearchBox() {
  return (
    <div className = 'SearchBox'>
        <div className = "search-container">
            <form action ="products">
                <input type="text" placeholder="Sök produkt.." name="search"></input>
            </form>
        </div>
    </div>
  );
}

export default SearchBox;