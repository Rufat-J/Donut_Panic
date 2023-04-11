import { useState } from 'react';
import { useOrders } from '../OrdersContext';

export default function EditStatusModal({ orderId, currentStatus, onClose }) {
    const { handleUpdate } = useOrders();
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleChange = (event) => {
        setNewStatus(event.target.value);
    };

    const handleSave = async () => {
        console.log(orderId)
        try {
            await handleUpdate(orderId, { status: newStatus });
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Status</h2>
                <label htmlFor="status-select">New Status:</label>
                <select id="status-select" value={newStatus} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Your order is being prepared">Preparing</option>
                    <option value="Your order is ready to be picked up">Order is ready</option>
                    <option value="You have picked up your order">Order is picked up</option>
                </select>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
