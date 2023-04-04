import React, { useState } from 'react';

export default function AddToCartButton({ product }) {
    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
    };

    return (
        <div>
            <div className="add-to-cart">
                <button className="quantity-button" onClick={decrementQuantity}>-</button>
                <span>{quantity}</span>
                <button className="quantity-button" onClick={incrementQuantity}>+</button>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}