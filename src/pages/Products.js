import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import '../css/Products.css';
import Categories from '../components/CategoryList';
import ProductList from '../components/ProductList';
import { getProducts, getUser} from '../functions/api'
import Cookies from 'js-cookie';

export default function Products(props) {

  useEffect(() => {
    fetchProducts(props.location.search);
  }, [props.location.search]);

  useEffect(() => {
    fetchUser();
  }, []);

  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [isAdmin, setAdmin] = useState(false);

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
  
  const fetchUser = () => {
    getUser((Cookies.get("jwt")), (status, data)=> {
      if (status === 200) {
          if(data.Privilege > 0) {
            setAdmin(true);
          }
      }
    })    
}

const showEditButton = () => {
  if (isAdmin && true) {
    return (
      <Link to={`/addproduct`}>
        <button type = "button">
            Lägg till produkt
        </button>
      </Link>
    )
  }
}

const adminButtonClicked = e => {
  e.preventDefault();
  history.push('/admin')
}

const getAdminButton = () => {
  if (isAdmin) {
    return (
      <button onClick={adminButtonClicked}>Handle orders</button>
    )
  }
}

  return (
      <div className="products-parent">
        <ul>
        {getAdminButton()}
        {showEditButton()}
        </ul>
        <br/>
        <Categories reloadProducts={fetchProducts}/><br/>
        <div className = "products-container">
            <div id = "button2">
            </div>
          <div className = "border">
            <p>Sweet merch</p>
          </div>
          <ProductList products={products}/><br/>
        </div>
      </div>
  )
};