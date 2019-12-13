import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../css/CategoryList.css';
import { getCategories } from '../functions/api'

export default function CategoryList(props) {

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    getCategories((status, data) => {
      if (status === 200) {
        setCategories(data);
      } else {
        console.log(data);
      }
    })
  }

  return (
    <div className="Categories">
      <h2>Upptäck kategorier</h2>
      <ul>
        {categories.map(category => (
          <li key={category.ID}>
          <Link to={"/products?category=" + category.ID} onClick={() => props.reloadProducts(`?category=${category.ID}`)}>{category.Name}</Link>
        </li>
        ))}
      </ul>
    </div>
  )
}