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
                    <h3>E-post address</h3>
                    <form action ="google.com">
                        <input type="text" name="namn"></input>
                    </form>
                    <h3>Lösenord</h3>
                    <form action ="google.com">
                        <input type="text" name="password"></input>
                    </form>
                </div>
            </div>

            
        </div>
    </div>
  );
}

export default Login;