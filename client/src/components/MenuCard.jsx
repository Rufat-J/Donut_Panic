import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function MenuCard({menu}) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img src={menu.image} />
            <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <Card.Text>
                    {menu.ingredients}
                </Card.Text>
            </Card.Body>
            <ListGroup>
                <ListGroup.Item>Price: ${menu.price}</ListGroup.Item>
                <ListGroup.Item>Category: {menu.category}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
}