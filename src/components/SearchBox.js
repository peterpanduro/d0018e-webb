import React from 'react';
import '../css/SearchBox.css';


export default function SearchBox() {
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