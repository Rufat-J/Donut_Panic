import { useState, useEffect, useContext } from 'react';
import '../styles/allOrdersPage.css';
import { UserContext } from "../UserContext.jsx";
import EditStatusModal from "../components/EditStatusModal.jsx";

export default function AllOrdersPage({ totalPrice, cartItems }) {
    const { user: { name } } = useContext(UserContext);

    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editingStatus, setEditingStatus] = useState(null);

    console.log(orders)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/orders');
            const ordersData = await response.json();
            setOrders(ordersData);
        }
        fetchData();
    }, []);

    const handleStatusEdit = (orderId, currentStatus) => {
        setIsEditing(true);
        setEditingOrderId(orderId);
        setEditingStatus(currentStatus);
    }

    const handleSaveStatus = (orderId, newStatus) => {
        // update the order status here...
        setIsEditing(false);
        setEditingOrderId(null);
        setEditingStatus(null);
    }

    const handleCloseModal = () => {
        setIsEditing(false);
        setEditingOrderId(null);
        setEditingStatus(null);
    }

    return (
        <div>
            {isEditing && (
                <EditStatusModal
                    orderId={editingOrderId}
                    currentStatus={editingStatus}
                    onClose={handleCloseModal}
                    onSave={handleSaveStatus}
                />
            )}
            <h1>Orders</h1>
            <div className="table-wrapper">
                <table className="orders-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Products</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Edit Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user ? order.user.name : ''}</td>
                            <td>{order.products.map((product) => product.name).join(', ')}</td>
                            <td>{order.total_price}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleStatusEdit(order._id, order.status)}>Edit Status</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
