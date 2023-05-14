import React from "react";
import { Link } from "react-router-dom"
import LogoSm from "../Icons/icoonssm.png"

function ErrorPage() {
    return <main className="error-main">
        <div className="error-container">
            <Link to="/" ><img src={LogoSm} alt="logo" /></Link>
            <h1>404</h1>
            <p>Pagina non esiste.</p>
        </div>
    </main >
}

export default ErrorPage;