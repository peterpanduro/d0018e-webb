import React, {Component} from 'react';
import '../css/Product.css';

class Product extends Component{
  
constructor() {
  super();
    this.state = {
        name: "",
        description: "",
        price: "",
        discountprice: "",
        newprice: "",
        prevprice: ""
    };
  }

  componentDidMount() {
      if (this.props.location.product === undefined) {
        const { match: { params } } = this.props;
        console.log("Product with id " + params.product_id + " is undefined")
        this.fetchProduct(params.product_id);
      } else {
        const product = this.props.location.product;
        console.log(product);
        this.setState({name: product.name, description: product.description, price: product.price, discountprice: product.discountprice})
      }
  }

  fetchProduct = (id) => {
    const query = `${process.env.REACT_APP_API_HOST}/product/${id}`;
    fetch(query).then(results => {
      return results.json();
    }).then(data => {
      const p = data[0];
      console.log(p);
      this.setState({name: p.Name, description: p.Description, price: p.Price, discountprice: p.Discountprice});
    })
  }

  render() {
    return (
      <div className="product">
          <img src="https://www.kingarthurflour.com/sites/default/files/recipe_legacy/325-3-large.jpg" alt="product"></img>
          <div className="text-container">
            <h1>{this.state.price} kr</h1>
            <h2>{this.state.name}</h2>
            <p>{ this.state.description}</p>
            <input type = 'submit' value= 'Lägg i kundkorgen'/>
          </div>
      </div>
    );
  }
}

export default Product;