import React, {useState, useEffect} from 'react';
import '../styles/ordersPage.css';

export default function MyOrder() {
    return (
        <div className="orders-page">
            <h1>My order</h1>
            <table className="orders-table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Order Total</th>
                    <th>Status</th>
                    <th>Pickup time</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>123</td>
                    <td>En bulle</td>
                    <td>10 kronor</td>
                    <td>15 min.</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
