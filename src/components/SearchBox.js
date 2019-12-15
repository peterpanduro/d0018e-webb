import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import '../css/SearchBox.css';


export default function SearchBox() {

  const history = useHistory();
  const [searchText, setSearchText] = useState();

  const textFieldChanged = e => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  const keyDown = e => {
    if (e.keyCode === 13) {
      // Enter
      e.preventDefault();
      setSearchText("");
      history.push(`/products?search=${searchText}`)
    }
  }

  return (
    <div className = 'SearchBox'>
        <div className = "search-container">
            <form>
                <input type="text" placeholder="Sök produkt.." value={searchText} onChange={textFieldChanged} onKeyDown={keyDown} />
            </form>
        </div>
    </div>
  );
}