import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={logo} width="110" height="100" alt="Art By Arina" />
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/courses">
              Manage Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/clients">
              Manage Clients
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
