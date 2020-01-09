import React, {useState, useEffect} from 'react';
import '../css/Order.css'
import {Link} from 'react-router-dom';
import { getOrders, promiseGetProduct } from '../functions/api'
import Cookies from 'js-cookie'

export default function Order(props) {

  const mount = () => {
    fetchOrders();
    const unmount = () => {}
    return unmount
}
useEffect(mount, [])

const [orders, setOrders] = useState([]);

  const getOrdersPromise = async () => {
    return new Promise((resolve, reject) => {
      getOrders(Cookies.get("jwt"), (status, json) => {
        resolve(json);
      })
    });
  }

  const fetchOrders = async () => {
    try {
      const data = await getOrdersPromise();
      const mappedOrders = await Promise.all(data.map(async order => {
        const mappedItems = await Promise.all(order.order.items.map(async item => {
          const productName = await fetchProductName(item.product);
          item["name"] = productName;
          return item;
        }))
        order.items = mappedItems;
        return order;
      }))
      setOrders(mappedOrders);
    } catch (e) {
      console.log({e})
    }
  }

  const fetchProductName = async (id) => {
    try {
      const product = await promiseGetProduct(id);
      return product[0].Name;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="Order">
  <h1>Lista över dina ordrar</h1>
      {orders.map(mock => (
          <div key={mock.order.orderId} className="orderid">
            <h3>OrderID: {mock.order.orderId}</h3>
              {mock.order.items.map(item => (
                <div key={item.product}>
                  <ul className="orderInfo" key={item.product}>
                    <li>Produkt: {item.product}</li>
                    <li>Antal: {item.quantity}st</li>
                    <li>Pris: {item.unitPrice}kr</li>
                    <li>Namn: {item.name}</li> 
                    <Link to= {`/products/${item.product}`}>
                      <button type ="button">
                        Produkt
                      </button>
                    </Link>
                  </ul>
                </div>
              ))} 
              <div className = "dates">
                <li>Orderdatum: {mock.order.orderDate}</li>
                <li>Skickades: {mock.order.shippedDate}</li> 
                <li>Status: {mock.order.status}</li>
              </div>          
          </div>
        ))}
    </div>
  );
}