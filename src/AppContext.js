import React from 'react';

const CartStateContext = React.createContext([]);
const CartDispatchContext = React.createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            var cart = state.cart;
            var found = false;
            cart = cart.map(item => {
                if (item.id === action.content.id) {
                    item.numberOfItems += action.content.numberOfItems;
                    found = true;
                }
                return item;
            });
            if (!found) {
                // Product doesnt already exist in cart. Push new.
                cart.push(action.content);
            }
            return {cart};
        case 'set':
            var cart = state.cart;
            if (action.content.numberOfItems === 0) {
                cart = cart.filter(item => item.id !== action.content.id);
            } else {
                cart = cart.map(item => {
                    if (item.id === action.content.id) {
                        item.numberOfItems = action.content.numberOfItems;
                    }
                    return item;
                });
            }
            return {cart};
        default:
            throw new Error("Unhandled action type");
    }
}

const CartProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(cartReducer, {cart: []})
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    )
}

function useCartState() {
    const context = React.useContext(CartStateContext)
    if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider')
    }
    return context
}

function useCartDispatch() {
    const context = React.useContext(CartDispatchContext)
    if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider')
    }
    return context
}

function useCart() {
    return [useCartState(), useCartDispatch()];
}  

export {CartProvider, useCartState, useCartDispatch, useCart}