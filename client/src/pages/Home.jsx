import { useState, useEffect } from 'react';

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
        <div className="homePageImg">
            <img width="100%" height="100%" className="background" src="https://images4.alphacoders.com/941/941939.jpg" alt=""/>

        </div>
    );
}
