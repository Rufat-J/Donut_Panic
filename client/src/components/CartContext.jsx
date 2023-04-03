import React, { useState, createContext } from 'react';

export const CartContext = createContext(); // Skapa en context

export const CartProvider = ({ children }) => { // Skapa en provider
    const [cartItems, setCartItems] = useState([]); // Definiera en state-variabel för varukorgen

    // Funktion för att lägga till en produkt i varukorgen
    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    // Funktion för att ta bort en produkt från varukorgen
    const removeFromCart = (product) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
        setCartItems(updatedCartItems);
    };

    // Returnera CartContext.Provider-komponenten som tillhandahåller data till resten av appen
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
