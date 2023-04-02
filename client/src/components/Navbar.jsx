import React from 'react';
import '../styles/navbar.css'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                <h1>Donut Panic!</h1>
            </NavLink>
            <ul className="nav-links">
                <li>
                    <NavLink to="/donuts" className="nav-link" >Donuts</NavLink>
                </li>
                <li>
                    <NavLink to="/hot-drinks" className="nav-link" >
                        Hot Drinks
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cold-drinks" className="nav-link" >
                        Cold Drinks
                    </NavLink>
                </li>
            </ul>
            <div className="nav-buttons">
                <NavLink to="/register" className="register-button" >Register</NavLink>
                <NavLink to="/login" className="login-button" >Log in</NavLink>

            </div>
        </nav>
    );
}
