import { useState, useEffect } from 'react';
import MenuCard from "../components/MenuCard.jsx";
import adminPage from '../styles/adminPage.css'

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

    const donutMenu = menu.filter(menuItem => menuItem.category === "Donuts");
    const drinkMenu = menu.filter(menuItem => menuItem.category === "drinks");

    return (
        <div className="admin-page">
            <h2>Donuts</h2>
            {donutMenu.map(menuItem => (
                <MenuCard key={menuItem.id} menu={menuItem} />
            ))}

            <h2>Drinks</h2>
            {drinkMenu.map(menuItem => (
                <MenuCard key={menuItem.id} menu={menuItem} />
            ))}
        </div>
    );
}
