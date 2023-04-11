import {useContext} from 'react';
import '../styles/ordersPage.css';
import {UserContext} from "../UserContext.jsx";

export default function OrdersPage({ order, totalPrice, cartItems }) {
    const { user: {name} } = useContext(UserContext);
    console.log(name)
    return (
        <div className="orders-page">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
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
                <tr>
                    <td>{order._id}</td>
                    <td>{name}</td>
                    <td>{cartItems.map((cartItem) => <li key={cartItem._id}>{cartItem.name}</li>)}</td>
                    <td>${totalPrice}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
