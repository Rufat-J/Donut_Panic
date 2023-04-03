import React, { useState } from 'react';
import '../styles/registerPage.css';
import '../App.css'

function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // submit the registration data to backend or API
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({fullName, email, password, phone})
        })
            .then(response => {
                if(response.ok) {
                    console.log('Registration successful')
                } else {
                    console.error('Registration failed')
                }
            })
            .catch(error => console.error(error))
        console.log(`Full Name: ${fullName}, Email: ${email}, Password: ${password}, Phone: ${phone}`);
    }

    return (
        <div className="registerPage">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Full Name: </span>
                    <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
                <br />
                <label>
                    <span>Email: </span>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    <span>Password: </span>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    <span>Phone: </span>
                    <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
