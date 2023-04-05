import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from 'react-router-dom'
import {UserProvider} from "../UserContext.jsx";
import {CartProvider} from "./CartContext.jsx";

export default function Root() {
    return (
        <>

                <CartProvider>
                    <UserProvider>
                <Navbar/>

                    <Outlet/>

                <Footer/>
                    </UserProvider>
                </CartProvider>

        </>
    );
}
