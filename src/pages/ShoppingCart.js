import React from 'react';
import { useCart } from '../AppContext';

export default function ShoppingCart() {

  const [cartState, cartDispatch] = useCart();

  const buyButtonPressed = e => {
    e.preventDefault();
    alert("You pressed the buy button")
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
      <h1>Kundkorg</h1>
      {cartState.cart.map(item => (
        <div key={item.id}>
          <p>{item.numberOfItems} st. {item.name}</p>
          <button onClick={e => removeProduct(e, item)}>Remove item</button>
        </div>
      ))}
      <button onClick={buyButtonPressed}>Köp</button>
    </div>
  );
}