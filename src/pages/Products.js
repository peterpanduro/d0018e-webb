import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import '../css/Products.css';
import Categories from '../components/CategoryList';
import ProductList from '../components/ProductList';
import { getProducts } from '../functions/api'

export default function Products(props) {

useEffect(() => {
  fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    console.log("products are being fetched")
    const query = queryString.parse(props.location.search);
    const key = Object.keys(query)[0];
    const searchQuery = key ? `?${key}=${query[key]}` : "";
    getProducts(searchQuery, (status, data) => {
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