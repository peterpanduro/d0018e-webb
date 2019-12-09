import React from 'react';
import './SearchBox.css';


function SearchBox() {
  return (
    <div className = 'SearchBox'>
        <div className = "search-container">
            <form action ="google.com">
                <input type="text" placeholder="Sök produkt.." name="search"></input>
            </form>
        </div>
    </div>
  );
}

export default SearchBox;