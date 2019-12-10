import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './views/Home'
import Products from './views/Products'
import Login from './views/Login'
import RegisterProfile from './views/RegisterProfile'
import SearchBox from './views/components/SearchBox'


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="Navbar">
              <ul>
                <li><SearchBox/></li>
                <li>
                  <Link to="/">Startsida</Link>
                </li>
                <li>
                  <Link to="/products">Produkter</Link>
                </li>
                <li>
                  <Link to="/login">Logga in</Link>
                </li>
                <li>
                  <Link to="/register">Registrera profil</Link>
                </li>
              
            </ul>
          </nav>
          
        </header>
        <body>
          <div className ="Background">
            <div className = "Content">

              <Switch>
                <Route exact path="/products">
                  <Products />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path ="/login">
                  <Login />
                </Route>
                <Route exact path ="/register">
                  <RegisterProfile />
                </Route> 
                <Route exact path ="/category/:id">
                    <RegisterProfile />
                </Route>
              </Switch>
            </div>
          </div>

           
        </body>
      </div>
    </Router>
  );
}

export default App;
