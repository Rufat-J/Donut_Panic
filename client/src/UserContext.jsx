// UserContext.jsx

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userID) => {
        setUser(userID);
        sessionStorage.setItem('user', JSON.stringify(userID));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
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

