import React, { useContext, useEffect, useState, useCallback } from 'react';
import { CartContext } from '../components/CartContext';
import OrdersPage from "./OrdersPage.jsx";

export default function ShoppingCartPage() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    ).toFixed(2);

    const [showOrdersPage, setShowOrdersPage] = useState(false);
    const [order, setOrder] = useState([])

    const confirmOrder = useCallback(() => {
        fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems, totalPrice }),
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOrder(data);
                setShowOrdersPage(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cartItems, totalPrice]);

    const handleConfirmOrder = (event) => {
        event.preventDefault();
        confirmOrder();
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty 😢.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <h3>Product: {item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </div>
                    ))}
                    <p>Total Price: ${totalPrice}</p>
                    <button onClick={handleConfirmOrder}>Confirm Order</button>
                </div>
            )}
            {showOrdersPage && <OrdersPage order={order} />}
        </div>
    );
}
