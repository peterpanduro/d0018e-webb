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

  const [numberOfItems, setNumberOfItems] = useState(1);

  const setNumberOfItemsText = e => {
    e.preventDefault();
    setNumberOfItems(e.target.value);
  }

  const increaseNumberOfItems = e => {
    e.preventDefault();
    setNumberOfItems(numberOfItems+1);
  }

  const decreaseNumberOfItems = e => {
    e.preventDefault();
    setNumberOfItems(numberOfItems > 1 ? numberOfItems-1 : 1);
  }

  const fetchProduct = (id) => {
    getProduct(id, (status, data) => {
      if (status === 200) {
        const {ID, Name, Description, Price, DiscountPrice, url, Caption} = data[0];
        setId(ID);
        setName(Name);
        setDescription(Description);
        setPrice(Price);
        setDiscountPrice(DiscountPrice);
        setImgURL(url);
        setImgCaption(Caption);
      } else {
        console.log(data)
        alert(data)
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
            <div className="addToCart">
              <input className='addToCartButton' type='button' value='Lägg i kundkorgen'/>
              <div className="numberOfItems">
                <input type='button' value='-' onClick={decreaseNumberOfItems}/>
                <input type='text' value={numberOfItems} readOnly />
                <input type='button' value='+' onClick={increaseNumberOfItems} />
              </div>
            </div>
          </div>
          <CommentList product_id={id}/>
      </div>
    );
}