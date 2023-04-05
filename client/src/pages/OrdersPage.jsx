import React, { useState, useEffect } from 'react';
import '../styles/ordersPage.css'

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
          fetch('/api/orders')
              .then(response => response.json())
              .then(data => {
                  setOrders(data);
              })
              .catch(error => {
                  console.log(error);
              });
      }, []);



    return (
        <div className="orders-page">
            <h1>Orders</h1>
            <table className="orders-table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Order Details</th>
                    <th>Order Total</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.products.map(product => <li>{product.name}</li>)}</td>
                        <td>{order.total_price}:-</td>
                    </tr>


                ))}
                </tbody>
            </table>
        </div>
    );
}
