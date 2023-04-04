import React, { useState } from 'react';

function AddProductForm() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [image, setImage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, price, ingredients, image })
        })
            .then(response => {
                if (response.ok) {
                    console.log('update successful');
                    // reset form fields
                    setName('');
                    setCategory('');
                    setPrice('');
                    setIngredients('');
                    setImage('');
                } else {
                    console.error('update failed');
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={event => setName(event.target.value)}
                required
            />

            <label htmlFor="category">Category:</label>
            <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={event => setCategory(event.target.value)}
                required
            />

            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={event => setPrice(event.target.value)}
                required
            />

            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
                id="ingredients"
                name="ingredients"
                value={ingredients}
                onChange={event => setIngredients(event.target.value)}
                required
            />

            <label htmlFor="image">Image-link:</label>
            <input
                type="text"
                id="image"
                name="image"
                value={image}
                onChange={event => setImage(event.target.value)}
                required
            />

            <button type="submit">Add Product</button>
        </form>
    );
}

export default AddProductForm;