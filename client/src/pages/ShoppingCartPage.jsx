import React, { useContext, useState, useCallback } from 'react';
import { CartContext } from '../CartContext.jsx';
import {UserContext} from "../UserContext.jsx";
import '../styles/shoppingCartPage.css'

export default function ShoppingCartPage() {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const { user: {userID} } = useContext(UserContext);
    const totalPrice = cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    ).toFixed(2);

    const [order, setOrder] = useState([])

    const confirmOrder = useCallback(async() => {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems, totalPrice, userID }),
            credentials: 'include',
        })
        const result = await response.json()
        if(result){
            setOrder(result);
            console.log(result)
            window.location.href = '/my-order';


        }
    }, [cartItems, totalPrice]);

    const handleConfirmOrder = (event) => {
        event.preventDefault();
        confirmOrder();
    };

    return (
        <div className="shopping-cart">
            <h1 className="shopping-cart__title">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="shopping-cart__empty">Your cart is empty 😢.</p>
            ) : (
                <div className="shopping-cart__items">
                    {cartItems.map((item) => (
                        <div key={item._id} className="shopping-cart__item">
                            <h3 className="shopping-cart__item-title">Product: {item.name}</h3>
                            <p className="shopping-cart__item-quantity">Quantity: {item.quantity}</p>
                            <p className="shopping-cart__item-price">Price: ${item.price}</p>
                            <button className="shopping-cart__item-remove" onClick={() => removeFromCart(item)}>Remove</button>
                        </div>
                    ))}
                    <p className="shopping-cart__total-price">Total Price: ${totalPrice}</p>
                    <button className="shopping-cart__confirm-order" onClick={handleConfirmOrder}>Confirm Order</button>
                </div>
            )}

        </div>
    );
}