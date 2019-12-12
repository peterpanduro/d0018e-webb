import React, { Component } from 'react';
import './CategoryList.css';

class Categories extends Component {
  constructor(){
    super();
    this.state = {
      categories: [],
    };
  }


componentDidMount() {
  fetch('http://api.d0018e.pndro.se/categories')
  .then(results => {
    return results.json();
  }).then(data => {
    let x = data.map((y) => {
      return(
        <li key={y.ID}>
          <a href={"/products?category=" + y.ID}>{y.Name}</a>
        </li>
      )
    })
    this.setState({categories: x});
  })
}

render() {
  return (
    <div className="Categories">
      <h2>Upptäck kategorier</h2>
      <ul>
      {this.state.categories}
      </ul>
    </div>
  )
}
}
export default Categories;