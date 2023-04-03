import {useState, useEffect} from 'react';
import MenuCard from "../components/MenuCard.jsx";
import adminPage from '../styles/menuPage.css'

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

    const donutMenu = menu.filter(menuItem => menuItem.category === "Donut");

    return (
        <div className="menu-page">
            <h1 className="menu-header">Donuts</h1>
            <div className="menu-cards">
                {donutMenu.map(menuItem => (
                    <MenuCard key={menuItem.id} menu={menuItem}/>
                ))}
            </div>
        </div>
    );
}
