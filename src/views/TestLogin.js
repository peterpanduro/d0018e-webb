import React, {Component} from 'react';

class TestLogin extends Component {
    constructor(){
        super();
        this.state = {
          testlogin: [],
        };
      }

    async componentDidMount() {
            fetch('http://api.d0018e.pndro.se/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'email': 'larpet-5@student.ltu.se',
                    'password': 'gRoot'
                }
            }).then(response => {
                response.json().then(json => {
                    console.log(json);
                    console.log(response.status);
                })
            })
    }
  
    render() {
      return ( 
        <div className = "TestLogin">
        </div>
      )
  }       
}

export default TestLogin;
