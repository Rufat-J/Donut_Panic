import Card from 'react-bootstrap/Card';
import AddToCartButton from "./AddToCartButton.jsx";
import EditMenuModal from "./EditMenuModal.jsx";
import { useState } from "react";

export default function MenuCard({ menu, onUpdate, onDelete }) {
    const ingredientList = menu.ingredients.join(", ");
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleUpdateClick = (updatedData) => {
        onUpdate(menu.id, updatedData);
        setShowEditModal(false);
    };

    const handleDeleteClick = () => {
        console.log(menu)
        onDelete(menu.id);
    };

    return (
        <div className="menu-card">
            <Card.Img src={menu.image} />
            <div>
                <h1 className="menu-item">{menu.name}</h1>
                <p className="ingredients">{ingredientList}</p>
            </div>
            <br />
            <h2 className="item-price">Price: ${menu.price}</h2>
            <div className="menu-card-buttons">
                <div className="add-to-cart">
                    <AddToCartButton />
                </div>
                <div>
                    <button className="update-button" onClick={handleEditClick}>Edit</button>
                    <button className="update-button" onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
            <EditMenuModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                handleSave={handleUpdateClick}
                menu={menu}
            />
        </div>
    );
}