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
                    'e-mail' : 'magda',
                    'password' : 'hemligtlosen'
                }
            });
            this.setState({testlogin: await response.json()
            });
        
    }
  
    render() {
      return ( 
        <div className = "TestLogin">
            <h1>yoyoyo</h1>
            <h1>{this.state.testlogin}</h1>
        </div>
      )
    
  }
        
}

export default TestLogin;
