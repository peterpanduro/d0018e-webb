import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './css/App.css';
// import Home from './pages/Home'
import Products from './pages/Products'
import RegisterProfile from './pages/RegisterProfile'
import Header from './components/Header'
import Product from './pages/Product'
import Login from './pages/Login'
import Account from './pages/Account'

export default function App() {

  const [rend, setRend] = useState(false);
  const rerender = () => {
    setRend(!rend);
  }

  return (
    <Router>
      <div className="App">
        <Header rerend={rerender}/>
        <div className ="Background">
          <div className = "Content">
            <Switch>
              <Route exact path="/" component={Products} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:product_id" component={Product} />
              <Route exact path='/login' render={()=><Login rerend={rerender} />}/>
              <Route exact path ="/register" render={()=><RegisterProfile rerend={rerender} />}/>
              <Route exact path ="/account" render={()=><Account rerend={rerender} />}/>
            </Switch>
          </div>
        </div>           
      </div>
    </Router>
  );
}