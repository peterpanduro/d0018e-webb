import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../css/Login.css';
import { registerUser } from '../functions/api'

function RegisterProfile() {

    useEffect(() => {
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkCookie = () => {
        if (Cookies.get("jwt")) {
            window.location.assign("/");
        }
    }

    const updateName = e => {
        setName(e.target.value)
    }

    const updateEmail = e => {
        setEmail(e.target.value)
    }

    const updatePassword = e => {
        setPassword(e.target.value)
    }

    const registerProfile = e => {
        e.preventDefault();
        registerUser(name, email, password, (status, json) => {
            if (status === 200) {

            } else {
                // TODO Show error to user
            }
            console.log(json);
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
                        <input type="submit" value="Skapa konto"></input>
                    </form> 
                </div>
            </div>
        </div>
  );    
}

export default RegisterProfile;