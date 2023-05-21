import { Link } from "react-router-dom";
import holyBurgerLogo from "./holy-burger-logo.png"; // Importez l'image

import "./header.scss";

const Header = () => {
  const isAdmin = localStorage.getItem("roles")?.includes("admin");
  const isTaster = localStorage.getItem("roles")?.includes("taster");
  const isRestorer = localStorage.getItem("roles")?.includes("restorer");
  const id = localStorage.getItem("id");
  console.log(id);

  return (
    <header>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="col-lg-12 col-sm-8 col-ls-4 top-header">
          <div className="col-3 d-flex justify-content-center div-logo">
            {/* Utilisez la variable holyBurgerLogo comme source de l'image */}
            <img className="navbar-brand header-logo" src={holyBurgerLogo} alt="logo" />
          </div>
          <div className="col-8 container-slogan-menu">
            <div className="slogan">
              <h1>« Devenez un mordu de burger grâce à nos bons plans ! »</h1>
            </div>
            <div className="container-fluid nav-css">
              <div className="collapse-horizontal navbar-collapse btn-responsive" id="navbarNav">
                <ul className="navbar-nav">
                  <div className="top-header-menu">
                    <li className="nav-item">
                      <Link to={"/"} className="nav-link btn btn-warning accueil" aria-current="page">
                        ACCUEIL
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/burgers"} className="nav-link btn btn-warning burger">
                        BURGERS
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/restaurants"} className="nav-link btn btn-warning restaurant">
                        RESTAURANTS
                      </Link>
                    </li>
                    {isAdmin && (
                      <li className="nav-item">
                        <Link to="/admin" className="nav-link btn btn-warning goodie">
                          ADMIN
                        </Link>
                      </li>
                    )}
                    {isTaster && (
                      <li className="nav-item">
                        <Link to={`/users/${id}`} className="nav-link btn btn-warning goodie">
                          PROFIL
                        </Link>
                      </li>
                    )}
                    {isRestorer && (
                      <li className="nav-item">
                        <Link to={`/users/${id}`} className="nav-link btn btn-warning goodie">
                          PROFIL
                        </Link>
                      </li>
                    )}
                  </div>
                </ul>
              </div>
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
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
