import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './views/Home'
import Products from './views/Products'
import RegisterProfile from './views/RegisterProfile'
import Header from './views/components/Header'

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
              <Route exact path="/" component={Home} />
              <Route exact path ="/login" component={Home} />
              <Route exact path ="/register" component={RegisterProfile} />
            </Switch>
          </div>
        </div>           
      </div>
    </Router>
  );
}

export default App;
