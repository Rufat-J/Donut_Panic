import React, { useState } from 'react';
import '../styles/loginPage.css'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // Here you can add code to submit the login data to your backend or API
        console.log(`Email: ${email}, Password: ${password}`);
    }

    return (
        <div className="container">
            <h1>Donut Shop Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
