import {useState, useEffect} from 'react';
import MenuCard from "../components/MenuCard.jsx";
import {NavLink} from "react-router-dom";

export default function Menu() {
    const [menu, setMenu] = useState([]);

    async function fetchData() {
        const response = await fetch('/api/products');
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            data[i].id = data[i]._id;
        }
        setMenu(data);
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
                body: JSON.stringify({id, ...updatedData})
            });
            const data = await response.json();
            setMenu((prevMenu) =>
                prevMenu.map((menuItem) =>
                    menuItem.id === id ? {...menuItem, ...data.data} : menuItem
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


    const drinkMenu = menu.filter(menuItem => menuItem.category === "Cold Drink");

    return (
        <div className="menu-page">
            <h1 className="menu-header">Cold drinks</h1>
            <NavLink className="update-button" to="/update-menu"> Add new item</NavLink>
            <div className="menu-cards">
                {drinkMenu.map(menuItem => (
                    <MenuCard
                        key={menuItem.id}
                        menu={menuItem}
                        onUpdate={handleUpdate}
                        onDelete={() => handleDelete(menuItem.id)}
                    />
                ))}
            </div>
        </div>
    );
}

