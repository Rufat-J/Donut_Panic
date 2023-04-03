import {useState, useEffect} from 'react';
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


    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
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
    const donutMenu = menu.filter(menuItem => menuItem.category === "Donut");

    return (
        <div className="menu-page">
            <h1 className="menu-header">Donuts</h1>
            <div className="menu-cards">
                {donutMenu.map(menuItem => (
                    <MenuCard
                        key={menuItem.id}
                        menu={menuItem}
                    onUpdate={(updatedData) => handleUpdate(menuItem.id, updatedData)}/>
                ))}
            </div>
        </div>
    );
}
