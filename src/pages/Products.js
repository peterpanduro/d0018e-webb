import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import '../css/Products.css';
import Categories from '../components/CategoryList';
import ProductList from '../components/ProductList';
import { getProducts } from '../functions/api'

export default function Products(props) {

  useEffect(() => {
    fetchProducts(props.location.search);
  }, [props.location.search]);

  const [products, setProducts] = useState([]);

  const fetchProducts = (q = undefined) => {
    const query = queryString.parse(q);
    const key = Object.keys(query)[0];
    const searchQuery = q ? q : (key ? `?${key}=${query[key]}` : "");
    getProducts(searchQuery, (status, data) => {
      if (status === 200) {
        setProducts(data);
      } else {
        console.log(data);
        alert(`Status: ${status}\nDescription: ${data.description}`);
      }
    })
  }

  return (
      <div className="products-parent">
        <br/>
        <Categories reloadProducts={fetchProducts}/><br/>
        <div className = "products-container">
          <div className = "border">
            <p>Sweet merch</p>
          </div>
          <ProductList products={products}/><br/>
        </div>
      </div>
  )
};