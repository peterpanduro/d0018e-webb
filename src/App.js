import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './views/Home'
import Products from './views/Products'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="Navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Produkter</Link>
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
          </Switch>
        </body>
      </div>
    </Router>
  );
}

export default App;
