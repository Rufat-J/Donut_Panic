import { useState, useEffect } from 'react';
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
export default function() {
    return <h1>MENU!</h1>

}




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
        <div>
            <Navbar />
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name}</li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}
