import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { getUser, updateUser} from '../functions/api'
import '../css/Account.css'
import { useHistory } from 'react-router-dom';


export default function EditProfile() {

    const history = useHistory();
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

     useEffect(() => {
        checkCookie();
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

    const updateName = e => {
        setName(e.target.value)
    }

    const updateEmail = e => {
        setEmail(e.target.value)
    }

    const updateProfile = e => {
        e.preventDefault();
        updateUser(Cookies.get("jwt"), name, email, (status, data) => {
            if (status === 200) {
                Cookies.set('email', email);
                history.push("/account");
            } else {
                console.log(data);
                alert(`Status: ${status}\nDescription: ${data.description}`);
            }
        })
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
                    <form onSubmit={updateProfile}>
                        <input type="text" placeholder="Namn" name="Name" value={name} onChange={updateName}></input>
                        <input type="text" placeholder="Email-adress"name="Email" value={email} onChange={updateEmail}></input>
                        <input type= 'password' placeholder='Lösenord'></input>
                        <input type="submit" value="Uppdatera profil"></input>
                    </form> 
                </div>
            </div>
        </div>
    )
}