import React from 'react';

const CartStateContext = React.createContext([]);
const CartDispatchContext = React.createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            var cart = state.cart;
            cart.push(action.content);
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