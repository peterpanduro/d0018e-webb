import React, {Component} from 'react';
import Categories from './components/CategoryList';
import ProductList from './components/ProductList';
import './Products.css';

class Products extends Component{
  constructor() {
    super();
    this.state = {
        category_id: 0
    };
}

componentDidMount() {
  //const { match: { params } } = this.props;
  // this.setState({category_id: params.category_id}); // console.log(params.category_id)
}

  render() {
    //const { match: { params } } = this.props;
    //console.log(this.state.category_id);
    return (
      <div className="Products">
        <br/>
        
        <Categories/><br/>
        <div className = "container2">
          <div className = "border">
            <p>Populära varor</p>
          </div>
          <ProductList/><br/>
        </div>
      </div>
    );
  }
}

export default Products;