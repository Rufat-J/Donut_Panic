import React, {useState, useEffect, useContext} from 'react';
import '../styles/allOrdersPage.css';
import {UserContext} from "../UserContext.jsx";
import EditStatusModal from "../components/EditStatusModal.jsx";
import {NavLink} from "react-router-dom";

export default function MyOrdersPage() {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/orders?user=${user._id}`);
            const ordersData = await response.json();
            setOrders(ordersData);
        }

        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <div className="myOrdersPage">
            <h1>My Orders</h1>
            <div className="table-wrapper">
                {orders.length > 0 ? (
                    <table className="orders-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Products</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Estimated Pick up</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.filter(order => order.user._id === user.userID).map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user ? order.user.name : ''}</td>
                                <td className="products-th">
                                    {order.products.map((product) => (
                                        <div key={product._id}>
                                            <li>
                                                <span id="products-th">{product.name}</span>
                                                <span>{` x${product.quantity}`}</span>
                                                {/*<span> - {product.price}$ </span>*/}
                                            </li>
                                        </div>
                                    ))}
                                </td>
                                <td>{order.total_price}$</td>
                                <td className={order.status === 'pending'
                                    ? 'pending-status' : order.status === 'ready'
                                        ? 'ready-status' : order.status === 'preparing'
                                            ? 'preparing-status' : ''}>{order.status}</td>


                                <td>{new Date(order.pickup_time).toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false
                                })}</td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div><h2>You have no placed orders</h2></div>
                )}
            </div>
        </div>
    );
}
