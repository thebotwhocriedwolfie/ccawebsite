//import React from "react";
import React, { useState } from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utlize the react router.
import { NavLink, useLocation } from "react-router-dom";
import tpImage from "./images/tp.png";

// Here, we display our Navbar
export default function Navbar() {
    const location = useLocation(); // get the current route

    if (location.pathname === "/login") {
        return null; // dont show navbar in the login page
      }
    if (location.pathname === "/record2") {
        return null; // dont show navbar in the login page
      }

    const [notifications, setNotifications] = useState([ ]);

    return (
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#"><img src={tpImage} width="50" height="50" className="d-incline-block align-text-top"></img></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/home">
                    Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/record">
                    Records</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/create">
                    Create</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/event">
                    Events</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/createEvent">
                    Add Event</NavLink>
                    </li>
                </ul>
            </div>
        </div>
       </nav> 
    );
}