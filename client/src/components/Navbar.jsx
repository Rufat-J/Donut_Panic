import React from 'react';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';

export default function () {
     return (
            <nav className="navbar">
                <h1>Donut Panic!</h1>
                <ul className="nav-links">
                    <li><a href="#">Donuts</a></li>
                    <li><a href="#">Hot Drinks</a></li>
                    <li><a href="#">Cold Drinks</a></li>
                </ul>
                <div className="nav-buttons">
                    <Link to="/register" className="register-button">Register</Link>
                    <Link to="/login" className="login-button">Log in</Link>
                </div>
            </nav>
        );
}