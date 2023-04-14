import React, { useContext, useState } from 'react';
import '../styles/registerPage.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {user} = useContext(UserContext);

    function handleSubmit(event) {
        event.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, phone }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Registration successful');
                    navigate('/login');
                } else {
                    setError('Account already exists');
                    console.error('Registration failed');
                }
            })
            .catch((error) => console.error(error));
        console.log(`Full Name: ${name}, Email: ${email}, Password: ${password}, Phone: ${phone}`);
    }

    return (
        <>
            {!user ? (
                <div className='registerPage'>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Full Name: </span>
                            <input type='text' name='fullName' value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            <span>Email: </span>
                            <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            <span>Password: </span>
                            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            <span>Phone: </span>
                            <input type='tel' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <br />
                        <button type='submit'>Register</button>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
            ) : (
                <div className="error-page"><h1>Sorry, something went wrong!</h1> <br/> <h2>Please, try again.</h2></div>
            )}
        </>
    );
}

export default RegisterPage;
