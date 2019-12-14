import React, { useState, useEffect } from 'react';
import Img from 'react-image'
import '../css/Product.css';
import CommentList from '../components/CommentList';
import { getProduct } from '../functions/api'
import Spinner from '../components/Spinner'

export default function Product(props) {
  
  useEffect(() => {
    fetchProduct(props.match.params.product_id);
  }, [props.match.params.product_id]);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [imgURL, setImgURL] = useState("");
  const [imgCaption, setImgCaption] = useState("");

  const setState = (_id, _name, _description, _price, _discountPrice, _imgUrl, _imgCaption) => {
    setId(_id);
    setName(_name);
    setDescription(_description);
    setPrice(_price);
    setDiscountPrice(_discountPrice);
    setImgURL(_imgUrl);
    setImgCaption(_imgCaption);
  }

  const fetchProduct = (id) => {
    getProduct(id, (status, data) => {
      if (status === 200) {
        const product = data[0];
        setState(product.ID, product.Name, product.Description, product.Price, product.DiscountPrice, product.url, product.Caption);
      } else {
        console.log(data)
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
          <Img src={imgURL} alt={imgCaption} loader={<Spinner />} unloader={<img alt="" src={require('../no_img.png')} />} />
          <div className="text-container">
            {showPrice()}
            <h2>{name}</h2>
            <p>{description}</p>
            <input type = 'submit' value= 'Lägg i kundkorgen'/>
          </div>
          <p>Id: {id} </p>
          <CommentList product_id={id}/>
      </div>
    );
}