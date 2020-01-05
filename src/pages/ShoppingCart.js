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

  return (
    <div className="ShoppingCart">
      <h1>Slutför din beställning</h1>
      <div className="p">
      <h3>Din kundkorg</h3>
        {cartState.cart.map(item => (
          <div key={item.id}>
            <p>{item.numberOfItems} st. {item.name} </p>
            <p>DataMerchStore AB &trade;</p>
            <button onClick={e => removeProduct(e, item)}>X</button>
          </div>      
        ))}
      </div>
      <button id ="buy" onClick={buyButtonPressed}>Fortsätt</button>
    </div>
  );
}