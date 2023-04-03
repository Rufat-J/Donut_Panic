import { useState, useEffect } from 'react';
import MenuCard from "../components/MenuCard.jsx";

export default function Menu() {
    const [menu, setMenu] = useState([]);

    async function fetchData() {
        const response = await fetch('/api/products');
        const data = await response.json();
        setMenu(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const drinkMenu = menu.filter(menuItem => menuItem.category === "Cold Drink");

    return (
        <div className="menu-page">
            <h1 className="menu-header">Cold drinks</h1>
            {drinkMenu.map(menuItem => (
                <MenuCard key={menuItem.id} menu={menuItem} />
            ))}
        </div>
    );
}

