import { useState, useEffect, createContext, useContext } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            for (let i = 0; i < data.length; i++) {
                data[i].id = data[i]._id;
            }
            setMenu(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...updatedData }),
            });
            const data = await response.json();
            setMenu((prevMenu) =>
                prevMenu.map((menuItem) =>
                    menuItem.id === id ? { ...menuItem, ...data.data } : menuItem
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 204) {
                setMenu((prevMenu) =>
                    prevMenu.filter((menuItem) => menuItem.id !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const donutMenu = menu.filter((menuItem) => menuItem.category === 'Donut');
    const drinkMenu = menu.filter((menuItem) => menuItem.category === "Cold Drink")
    const hotDrinksMenu = menu.filter((menuItem) => menuItem.category === "Hot Drink")


    return (
        <MenuContext.Provider value={{ donutMenu, drinkMenu, hotDrinksMenu, handleUpdate, handleDelete }}>
            {children}
        </MenuContext.Provider>
    );
};
