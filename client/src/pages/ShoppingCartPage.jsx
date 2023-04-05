import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';

export default function ShoppingCartPage() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);


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
                    <h3>Total Price: ${totalPrice}</h3>
                </div>
            )}
        </div>
    );
}