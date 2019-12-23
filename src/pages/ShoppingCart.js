import React from 'react';
import { useCart } from '../AppContext';

export default function ShoppingCart() {

  const [cartState, cartDispatch] = useCart();

  return (
    <div className="ShoppingCart">
       <h1>Kundkorg</h1>
      {cartState.cart.map(item => (
        <div key={item.id}>
          <p>{item.numberOfItems} st. {item.name}</p>
        </div>
      ))}
    </div>
  );
}