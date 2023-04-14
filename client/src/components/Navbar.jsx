import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { CartContext } from '../CartContext.jsx';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/navbar.css';

export default function Navbar() {
    const { user, logout } = useContext(UserContext);
    const { cartItems } = useContext(CartContext);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                <h1>Donut Panic!</h1>
            </NavLink>
            <ul className="nav-links">
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
                {user && !user?.isAdmin && (
                    <li>
                        <NavLink to="/my-order" className="nav-link">
                            My orders
                        </NavLink>
                    </li>
                )}
                {user?.isAdmin && (
                    <li>
                        <NavLink to="/orders" className="nav-link">
                            Orders
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className="nav-buttons">
                {user ? (
                    <>
                        <button onClick={logout} className="logout-button login-button">
                            Logout
                        </button>
                        <NavLink to="/cart" className="cart-icon">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className="cart-count">{totalItems}</span>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/register" className="register-button">
                            Register
                        </NavLink>
                        <NavLink to="/login" className="login-button">
                            Login
                        </NavLink>
                        <NavLink to="/please-login" className="cart-icon">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className="cart-count">{totalItems}</span>
                        </NavLink>
                        </>
                )}
            </div>
        </nav>
    );
}