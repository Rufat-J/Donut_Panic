import { NavLink } from 'react-router-dom';
import { useMenu } from '../menuContext';
import MenuCard from '../components/MenuCard.jsx';
import '../styles/menuPage.css'
import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";

export default function HotDrinksPage() {
    const { hotDrinksMenu, handleUpdate, handleDelete } = useMenu();
    const { user } = useContext(UserContext)


    return (
        <div className='menu-page'>
            <div className='header-and-button'>
                <h1 className='menu-header'>Hot beverages</h1>
                <div>
                    {user?.isAdmin && (
                        <NavLink className='update-button' to='/update-menu'>
                            {' '}
                            Add new item
                        </NavLink>
                    )}
                </div>
            </div>
            <div className='menu-cards'>
                {hotDrinksMenu.map((menuItem) => (
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