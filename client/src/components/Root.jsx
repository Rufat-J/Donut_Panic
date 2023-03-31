import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from 'react-router-dom'

export default function Root() {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}
