import React from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainBody = () => {
    return (
        <>
            <Navbar />
            <main className="flex-1 overflow-y-auto mt-14">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainBody;