import React, {Component} from 'react';
import '../css/ProductList.css';


class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }

    render() {
        return (
            <div className="hej">
                <div className="hej2">
                {this.props.products}
                </div>
            </div>
        )
    }



}
export default ProductList;