import React, {Component} from 'react';

class Products extends Component{
  
  componentDidMount() {
      if (this.props.location.product === undefined) {
        const { match: { params } } = this.props;
        console.log("Product with id " + params.product_id + " is undefined")
      } else {
        const product = this.props.location.product;
        console.log(product);
      }
  }

  render() {
    return (
      <div className="Product">
          Product
      </div>
    );
  }
}

export default Products;