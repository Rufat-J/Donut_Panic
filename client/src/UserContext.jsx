// UserContext.jsx

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userID, isAdmin, name, orders) => {
        setUser({userID, isAdmin, name, orders});
        sessionStorage.setItem('user', JSON.stringify({userID, isAdmin, name, orders}));
    };


    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
        window.location.href = '/'
    };

    const contextValues = {
        user,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
};

