import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet , ScrollRestoration } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";

function Layout() {
    return(
        <AuthProvider>
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollRestoration />
        </AuthProvider>
    );
};

export default Layout