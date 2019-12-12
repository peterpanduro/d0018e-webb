import React, {Component} from 'react';

class Testytest extends Component {
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
                console.log(json);
                console.log(response.status);
                console.log(this.state.email);
            })
        })
    }

    render() {
        return (
            <form onSubmit={this.handler}>
                <h1>{this.state.email}</h1>
                <h1>{this.state.password}</h1>
                <input type='text' onChange={this.updateEmail}/>
                <input type= 'text' onChange={this.updatePassword}/>
                <input type='submit'/>
            </form>
          );
    }
}
export default Testytest;

