import React, {Component} from 'react';
import Categories from './components/CategoryList';
import ProductList from './components/ProductList';
import './Products.css';
import queryString from 'query-string';


class Products extends Component{
  constructor() {
    super();
    this.state = {
        products: []
    };
  }

  componentDidMount() {
    // const { match: { params } } = this.props;
    // this.setState({category_id: params.category_id});

    const query = queryString.parse(this.props.location.search);
    console.log(query.search);

    this.fetchProducts()
  }

  fetchProducts = (append) => {
    append = append === undefined ? "" : append
    fetch(process.env.REACT_APP_API_HOST + '/products' + append).then(results => {
      return results.json();
    }).then(data => {
      let products = data.map((product) => {
        return(
          <div className="productItem" key ={product.ID}>
              <a href={"/products/" + product.ID}><span className="BoxLink"></span></a>
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