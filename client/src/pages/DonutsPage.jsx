import { useState, useEffect } from 'react';
import MenuCard from "../components/MenuCard.jsx";
import { NavLink } from 'react-router-dom';


export default function Menu() {
    const [menu, setMenu] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
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
                body: JSON.stringify({ id, ...updatedData })
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
        console.log(menu)
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

    const donutMenu = menu.filter(menuItem => menuItem.category === "Donut");

    return (
        <div className="menu-page">
            <div className="header-and-button">
                <h1 className="menu-header">Donuts</h1>
                <NavLink className="update-button" to="/update-menu"> Add new item</NavLink>
            </div>
            <div className="menu-cards">
                {donutMenu.map(menuItem => (
                    <MenuCard
                        key={menuItem.id}
                        menu={menuItem}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
