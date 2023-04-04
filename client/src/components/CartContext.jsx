import React, { useState, createContext } from 'react';

export const CartContext = createContext();

    export const CartProvider = ({ children }) => {
        const [cartItems, setCartItems] = useState([]);

        const addToCart = (product, quantity) => {
            setCartItems([...cartItems, { ...product, quantity }]);
            console.log(product)
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


