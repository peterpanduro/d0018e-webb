import React from 'react';
import { useCart } from '../AppContext';
import '../css/ShoppingCart.css';



export default function ShoppingCart() {
  
  const [cartState, cartDispatch] = useCart();
  

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
          Adress: <input type = 'text'></input>
          Postnummer: <input type = 'text'></input>
        </div>
      <button id ="buy" onClick={buyButtonPressed}>Fortsätt</button>
    </div>
  );
}