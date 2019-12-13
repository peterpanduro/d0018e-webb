import React from 'react';
import { Link } from 'react-router-dom'
import '../css/ProductList.css';


export default function ProductList(props) {
    return (
        <div>
            {props.products.map(product => (
                <div className="productItem" key ={product.ID}>
                    <Link to={{pathname: `/products/${product.ID}`, product: {
                        name: product.Name, 
                        description: product.Description,
                    }}} className="BoxLink"></Link>
                    <ul>
                        <li>
                        <img src= "https://www.kingarthurflour.com/sites/default/files/recipe_legacy/325-3-large.jpg" alt="product"></img><br/>
                        {product.Price} kr
                        </li>
                        <li>{product.Name}</li>
                        <li>Lagerstatus: {product.Stock}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}