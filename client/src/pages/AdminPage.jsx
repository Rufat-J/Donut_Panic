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

    return (
        <div>
            {menu.map(menu => <MenuCard menu={menu}/>)}
        </div>
    )
}
