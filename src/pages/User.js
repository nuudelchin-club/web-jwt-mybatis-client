import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

export default function User() {
    
    const { user, logout } = useAuth();
    const navigate = useNavigate();

console.log("Current User:", user);
    
    useEffect(() => {
        authFetch("/user", {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => console.log(data));
    }, []);

    const handleHome = () => {
        navigate("/");
    };

    return (
        <div>
            <h1>User</h1>
            <p>My name, {user.name}</p>
            <div>
                <button onClick={handleHome}>Go To Home</button>
            </div>
            <div>
                <button onClick={logout}>Logout</button>
            </div>            
        </div>
    );
}