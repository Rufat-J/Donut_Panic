import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext.jsx';

export default function AddToCartButton({ product }) {
    const [quantity, setQuantity] = useState(0);
    const { addToCart } = useContext(CartContext);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        console.log(addToCart)
    };

    return (
        <div>
            <div className="add-to-cart">
                <button className="quantity-button" onClick={decrementQuantity}>
                    -
                </button>
                <span>{quantity}</span>
                <button className="quantity-button" onClick={incrementQuantity}>
                    +
                </button>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}
