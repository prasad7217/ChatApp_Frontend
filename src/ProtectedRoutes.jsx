import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProtectedRoutes = ({ role }) => {

    // const { id } = useParams();

    const navigate = useNavigate();

    const isUser = async () => {
        const res = await axios.post("http://localhost:7777/api/role", {
            id,
            role
        }, { withCredentials: true });

        if (res?.data?.success) {
            navigate("/profile/"+id);
        } else {
            navigate("/login")
        }
    }

    const isAdmin = async () => {
        const res = await axios.post("http://localhost:7777/api/adminrole", {
            id,
            role
        }, { withCredentials: true });

        if (res?.data?.success) {
            navigate("/admin/dashboard/"+id);
        } else {
            navigate("/admin/login")
        }

    }

    if (role === "user") {
        isUser();
    }

    if (role === "admin") {
        isAdmin();
    }

}

export default ProtectedRoutes;