import React, { useEffect, useState, useContext } from 'react'
import Cookies from 'js-cookie';
import { getUser } from '../functions/api'
import { useCartState } from '../AppContext'

export default function Account() {

    const [user, setUser] = useState({});
    const cartState = useCartState();

    useEffect(() => {
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const checkCookie = () => {
        console.log({cartState})
        const jwt = Cookies.get("jwt");
        if (!jwt) {
            window.location.assign("/");
        } else {
            getUser(jwt, (status, data) => {
                if (status === 200) {
                    setUser(data);
                } else {
                    console.log({status, data});
                    alert("Check console");
                }
            })
        }
    }



    return (
        <div>
            <p>Number of items in cart: {cartState.cart.length}</p>
            <p>Account page</p>
            <p>This page will only show when user is logged in</p>
            <p>Namn: {user.Name}</p>
            <p>Email: {user.Email}</p>
        </div>
    )
}