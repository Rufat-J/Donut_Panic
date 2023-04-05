import { useState } from "react";

export default function EditMenuModal({ menu, show, handleClose, handleSave }) {
    const [name, setName] = useState(menu.name);
    const [price, setPrice] = useState(menu.price);
    const [ingredients, setIngredients] = useState(menu.ingredients.join(", "));
    const [image, setImage] = useState(menu.image);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedMenu = {
            id: menu.id,
            name: name,
            price: price,
            ingredients: ingredients.split(", "),
            image: image
        };
        handleSave(updatedMenu);
        handleClose();
    };

    return (
        <div className="edit-details" style={{ display: show ? 'block' : 'none' }}>
            <div>
                <h3>Edit Menu Item</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="ingredients">Ingredients:</label>
                        <input
                            type="text"
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
