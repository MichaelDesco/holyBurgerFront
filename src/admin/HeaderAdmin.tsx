import React from "react";
import { Link } from "react-router-dom";
import "./admin.scss";

const HeaderAdmin: React.FC = () => {
  const handleLogOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("roles");
    window.location.href = "/";
  };

  return (
    <header className="header-admin">
      <nav className="navbar navbar-expand-lg bg-body-tertiary nav-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            Holy Burger Administration
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/restaurants">
                  Restaurant
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/burgers">
                  Burger
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/handle_users">
                  Utilisateur
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link exit" to="/" onClick={handleLogOut}>
                  déconnexion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
