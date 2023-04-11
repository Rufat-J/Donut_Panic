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
        setIsEditing(false);
        setEditingOrderId(null);
        setEditingStatus(null);
    }

    const handleCloseModal = () => {
        setIsEditing(false);
        setEditingOrderId(null);
        setEditingStatus(null);
    }

    const handleDeleteOrder = async (orderId) => {
        const orderToDelete = orders.find((order) => order._id === orderId);

        if (orderToDelete.status !== "You have picked up your order") {
            console.error('Order cannot be deleted as it has not been picked up yet');
            return;
        }

        const response = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
        if (response.ok) {
            setOrders(orders.filter(order => order._id !== orderId));
        } else {
            console.error('Failed to delete order');
        }
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
                        <th>Delete Order</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user ? order.user.name : ''}</td>
                            <td>
                                {order.products.map((product) => (
                                    <div key={product._id}>
                                        <li>
                                            <span>{product.name}</span>
                                            <span>{` x${product.quantity}`}</span>
                                        </li>
                                    </div>
                                ))}
                            </td>
                            <td>{order.total_price}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleStatusEdit(order._id, order.status)}>Edit Status</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteOrder(order._id)}>Delete Order</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
