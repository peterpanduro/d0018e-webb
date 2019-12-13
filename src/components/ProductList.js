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
                        price: product.Price,
                        discountPrice: product.DiscountPrice,
                        url: product.url,
                        caption: product.caption,
                        stock: product.Stock
                    }}} className="BoxLink"></Link>
                    <ul>
                        <li>
                        {((price, discountprice) => {
                            if(price !== discountprice)
                            {
                                return <div>save {Math.trunc(100 -(discountprice / price) * 100)}%!<br/><strike>{price}kr</strike> {discountprice}kr</div>;
                            }
                            else
                            {
                              return <div>{price}kr</div>
                            }
                        })(product.Price, product.DiscountPrice)}
                        </li>
                        <img src={product.url} alt={product.caption}></img><br/>
                        <li>{product.Name}</li>
                        <li>Lagerstatus: {product.Stock}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}