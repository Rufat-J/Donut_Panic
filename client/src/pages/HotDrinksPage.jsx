import { NavLink } from 'react-router-dom';
import { useMenu } from '../menuContext';
import MenuCard from '../components/MenuCard.jsx';

export default function HotDrinksPage() {
    const { hotDrinksMenu, handleUpdate, handleDelete } = useMenu();

    return (
        <div className='menu-page'>
            <div className='header-and-button'>
                <h1 className='menu-header'>Hot beverages</h1>
                <NavLink className='update-button' to='/update-menu'>
                    {' '}
                    Add new item
                </NavLink>
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