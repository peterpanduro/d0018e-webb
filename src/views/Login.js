import React, {Component} from 'react';
import './Login.css'
import Cookies from 'js-cookie';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.handler = this.handler.bind(this);
    }

    submitHandler = e => {
        this.handler(e); 
     }

    updateEmail = e => {
        this.setState({email: e.target.value});
    }

    updatePassword = e => {
        this.setState({password: e.target.value});  
    }

    async handler(e) {
        e.preventDefault();
        fetch('http://api.d0018e.pndro.se/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'email': this.state.email,
                'password': this.state.password
            }
        }).then(response => {
            response.json().then(json => {
                if (response.status == "200") {
                    Cookies.set('email', this.state.email,{expires: 30});
                    Cookies.set('password', this.state.password,{expires: 30});
                    Cookies.set('jwt', json.jwt, {expires: 30});
                    //window.location.assign("/");
                    this.forceUpdate();
                } else {
                    console.log ("ajdo");
                    // TODO: Show someting to the user
                }
            })
        })
    }

    render() {
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
                        <form onSubmit={this.handler}>
                            <h3>E-post address</h3>
                            <input type="text" onChange={this.updateEmail}></input>
                            <h3>Lösenord</h3>
                            <input type="password" onChange={this.updatePassword}></input>
                            <input type="submit" value="Logga in"></input>
                        </form> 
                    </div>
                </div>  
            </div>
        );
    }
}
export default Login;

