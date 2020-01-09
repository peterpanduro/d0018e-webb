import React, {useState} from 'react';
import { useCart } from '../AppContext';
import '../css/ShoppingCart.css';
import {postOrder} from '../functions/api';
import Cookies from 'js-cookie';




export default function ShoppingCart() {
  
  const [cartState, cartDispatch] = useCart();
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  

  const buyButtonPressed = e => {
    e.preventDefault();
    if (window.confirm("sure")) {
      cartDispatch({type: 'clear'});
      // TODO: Create Order
      window.location.assign("/account/orders/:orderId")
 
    }
  }

  const removeProduct = (e, item) => {
    e.preventDefault();
    const name = item.name;
    const id = item.id;
    const numberOfItems = 0;
    cartDispatch({type: 'set', content: {name, id, numberOfItems}});
  }

  const increaseProducts = (e, item) => {
    e.preventDefault();
    const name = item.name;
    const id = item.id;
    const numberOfItems = item.numberOfItems + 1
    cartDispatch({type: 'set', content: {name, id, numberOfItems}});
  }

  const decreaseProducts = (e, item) => {
    e.preventDefault();
    const name = item.name;
    const id = item.id;
    const numberOfItems = item.numberOfItems - 1;
    cartDispatch({type: 'set', content: {name, id, numberOfItems}});
  }
  
  const addOrder = (e) => {
    e.preventDefault();
    const items = cartState.cart.map(item=> {
      const quantity = item.numberOfItems;
      const product = item.id;
      return {quantity, product}
    })
    const body = {address, zipCode, items}
    const jsonbody = JSON.stringify(body);
    postOrder(Cookies.get("jwt"), jsonbody, (status, data) =>{
      if(status == 200) {
        setAddress('');
        setZipCode('');
      } else {
        alert('retard');
        console.log(data);
      }
    })
  }

  const updateAddress = e => {
    setAddress(e.target.value)
  }

  const updateZipCode = e => {
    setZipCode(e.target.value)
  }
  
  

  return (
    <div className="ShoppingCart">
      <h1>Slutför din beställning</h1>
      <div className="p">
      <h3>Din kundkorg</h3>
        {cartState.cart.map(item => (
          <div key={item.id}>
            <p>{item.numberOfItems} st. {item.name} </p>
            <p>DataMerchStore AB &trade;</p>
            <input type='button' id = 'butt' value='-' onClick={e=>decreaseProducts(e, item)}/>
            <input type='text' id = 'texty' value={item.numberOfItems} readOnly />
            <input type='button' id= 'butt' value='+' onClick={e=>increaseProducts(e, item)} />
            <button onClick={e => removeProduct(e, item)}>X</button>
          </div>      
        ))}
      </div>
      <div className = "uppgifter">
        <h2>Fyll i uppgifter</h2>
        <form onSubmit = {addOrder}>
          Adress: <input type="text" name="rating" value={address} onChange={updateAddress}></input>
          Postnummer: <input type="text" name="rating" value={zipCode} onChange={updateZipCode}></input>
          <button>Beställ</button>
        </form>
      </div>
      <button id ="buy" onClick={buyButtonPressed}>Fortsätt</button>
    </div>
  );
}