import React from 'react';
import ProductList from './components/ProductList';
import Categories from './components/CategoryList';

function Home() {
  return (
    <div className="Home">
      <br></br>
      <Categories/>
      <ProductList />
      
    </div>
  );
}

export default Home;