import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from 'react-router-dom'
import {UserProvider} from "../UserContext.jsx";
import {CartProvider} from "./CartContext.jsx";
import {MenuProvider} from "../menuContext.jsx";

export default function Root() {
    return (
        <>
            <UserProvider>
                <MenuProvider>
                    <CartProvider>
                        <Navbar/>
                        <Outlet/>
                        <Footer/>
                    </CartProvider>
                </MenuProvider>
            </UserProvider>
        </>
    );
}
