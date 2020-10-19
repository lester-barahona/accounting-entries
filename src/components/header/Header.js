import React from 'react'
import {NavLink } from "react-router-dom";
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto mr-auto">
                <NavLink exact={true} activeClassName='active' to="/" className="nav-link">
                Asientos
                </NavLink>    
                <NavLink exact={true} activeClassName='active' to="/mayorizacion" className="nav-link">
                Mayorización
                </NavLink> 
                <NavLink exact={true} activeClassName='active' to="/comprobacion" className="nav-link">
                Balanza de Comprobación
                </NavLink> 
                <NavLink exact={true} activeClassName='active' to="/resultados" className="nav-link">
                Estado de Resultados
                </NavLink> 
                <NavLink exact={true} activeClassName='active' to="/general" className="nav-link">
                Balance General
                </NavLink>

                </div>
            </div>
            </nav>
    )
}

export default Header
