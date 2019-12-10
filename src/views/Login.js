import React from 'react';
import './Login.css';


function Login() {
  return (
    <div className="Login">
        <div className = "container">
            <div className = "otherBox">
                <h1>Logga in på datamerchstore AB</h1>
                <h3>Med ett konto på datamerchstore AB kan du göra allt detta:</h3><br/>
                <ul>
                    <li>Spara din address</li>
                    <li>Snabbare checkout</li>
                    <li>Spara din kundkorg</li>
                    <li>Få sålda uppgifter</li>
                </ul>
            </div>

            <div className = "loginBox">
                <h2>Logga in</h2>
                <div className = "input-container">
                    
                    <form action="www.google.com">
                        <h3>E-post address</h3>
                        <input type="text" name="Email"></input>
                        
                        <h3>Lösenord</h3>
                        <input type="text" name="Password"></input>
  
                        <input type="submit" value="Logga in"></input>
                    </form> 


                </div>
            </div>

            
        </div>
    </div>
  );
}

export default Login;