import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../css/Login.css'
import { loginUser } from '../functions/api'

export default function Login(props) {

    useEffect(() => {
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkCookie = () => {
        if (Cookies.get("jwt")) {
            window.location.assign("/");
        }
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePassword = e => {
        setPassword(e.target.value);
    }

    const login = e => {
        e.preventDefault();
        loginUser(email, password, (status, data) => {
            if (status === 200) {
                Cookies.set('email', data.email,{expires: 30});
                Cookies.set('password', data.password,{expires: 30});
                Cookies.set('jwt', data.jwt, {expires: 30});
                props.rerend();
                window.location.assign('/');
            } else {
                console.log (data);
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
                    <form onSubmit={login}>
                        <h3>E-post address</h3>
                        <input type="text" value={email} onChange={updateEmail}></input>
                        <h3>Lösenord</h3>
                        <input type="password" value={password} onChange={updatePassword}></input>
                        <input type="submit" value="Logga in"></input>
                    </form> 
                </div>
            </div>  
        </div>
    );
}
