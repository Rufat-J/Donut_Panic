import {useState, useEffect} from 'react';
import '../styles/allOrdersPage.css';


export default function AllOrdersPage() {
    const [orders, setOrders] = useState([]);

    console.log(orders)


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/orders');
            const ordersData = await response.json();
            setOrders(ordersData);
        }

        fetchData();
    }, []);

    return (
        <div>
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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
