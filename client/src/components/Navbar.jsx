import React from 'react';
import '../styles/navbar.css'

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
                    <button className="register-button">Register</button>
                    <button className="login-button">Log in</button>
                </div>
            </nav>
        );
}