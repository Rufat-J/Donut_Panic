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
            <img src={'https://wallpaperaccess.com/full/1312821.jpg'} />
        </div>
    );
}
