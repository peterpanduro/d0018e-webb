import React, { useState, useEffect } from 'react';
import Img from 'react-image'
import '../css/Product.css';
import {getCategories, addProduct, getUser } from '../functions/api'
import Spinner from '../components/Spinner'
import Cookies from 'js-cookie';

export default function Product(props) {


    useEffect(() => {
        fetchCategories();
        checkCookie();
    }, []);

    const [stock, setStock] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [imgURL, setImgURL] = useState("");
    const [imgCaption, setImgCaption] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [archived, setArchived] = useState(0);

    const checkCookie = () => {
        const jwt = Cookies.get("jwt");
        if (!jwt) {
            window.location.assign("/");
        } else {
            getUser(jwt, (status, data) => {
                if (status === 200) {
                    if (data.Privilege === 1) {
                      return;
                    }
                }
                window.location.assign("/");
            })
        }
    }

    const createProduct = (e) => {
        e.preventDefault(); 
        var archiv;
        if (archived) {
          archiv = 1
        } else {
          archiv = 0
        }       
        addProduct(Cookies.get("jwt"), name, price, discountPrice, stock, category, description, imgURL, imgCaption, archiv, (status, data) => {
          if (status === 200) {
            console.log(data);            
        } else {
            console.log(data)
            alert(data)
        }
        })
    }

    const fetchCategories = () => {
        getCategories((status, data) => {
            if (status === 200) {
                setCategories(data);
            }
        })
    }

    const test = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setCategory(e.target.value);
    }

    const archiveCheckboxChanged = (e) => {
        setArchived(!archived)
    }

    return (
      <div className="product">
          <div className="productInfo">
            <div className="images">
              <div className="mainImage">
                <Img src={imgURL} alt={imgCaption} loader={<Spinner />} unloader={<img alt="" src={require('../no_img.png')} />} />
              </div>
            </div>
            <div className="productInfoText">
              <form>
                  <label>Price: </label>
                  <input value={price} onChange={event => setPrice(event.target.value.replace(/\D/,''))}/>
                  <br/>
                  <label>Discount: </label>
                  <input value={discountPrice} onChange={event => setDiscountPrice(event.target.value.replace(/\D/,''))}/>
                  <br/>
                  <label>Name: </label>
                  <input type="text" name="name" value={name} maxLength="20" onChange={e => setName(e.target.value)}></input>
                  <br/>
                  <label>STOCK: </label>
                  <input type="text" name="stock" value={stock} maxLength="20" onChange={e => setStock(e.target.value)}></input>
                  <br/>
                  <label>Description: </label>
                  <input type="text" name="description" value={description} maxLength="512" onChange={e => setDescription(e.target.value)}></input>
                  <br/>
                  <label>Image URL: </label>
                  <input type="text" name="imgURL" value={imgURL} maxLength="256" onChange={e => setImgURL(e.target.value)}></input>
                  <br/>
                  <label>Image Caption: </label>
                  <input type="text" name="imgCaption" value={imgCaption} maxLength="64" onChange={e => setImgCaption(e.target.value)}></input>
                  <br/>
                  <label>Category: </label>
                  <select onChange = {e=>test(e)} value={category}>
                  {categories.map((item, key) => 
                  {
                      return <option value={item.ID} key={item.ID}>{item.Name}</option>
                  }
                  )}
                  </select>
                  <div className = "archived">
                    Arkiverad? Click me
                    <input type = "checkbox" checked={archived} onChange={e=> archiveCheckboxChanged(e)}></input>
                  </div>
                  <button onClick = {createProduct}>Skapa ny produkt</button>
              </form>
            </div>
          </div>
      </div>
    );
}

