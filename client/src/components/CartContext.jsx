import React, { useState, createContext } from 'react';
import {useMenu} from "../MenuContext.jsx";

export const CartContext = createContext();
// const { donutMenu, drinkMenu, hotDrinksMenu } = useMenu()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        console.log(product)
        //642a81761e69f5f5429a0ac7   ${product._id}
        fetch(`/api/products/642a81761e69f5f5429a0ac7`)
            .then(response => response.json())
            .then(data => {
                setCartItems([...cartItems, { ...data, quantity }]);
            })
            .catch(error => console.error(error));
     };
    // const addToCart = async (productId, quantity) => {
    //     try {
    //         const response = await fetch(`/api/products/642a81761e69f5f5429a0ac7`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //              body: JSON.stringify({ product })
    //         });
    //         const data = await response.json();
    //         //const cartItemId = Math.random().toString(36).substr(2, 9); // generate a random identifier
    //         setCartItems([...cartItems, { ...product, ...data.data, quantity}]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

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


