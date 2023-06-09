import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home.jsx";
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom"
import Root from './components/Root'
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DonutsPage from "./pages/DonutsPage"
import Cart from "./pages/ShoppingCartPage.jsx"
import ColdDrinksPage from './pages/ColdDrinksPage'
import HotDrinksPage from './pages/HotDrinksPage'
import AddNewItemPage from './pages/AddNewItemPage'
import AllOrdersPage from "./pages/AllOrdersPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx";
import PleaseLogInPage from "./pages/PleaseLogInPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<Root/>} errorElement={<ErrorPage/>}>
            <Route index element={<Home/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/donuts" element={<DonutsPage/>}/>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/cold-drinks" element={<ColdDrinksPage />}/>
            <Route path="/hot-drinks" element={<HotDrinksPage />}/>
            <Route path="/update-menu" element={<AddNewItemPage />}/>
            <Route path="/orders" element={<AllOrdersPage />}/>
            <Route path="/my-order" element={<MyOrdersPage />}/>
            <Route path="/please-login" element={<PleaseLogInPage />}/>
            <Route path="*" element={<img className={"error404"} src='./src/images/bild.jpg' alt="error donut page" /> }/>
        </Route>

    ])
);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
                <RouterProvider router={router}/>
    </React.StrictMode>
);