import { useState, useEffect, useContext } from 'react';
import '../styles/allOrdersPage.css';
import { UserContext } from "../UserContext.jsx";
import EditStatusModal from "../components/EditStatusModal.jsx";

export default function MyOrdersPage() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/orders?user=${user._id}`);
            const ordersData = await response.json();
            setOrders(ordersData);
        }
        if (user) {
            fetchData();
        }
    }, [user]);
    console.log(user)
    return (

        <div>
            <h1>My Orders</h1>
            <div className="table-wrapper">
                <table className="orders-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Products</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.filter(order => order.user._id === user.userID).map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user ? order.user.name : ''}</td>
                            <td>
                                {order.products.map((product) => (
                                    <div key={product._id}>
                                        <li>
                                            <span>{product.name}</span>
                                            <span>{` x${product.quantity}`}</span>
                                            <span> - {product.price}$ </span>
                                        </li>
                                    </div>
                                ))}
                            </td>
                            <td>{order.total_price}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
