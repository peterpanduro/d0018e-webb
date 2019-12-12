import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './css/App.css';
import Home from './pages/Home'
import Products from './pages/Products'
import RegisterProfile from './pages/RegisterProfile'
import Header from './components/Header'
import Product from './pages/Product'
import Login from './pages/Login'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className ="Background">
          <div className = "Content">
            <Switch>
              <Route exact path="/" component={Products} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:product_id" component={Product} />
              <Route exact path ="/login" component={Login} />
              <Route exact path ="/register" component={RegisterProfile} />
            </Switch>
          </div>
        </div>           
      </div>
    </Router>
  );
}