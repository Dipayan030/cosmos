import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet , ScrollRestoration } from "react-router-dom";

function Layout() {
    return(
        <>
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        </>
    );
};

export default Layout