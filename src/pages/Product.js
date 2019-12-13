import React, {Component} from 'react';
import '../css/Product.css';

class Product extends Component{
  
constructor() {
  super();
    this.state = {
        name: "",
        description: "",
        price: 0,
        discountPrice: 0,
        imgURL: "",
        imgCaption: ""
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
        this.setState({name: product.name, description: product.description, price: product.price, discountPrice: product.discountPrice, imgURL: product.url, imgCaption: product.caption})
      }
  }

  fetchProduct = (id) => {
    const query = `${process.env.REACT_APP_API_HOST}/product/${id}`;
    fetch(query).then(results => {
      return results.json();
    }).then(data => {
      const p = data[0];
      console.log(p);
      this.setState({name: p.Name, description: p.Description, price: p.Price, discountPrice: p.DiscountPrice,imgURL: p.url, imgCaption: p.caption});
    })
  }

  render() {
    console.log(this.state);

    let priceText;

    if(this.state.price !== this.state.discountPrice)
    {
    priceText = <div><h2>save {Math.trunc(100 -(this.state.discountPrice / this.state.price) * 100)}%!</h2><br/><h1><strike>{this.state.price}kr</strike><br/>{this.state.discountPrice}kr</h1></div>;
    }
    else
    {
      priceText = <div><h1>{this.state.price}kr</h1></div>
    }

    return (


      <div className="product">
          <img src={this.state.imgURL} alt={this.state.imgCaption}></img>
          <div className="text-container">
            {priceText}
            <h2>{this.state.name}</h2>
            <p>{ this.state.description}</p>
            <input type = 'submit' value= 'Lägg i kundkorgen'/>
          </div>
      </div>
    );
  }
}

export default Product;