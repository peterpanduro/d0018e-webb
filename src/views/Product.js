import React, {Component} from 'react';

class Product extends Component{
  
constructor() {
  super();
    this.state = {
        name: "",
        description: ""
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
        this.setState({name: product.name, description: product.description})
      }
  }

  fetchProduct = (id) => {
    const query = `${process.env.REACT_APP_API_HOST}/product/${id}`;
    fetch(query).then(results => {
      return results.json();
    }).then(data => {
      const p = data[0];
      console.log(p);
      this.setState({name: p.Name, description: p.Description});
    })
  }

  render() {
    return (
      <div className="product">
          <h1>{this.state.name}</h1>
          <p>{this.state.description}</p>
      </div>
    );
  }
}

export default Product;