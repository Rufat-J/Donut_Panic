// UserContext.jsx

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userID, name) => {
        console.log(userID)
         setUser(userID);
        console.log(name)

    };

    const logout = () => {
        setUser(null);
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
