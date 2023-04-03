import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AddToCartButton from "./AddToCartButton.jsx";

export default function MenuCard({menu}) {
    const ingredientList = menu.ingredients.join(", ");
    return (
        <Card className="menu-card">
            <Card.Img src={menu.image}/>
            <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <Card.Text>
                    {ingredientList}
                </Card.Text>
            </Card.Body>
            <br/>
            <Card.Text className="item-price">Price: ${menu.price}</Card.Text>
            <div className="add-to-cart">
                <AddToCartButton/>
            </div>
        </Card>
    );
}