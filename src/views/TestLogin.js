import React, {Component} from 'react';

class TestLogin extends Component {
    constructor(){
        super();
        this.state = {
          testlogin: [],
        };
      }

    async componentDidMount() {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/user/login`, {
                method: 'POST',
                headers: {
<<<<<<< HEAD
                    'email' : 'larpet-5@student.ltu.se',
                    'password' : 'Root'
                }
            });
            //this.setState({testlogin: await response.json()
            //});
        
=======
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
>>>>>>> 4a2eb2e96f9cc0f35bb5155116fe1fa2a26d802e
    }
  
    render() {
      return ( 
        <div className = "TestLogin">
        </div>
      )
  }       
}

export default TestLogin;
