import {useContext} from 'react';
import '../styles/myOrdersPage.css';
import {UserContext} from "../UserContext.jsx";

export default function OrdersPage({ order, totalPrice, cartItems }) {
    const { user: {name} } = useContext(UserContext);
    console.log(name)
    return (
        <div className="orders-page">
            <h1>Order Confirmation</h1>
            <h3>Thank you for your order! Click <a href="/my-order">here </a>for order details</h3>
        </div>
    );
}
