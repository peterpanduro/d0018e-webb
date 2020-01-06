import React, { useState, useEffect } from 'react';
import Img from 'react-image'
import '../css/Product.css';
import CommentList from '../components/CommentList';
import { getProduct } from '../functions/api'
import Spinner from '../components/Spinner'
import { useCartDispatch } from '../AppContext'


export default function Product(props) {
  
  const cartDispatch = useCartDispatch();

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

    return (
      <div className="product">
          <div className="productInfo">
            <div className="images">
              <div className="mainImage">
                <Img src={imgURL} alt={imgCaption} loader={<Spinner />} unloader={<img alt="" src={require('../no_img.png')} />} />
              </div>
            </div>
            <div className="productInfoText">
              <form>
                  <label>Price: </label>
                  <input value={price} onChange={event => setPrice(event.target.value.replace(/\D/,''))}/>
                  <br/>
                  <label>Discount: </label>
                  <input value={discountPrice} onChange={event => setDiscountPrice(event.target.value.replace(/\D/,''))}/>
                  <br/>
                  <label>Name: </label>
                  <input type="text" name="name" value={name} maxlenth="20"></input>
                  <br/>
                  <label>Description: </label>
                  <input type="text" name="description" value={description} maxlength="512"></input>
                  <br/>
                  <label>Image URL: </label>
                  <input type="text" name="description" value={imgURL} maxlength="256"></input>
                  <br/>
                  <label>Image Caption: </label>
                  <input type="text" name="description" value={imgCaption} maxlength="64"></input>
              </form>
            </div>
          </div>
          <CommentList product_id={id}/>
      </div>
    );
}

