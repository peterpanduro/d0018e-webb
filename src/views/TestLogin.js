import React, {Component} from 'react';

class TestLogin extends Component {
    constructor(){
        super();
        this.state = {
          testlogin: [],
        };
      }

    async componentDidMount() {
<<<<<<< HEAD
            fetch('http://api.d0018e.pndro.se/user/login', {
=======
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/user/login`, {
>>>>>>> 5f3d229895b5cb6616cc3a00774d8d209c6b93c9
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
