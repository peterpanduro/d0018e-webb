import React, {Component} from 'react';
import './ProductList.css';


class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }


    componentDidMount() {
        fetch('http://localhost:3001/api/products').then(results => {
            return results.json();
        }).then(data => {
            let products = data.map((product) => {
                return(
                    <div className="productItem" key ={product.ID}>
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
            console.log("state", this.state.products);
        })
    }


    render() {
        return (
            <div className="hej">
                <div className="hej2">
                 {this.state.products}
                </div>
            </div>
        )
    }



}
export default ProductList;