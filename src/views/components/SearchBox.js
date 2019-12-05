import React from 'react';
import './SearchBox.css';


function SearchBox() {
  return (
    <div className = 'SearchBox'>
        <div class = "search-container">
            <form action ="google.com">
                <input type="text" placeholder="Sök produkt.." name="search"></input>
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </div>
    </div>
  );
}

export default SearchBox;