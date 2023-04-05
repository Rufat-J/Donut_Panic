import '../styles/confirmDeleteModal.css';

export default function ConfirmDeleteModal({ show, onClose, onConfirm }) {
    return (
        <div className={`modal ${show ? "show" : ""}`}>
            <div className="modal-content">
                <h2 className="modal-title">Confirm Deletion</h2>
                <p className="modal-text">Are you sure you want to delete this?</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>
                        Cancel
                    </button>
                    <button onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
