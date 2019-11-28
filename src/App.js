import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './views/Home'
import Products from './views/Products'
import Login from './views/Login'
import RegisterProfile from './views/RegisterProfile'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="Navbar">
            <ul>
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
          <Switch>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path ="/login">
              <Login />
            </Route>
            <Route path ="/register">
              <RegisterProfile />
            </Route>
          </Switch>
        </body>
      </div>
    </Router>
  );
}

export default App;
