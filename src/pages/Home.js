import React from 'react';
import ProductList from '../components/ProductList';
import Categories from '../components/CategoryList';

export default function Home() {
  return (
    <div className="Home">
      <br></br>
      <Categories/>
      <ProductList />
    </div>
  );
}