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
    const searchQuery = query.search;
    this.fetchProducts(searchQuery);
  }

  fetchProducts = (append) => {
    append = append === undefined ? "" : `?search=${append}`;
    const query = `${process.env.REACT_APP_API_HOST}/products${append}`;
    fetch(query).then(results => {
      return results.json();
    }).then(data => {
      let products = data.map((product) => {
        return(
          <div className="productItem" key ={product.ID}>
              {/* <a href={"/products/" + product.ID}><span className="BoxLink"></span></a> */}
              <Link to={{pathname: `/products/${product.ID}`, product: {
                title: "Title", 
                content: "Content",
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