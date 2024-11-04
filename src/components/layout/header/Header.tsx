import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../log-out/LogoutButton.tsx";
import "./header.scss";
import holyBurgerLogo from "./holy-burger-logo.png"; // Importez l'image

const Header: React.FC = () => {
  const role = localStorage.getItem("roles");
  const isTaster = role?.includes("goûteur");
  const isRestorer = role?.includes("restaurateur");
  const id = localStorage.getItem("id");
  const location = useLocation();
  const { pathname } = location;

  // Fonctions pour déterminer si les liens doivent être actifs ou non
  const isActiveHome = pathname === "/";
  const isActiveBurgers = pathname === "/burgers";
  const isActiveRestaurants = pathname === "/restaurants";
  const isActiveProfile = id ? [`/users/${id}`].includes(pathname) : false;

  return (
    <header className="header-classic d-flex">
      {role ? <LogoutButton /> : null}
      <section className="container-fluid d-flex">
        <div className="container d-flex d-row">
          <div className="logo d-flex align-items-center">
            <img className="navbar-brand" src={holyBurgerLogo} alt="logo" />
          </div>
          <nav className="navbar navbar-expand-lg d-flex align-items-end">
            <button
              className="navbar-toggler btn custom"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="btn btn-warning">Menu</span>
            </button>
            <div className="collapse navbar-collapse menu" id="navbarNav">
              <ul className="navbar-nav">
                {!isActiveHome && (
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link btn btn-warning accueil"
                      aria-current="page"
                    >
                      ACCUEIL
                    </Link>
                  </li>
                )}
                {!isActiveBurgers && (
                  <li className="nav-item menu-link">
                    <Link
                      to="/burgers"
                      className="nav-link btn btn-warning burger"
                    >
                      BURGER
                    </Link>
                  </li>
                )}
                {!isActiveRestaurants && (
                  <li className="nav-item menu-link">
                    <Link
                      to="/restaurants"
                      className="nav-link btn btn-warning restaurant"
                    >
                      RESTAURANT
                    </Link>
                  </li>
                )}
                {!isActiveProfile && isTaster && (
                  <li className="nav-item">
                    <Link
                      to={`/users/${id}`}
                      className="nav-link btn btn-warning profil"
                    >
                      PROFIL🍔
                    </Link>
                  </li>
                )}
                {!isActiveProfile && isRestorer && (
                  <li className="nav-item">
                    <Link
                      to={`/users/${id}`}
                      className="nav-link btn btn-warning profil"
                    >
                      PROFIL🍔
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </header>
  );
};

export default Header;
