import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AddToCartButton from "./AddToCartButton.jsx";

export default function MenuCard({menu}) {
    const ingredientList = menu.ingredients.join(", ");
    return (
        <Card className="menu-card">
            <Card.Img src={menu.image} />
            <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <Card.Text>
                    {ingredientList}
                </Card.Text>
            </Card.Body>
            <ListGroup>
                <ListGroup.Item className="menu-card">Price: ${menu.price}</ListGroup.Item>
                <div className="add-to-cart">
                <AddToCartButton />
                </div>
            </ListGroup>
        </Card>
    );
}