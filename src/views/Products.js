import React from 'react';
import Categories from './components/CategoryList';
import ProductList from './components/ProductList';
import './Products.css';


function Products() {
  return (
    <div className="Products">
      <br/>
      
      <Categories/><br/>
      <div className = "container2">
        <div className = "border">

          <p>Populära varor</p>
        </div>
        <ProductList/><br/>
      </div>
    </div>
  );
}

export default Products;