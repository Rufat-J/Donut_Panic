import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        fetch(`/api/products/${product._id}`)
            .then(response => response.json())
            .then(data => {
                setCartItems([...cartItems, { ...data, quantity }]);
            })
            .catch(error => console.error(error));
     };

    const removeFromCart = (product) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.id !== product.id
        );
        setCartItems(updatedCartItems);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};


