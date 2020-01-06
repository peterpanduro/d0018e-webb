import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUser } from '../functions/api'
import '../css/Account.css'


export default function EditProfile() {

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
        <div className = "EditProfile">
            <h2>Mina sidor</h2>
            <div className = "container">
                <div className = "border">
                    <p>Uppdatera profil</p>
                </div>
                <ul>
                    <li><strong>Namn och Email-adress:</strong></li><br/>
                    <li>{user.Name}</li><br/>
                    <li>{user.Email}</li>
                </ul>
                <div className = "edit">
                    <input type= 'text' placeholder='Namn'></input>
                    <input type= 'text' placeholder='Email-adress'></input>
                    <input type= 'password' placeholder='Lösenord'></input>
                    <input type= 'submit' value ='Uppdatera profil'></input>
                </div>
            </div>
        </div>
    )
}