import React from 'react';
import '../css/Order.css'


export default function Order() {

  const mockup = [
    {
      "order": {
        "orderId": 1,
        "items": [
          {
            "product": 1,
            "quantity": 3,
            "unitPrice": 300000
          }
        ],
        "voucher": "",
        "status": "PENDING",
        "orderDate": "2020-01-08",
        "shippedDate": "2020-01-08"
      }
    },
    {
      "order": {
        "orderId": 3,
        "items": [
          {
            "product": 2,
            "quantity": 1,
            "unitPrice": 200000
          },
          {
            "product": 4,
            "quantity": 2,
            "unitPrice": 500000
          }
        ],
        "voucher": "",
        "status": "CONFIRMED",
        "orderDate": "2020-01-06",
        "shippedDate": "2020-01-07"
      }
    }
  ];

  return (
    <div className="Order">
      <h1>Lista över dina ordrar</h1>
      {mockup.map(mock => (
          <div key={mock.order.orderId} className="orderid">
            <h3>OrderID: {mock.order.orderId}</h3>
              {mock.order.items.map(item => (
                <ul className= "orderInfo">
                  <li>Produkt: {item.product}</li>
                  <li>Antal: {item.quantity}st</li>
                  <li>Pris: {item.unitPrice}kr</li>
                </ul>
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