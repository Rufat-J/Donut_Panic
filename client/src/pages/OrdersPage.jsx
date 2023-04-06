import React, {useState, useEffect, useContext} from 'react';
import '../styles/ordersPage.css'
import {UserContext} from "../UserContext.jsx";

export default function OrdersPage({ totalPrice, cartItems }) {

    const [orders, setOrders] = useState([]);

    const  { user } = useContext(UserContext)




    return (
        <div className="orders-page">
            <h1>Orders</h1>
            <table className="orders-table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Products</th>
                    <th>Order Total</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{cartItems.map(cartItem => <li>{cartItem.name}</li>)}</td>
                        <td>${totalPrice}</td>
                    </tr>


                ))}
                </tbody>
            </table>
        </div>
    );
}
