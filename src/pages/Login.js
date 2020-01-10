import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../css/Login.css'
import { loginUser } from '../functions/api'

export default function Login() {

    const [_email, setEmail] = useState("");
    const [_password, setPassword] = useState("");

    const mount = () => {
        // Only runs when mounted
        checkCookie();
      
        const unmount = () => {
          // Only runs when unmounted
        }
        return unmount
    }
    useEffect(mount, [])

    const checkCookie = () => {
        const email = Cookies.get("email");
        const password = Cookies.get("password");
        const jwt = Cookies.get("jwt");
        if (jwt) {
            window.location.assign("/");
        } else if (email && password){
            login(email, password);
        }
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePassword = e => {
        setPassword(e.target.value);
    }

    const submitHandler = e => {
        if (e) {
            e.preventDefault();
        }
        login(_email, _password);
    }

    const login = (email, password) => {
        console.log({email, password});
        loginUser(email, password, (status, data) => {
            if (status === 200) {
                Cookies.set('email', email);
                Cookies.set('password', password);
                Cookies.set('jwt', data.jwt, {expires: 30});
                window.location.assign('/');
            } else {
                console.log (data);
                alert(`Status: ${status}\nDescription:${data.description}`)
            }
        })
    }

    return (  
        <div className="Login">
            <div className = "otherBox">
                <h1>Logga in på datamerchstore AB</h1>
                <h3>Med ett konto på datamerchstore AB kan du göra allt detta:</h3><br/>
                <ul>
                    <li>Spara din address</li> <br/> 
                    <li>Snabbare checkout</li><br/>
                    <li>Spara din kundkorg</li><br/>
                    <li>Få sålda uppgifter</li>
                </ul>
            </div>
            <div className = "loginBox">
                <h2>Logga in</h2>
                <div className = "input-container">
                    <form onSubmit={submitHandler}>
                        <h3>E-post address</h3>
                        <input type="text" value={_email} onChange={updateEmail}></input>
                        <h3>Lösenord</h3>
                        <input type="password" value={_password} onChange={updatePassword}></input>
                        <input type="submit" value="Logga in"></input>
                    </form> 
                </div>
            </div>  
        </div>
    );
}
