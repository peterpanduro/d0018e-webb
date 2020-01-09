import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Img from 'react-image'
import '../css/Product.css';
import CommentList from '../components/CommentList';
import { getProduct, getUser } from '../functions/api'
import Spinner from '../components/Spinner'
import { useCartDispatch } from '../AppContext'
import Cookies from 'js-cookie';

export default function Product(props) {
  
  const cartDispatch = useCartDispatch();


  useEffect(() => {
    fetchProduct(props.match.params.product_id);
    fetchUser();
  }, [props.match.params.product_id]);

  

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [imgURL, setImgURL] = useState("");
  const [imgCaption, setImgCaption] = useState("");

  const [numberOfItems, setNumberOfItems] = useState(1);
  const [isAdmin, setAdmin] = useState(false);

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


  const addItemInCart = e => {
    e.preventDefault();
    cartDispatch({type: 'add', content: {name, id, numberOfItems}});
  }

  const showPrice = () => {
    let priceText;
    if(price !== discountPrice)
    {
    priceText = <div><h2>save {Math.trunc(100 -(discountPrice / price) * 100)}%!</h2><h2><strike>{price}kr</strike></h2><h1>{discountPrice}kr</h1></div>;
    }
    else
    {
      priceText = <div><h2>{price}kr</h2></div>
    }
    return priceText;
  }

  const fetchUser = () => {
    getUser((Cookies.get("jwt")), (status, data)=> {
      if (status === 200) {
          if(data.Privilege > 0) {
            setAdmin(true);
          }
      } else {
          console.log({status, data});
          alert("Check console");          
      }
    })    
}

const showEditButton = () => {
  if (isAdmin&& id!==0) {
    return (
      <Link to={`/editproduct/${id}`}>
        <button type = "button">
            Redigera produkt
        </button>
      </Link>
    )
  }
}



    return (
      <div className="product">
          <div className="productInfo">
            <div className="images">
              <div className="mainImage">
                <Img src={imgURL} alt={imgCaption} loader={<Spinner />} unloader={<img alt="" src={require('../no_img.png')} />} />
              </div>
            </div>
            <div className="productInfoText">
              {showPrice()}
              <h2>{name}</h2>
              <p>{description}</p>
              <div className="addToCart">
                <input className='addToCartButton' type='button' value='Lägg i kundkorgen' onClick={addItemInCart}/>
                <div className="numberOfItems">
                  <input type='button' value='-' onClick={decreaseNumberOfItems}/>
                  <input type='text' value={numberOfItems} readOnly />
                  <input type='button' value='+' onClick={increaseNumberOfItems} />
                </div>
              </div>
              <div id = "button2">
                {showEditButton()}
              </div>
            </div>
          </div>
          <CommentList product_id={id} isAdmin={isAdmin}/>
          
      </div>
    );
}

