import React from 'react';
import './Login.css';



function RegisterProfile() {
  return (
    <div className="RegisterProfile">

      <div className = "container">
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
                    
                    <form action="www.google.com">
                        <h3>Namn</h3>
                        <input type="text" name="Name"></input>
                        <h3>E-post address</h3>
                        <input type="text" name="Email"></input>
                        
                        <h3>Lösenord</h3>
                        <input type="text" name="Password"></input>
  
                        <input type="submit" value="Skapa konto"></input>
                    </form> 


                </div>
            </div>

            
        </div>
    
    </div>
  );    
}

export default RegisterProfile;