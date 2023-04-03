import Card from 'react-bootstrap/Card';
import AddToCartButton from "./AddToCartButton.jsx";

export default function MenuCard({menu}) {
    const ingredientList = menu.ingredients.join(", ");
    return (
        <div className="menu-card">
            <Card.Img src={menu.image}/>
            <div>
                <h1 className="menu-item">{menu.name}</h1>
                <p className="ingredients">
                    {ingredientList}
                </p>
            </div>
            <br/>
            <h2 className="item-price">Price: ${menu.price}</h2>
            <div className="add-to-cart">
                <AddToCartButton/>
            </div>
        </div>
    );
}