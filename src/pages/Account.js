import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { getUser } from '../functions/api'

export default function Account() {

    const [user, setUser] = useState({});

    useEffect(() => {
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const checkCookie = () => {
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
            <p>Account page</p>
            <p>This page will only show when user is logged in</p>
            <p>Namn: {user.Name}</p>
            <p>Email: {user.Email}</p>
        </div>
    )
}