import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './views/Home'
import Products from './views/Products'
import RegisterProfile from './views/RegisterProfile'
import Header from './views/components/Header'
import Product from './views/Product'
import Login from './views/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className ="Background">
          <div className = "Content">
            <Switch>
              <Route exact path="/products/category/:category_id" component={Products} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:product_id" component={Product} />
              <Route exact path="/" component={Home} />
              <Route exact path ="/login" component={Login} />
              <Route exact path ="/register" component={RegisterProfile} />
            </Switch>
          </div>
        </div>           
      </div>
    </Router>
  );
}

export default App;
