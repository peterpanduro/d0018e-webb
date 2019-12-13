import React, { useState, useEffect } from 'react';
import '../css/Product.css';
import CommentList from '../components/CommentList';
import { getProduct, getComments } from '../functions/api'

export default function Product(props) {
  
  useEffect(() => {
    fetchProduct();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [imgURL, setImgURL] = useState("");
  const [imgCaption, setImgCaption] = useState("");
  const [comments, setComments] = useState([]);

  const setState = (_id, _name, _description, _price, _discountPrice, _imgUrl, _imgCaption) => {
    setId(_id);
    setName(_name);
    setDescription(_description);
    setPrice(_price);
    setDiscountPrice(_discountPrice);
    setImgURL(_imgUrl);
    setImgCaption(_imgCaption);
  }

  const fetchProduct = () => {
    getProduct(props.match.params.product_id, (status, data) => {
      if (status === 200) {
        const product = data[0];
        setState(product.ID, product.name, product.description, product.price, product.discountPrice, product.url, product.caption);
        console.log(product);
      } else {
        console.log(data)
        alert(`ERROR ${status}: Check console`)
      }
    })
  }

  const fetchComments = () => {
    getComments(props.match.params.product_id, (status, data) => {
      if (status === 200) {
        setComments(data);
      } else {
        console.log(data);
        alert(`ERROR ${status}: Check console`)
      }
    })
  }

  const showPrice = () => {
    let priceText;
    if(price !== discountPrice)
    {
    priceText = <div><h2>save {Math.trunc(100 -(discountPrice / price) * 100)}%!</h2><br/><h1><strike>{price}kr</strike><br/>{discountPrice}kr</h1></div>;
    }
    else
    {
      priceText = <div><h1>{price}kr</h1></div>
    }
    return priceText;
  }

    return (
      <div className="product">
          <img src={imgURL} alt={imgCaption}></img>
          <div className="text-container">
            {showPrice()}
            <h2>{name}</h2>
            <p>{description}</p>
            <input type = 'submit' value= 'Lägg i kundkorgen'/>
          </div>
          <p>Id: {id} </p>
          <CommentList comments={comments}/>
      </div>
    );
}