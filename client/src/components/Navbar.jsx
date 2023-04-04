import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { CartContext } from './CartContext';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/navbar.css';

export default function Navbar() {
    const { user, logout } = useContext(UserContext);
    const { cartItems } = useContext(CartContext);

    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                <h1>Donut Panic!</h1>
            </NavLink>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/donuts" className="nav-link">
                        Donuts
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/hot-drinks" className="nav-link">
                        Hot Drinks
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cold-drinks" className="nav-link">
                        Cold Drinks
                    </NavLink>
                </li>
            </ul>
            <div className="nav-buttons">
                {user ? (
                    <>
                        <button onClick={logout} className="logout-button login-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/register" className="register-button">
                            Register
                        </NavLink>
                        <NavLink to="/login" className="login-button">
                            Login
                        </NavLink>
                    </>
                )}

                <NavLink to="/cart" className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="cart-count">{cartItems.length}</span>
                </NavLink>
            </div>
        </nav>
    );
}
