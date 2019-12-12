import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import '../css/Products.css';
import Categories from '../components/CategoryList';
import ProductList from '../components/ProductList';
import { getProducts } from '../functions/api'

export default function Products(props) {

useEffect(() => {
  fetchProducts();
}, []);

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    const query = queryString.parse(props.location.search);
    const key = Object.keys(query)[0];
    const searchQuery = key ? `?${key}=${query[key]}` : "";
    getProducts(searchQuery, (status, data) => {
      console.log(props.location.query)
      if (status === 200) {
        setProducts(data);
      } else {
        console.log(data);
      }
    })
  }

  return (
      <div className="products-parent">
        <br/>
        <Categories/><br/>
        <div className = "products-container">
          <div className = "border">
            <p>Sweet merch</p>
          </div>
          <ProductList products={products}/><br/>
        </div>
      </div>
  )
};