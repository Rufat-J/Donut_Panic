import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Menu Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formIngredients">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

