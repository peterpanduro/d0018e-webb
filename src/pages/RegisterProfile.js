import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/Login.css';
import { registerUser } from '../functions/api'

export default function RegisterProfile() {

    useEffect(() => {
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const checkCookie = () => {
        if (Cookies.get("jwt")) {
            window.location.assign("/");
        }
    }

    const updateName = e => {
        setName(e.target.value)
    }

    const updateEmail = e => {
        const value = e.target.value;
        setEmail(value);
        setEmailValid(value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)); 
        validateForm();
    }

    const updatePassword = e => {
        const value = e.target.value;
        setPassword(value);
        setPasswordValid(value.length >= 6);
        validateForm();
    }

    const validateForm = () => {
        setFormValid(emailValid && passwordValid);
    }

    const generateToken = (length = 64) => {
        const crypto = require('crypto');
        return crypto.randomBytes(length).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
    }

    const registerProfile = e => {
        e.preventDefault();
        registerUser(name, email, password, generateToken(), (status, data) => {
            if (status === 201) {
                Cookies.set('email', email);
                Cookies.set('password', password);
                history.push("/login");
            } else {
                console.log(data);
                alert(`Status: ${status}\nDescription: ${data.description}`);
            }
        })
    }

  return (
    <div className="RegisterProfile">
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
                <h2>Skapa konto</h2>
                <div className = "input-container"> 
                    <form onSubmit={registerProfile}>
                        <h3>Namn</h3>
                        <input type="text" name="Name" value={name} onChange={updateName}></input>
                        <h3>E-post address</h3>
                        <input type="text" name="Email" value={email} onChange={updateEmail}></input>
                        <h3>Lösenord</h3>
                        <input type="password" name="Password" value={password} onChange={updatePassword}></input>
                        <button type="submit" className="btn" disabled={!formValid}>Sign up</button>
                    </form> 
                </div>
            </div>
        </div>
  );    
}