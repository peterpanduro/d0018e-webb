import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getProduct, getAdminOrders, updateOrder } from '../functions/api'
import { Link } from 'react-router-dom'

export default function Admin() {
    const mount = () => {
        fetchOrders();
        const unmount = () => {}
        return unmount
    }
    useEffect(mount, [])

    const [orders, setOrders] = useState([]);
    const statuses = [{id: 1, name: "Pending"}, {id: 2, name: "Condfirmed"}, {id: 6, name: "Cancelled"}]

    const getOrdersPromise = async () => {
        return new Promise((resolve, reject) => {
          getAdminOrders(Cookies.get("jwt"), (status, json) => {
            resolve(json);
          })
        });
      }
    
      const getProductPromise = async (productId) => {
        return new Promise((resolve, reject) => {
          getProduct(productId, (status, json) => {
            resolve(json);
          })
        })
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
          const product = await getProductPromise(id);
          return product[0].Name;
        } catch (e) {
          console.error(e);
        }
      }

      const setStatus = (e, orderId) => {
          e.preventDefault();
          const statusId = e.target.value;
          updateOrder(Cookies.get("jwt"), orderId, statusId, (status, response) => {
            if (status !== 200) {
                alert("Någonting gick knasigt");
            }
            fetchOrders();
          });
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
                    <li>Status:
                    <select value={1} onChange={e => setStatus(e, mock.order.orderId)}>
                        {statuses.map((c, key) => {
                            return <option value={c.id} key={c.id}>{c.name}</option>
                    }
                  )}
                  </select>
                    </li>
                  </div>          
              </div>
            ))}
        </div>
      );
}