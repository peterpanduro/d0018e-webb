import React, { useState, useEffect } from 'react';
import Img from 'react-image'
import '../css/Product.css';
import CommentList from '../components/CommentList';
import { getProduct, getCategories } from '../functions/api'
import Spinner from '../components/Spinner'

export default function Product(props) {
  useEffect(() => {
    fetchProduct(props.match.params.product_id);
    }, [props.match.params.product_id]);  

    useEffect(() => {
        fetchCategories();
    }, []);

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [imgURL, setImgURL] = useState("");
    const [imgCaption, setImgCaption] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const fetchProduct = (id) => {
        getProduct(id, (status, data) => {
        if (status === 200) {
            const {ID, Name, Description, Price, DiscountPrice, url, caption, Category} = data[0];
            setId(ID);
            setName(Name);
            setDescription(Description);
            setPrice(Price);
            setDiscountPrice(DiscountPrice);
            setImgURL(url);
            setImgCaption(caption);
            setCategory(Category);
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
                  <label>Description: </label>
                  <input type="text" name="description" value={description} maxLength="512" onChange={e => setName(e.target.value)}></input>
                  <br/>
                  <label>Image URL: </label>
                  <input type="text" name="imgURL" value={imgURL} maxLength="256" onChange={e => setName(e.target.value)}></input>
                  <br/>
                  <label>Image Caption: </label>
                  <input type="text" name="imgCaption" value={imgCaption} maxLength="64" onChange={e => setName(e.target.value)}></input>
                  <br/>
                  <label>Category: </label>
                  <select>
                  {categories.map((item, key) => 
                  {
                      if(item.ID === category)
                      return <option selected key={item.ID} value={item.Name}>{item.Name}</option>
                    return <option key={item.ID} value={item.Name}>{item.Name}</option>
                  }
                  )}
                  </select>
              </form>
            </div>
          </div>
      </div>
    );
}

