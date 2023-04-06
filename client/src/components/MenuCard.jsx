import AddToCartButton from "./AddToCartButton.jsx";
import EditMenuModal from "./EditMenuModal.jsx";
import {useContext, useState} from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import {UserContext} from '../UserContext';


export default function MenuCard({menu, onUpdate, onDelete}) {
    const ingredientList = menu.ingredients.join(", ");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const {user} = useContext(UserContext);

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
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleConfirmDelete = () => {
        onDelete(menu.id);
        setShowConfirmModal(false);
        window.location.reload();
    };

    return (
        <div className="menu-card">
            <img className="menu-pic" src={menu.image}/>
            <div>
                <h1 className="menu-item">{menu.name}</h1>
                <p className="ingredients">{ingredientList}</p>
            </div>
            <br/>
            <h2 className="item-price">Price: ${menu.price}</h2>
            <div className="menu-card-buttons">
                <div className="add-to-cart">
                    <AddToCartButton product={menu}/>
                </div>

                <div>
                    {user?.isAdmin && (
                        <div>
                            <button className="update-button" onClick={handleEditClick}>Edit</button>
                            <button className="update-button" onClick={handleDeleteClick}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
            <EditMenuModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                handleSave={handleUpdateClick}
                menu={menu}
            />
            {showConfirmModal && (
                <ConfirmDeleteModal
                    show={showConfirmModal}
                    onClose={handleCloseConfirmModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}