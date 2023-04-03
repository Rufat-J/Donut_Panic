import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);

    async function fetchData() {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="homePage">
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.fullName}, {user.name}</li>
                ))}
            </ul>
        </div>
    );
}
