// LoginPage.js

import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import '../styles/loginPage.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Include cookies in the request
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Login successful!');
                    login(data.userID);// Set the user data in context
                    console.log(login(data.userID))
                    // Redirect user to another page or perform other actions
                    navigate('/');
                } else {
                    setError('Invalid email or password');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError('An error occurred, please try again');
            });
    }

    return (
        <div className="loginPage">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span> Email: </span>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default LoginPage;
