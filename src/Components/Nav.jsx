import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Icons/logo-bianco_viola.png"

function Nav() {
    return <nav className="navbar">
        <div className="logo-container">
            <Link to="/">
                <img src={Logo} alt="logo" />
            </Link>
        </div>
    </nav>
}

export default Nav;