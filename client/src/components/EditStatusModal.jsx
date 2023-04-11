import { useState } from 'react';

export default function EditStatusModal({ orderId, currentStatus, onClose, onSave }) {
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleChange = (event) => {
        setNewStatus(event.target.value);
    };

    const handleSave = () => {
        onSave(orderId, newStatus);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Status</h2>
                <label htmlFor="status-select">New Status:</label>
                <select id="status-select" value={newStatus} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Preparation">Your order is being prepared</option>
                    <option value="Ready">Your order is ready to be picked up</option>
                </select>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}