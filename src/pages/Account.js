import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUser } from '../functions/api'
import '../css/Account.css'



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
        <div className = "Account">
            <h2>Mina sidor</h2>
            <div className = "container">
                <div className = "border">
                    <p>Kundinformation</p>
                </div>
                <ul>
                    <li><strong>Namn och Email-adress:</strong></li><br/>
                    <li>{user.Name}</li><br/>
                    <li>{user.Email}</li>
                </ul>
                <Link to="./editprofile" className="btn btn-primary">helå</Link>
            </div>
        </div>
    )
}