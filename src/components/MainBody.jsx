import React from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainBody = () => {
    return (
        <>
            <Navbar />
            <div className="mt-14">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default MainBody;