import React from 'react';
import Categories from './components/Categories';
import ProductList from './components/ProductList';


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