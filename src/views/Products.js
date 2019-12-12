import React, {Component} from 'react';
import Categories from './components/CategoryList';
import ProductList from './components/ProductList';
import './Products.css';
import queryString from 'query-string';
import { Link } from 'react-router-dom';


class Products extends Component{
  constructor() {
    super();
    this.state = {
        products: []
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const key = Object.keys(query)[0];
    const searchQuery = key ? `?${key}=${query[key]}` : "";
    this.fetchProducts(searchQuery);
  }

  fetchProducts = (append) => {
    const query = `http://api.d0018e.pndro.se/products${append}`;
    const method = 'GET';
    let config = {
      method
    };
    fetch(query, config).then(results => {
      return results.json();
    }).then(data => {
      let products = data.map((product) => {
        return(
          <div className="productItem" key ={product.ID}>
              <Link to={{pathname: `/products/${product.ID}`, product: {
                name: product.Name, 
                description: product.Description,
              }}} className="BoxLink"></Link>
              <ul>
                  <li>{product.Name}</li>
                  <li>Pris: {product.Price}</li>
                  <li>Lagerstatus: {product.Stock}</li>
                  <li>Kategori: {product.Category}</li>
              </ul>
          </div>
        )
      })
      this.setState({products: products});
    })
  }

  render() {
    return (
      <div className="Products">
        <br/>
        <Categories/><br/>
        <div className = "container2">
          <div className = "border">
            <p>Populära varor</p>
          </div>
          <ProductList products={this.state.products}/><br/>
        </div>
      </div>
    );
  }
}

export default Products;