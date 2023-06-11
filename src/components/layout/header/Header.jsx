import { Link } from "react-router-dom";
import holyBurgerLogo from "./holy-burger-logo.png"; // Importez l'image
import "./header.scss";

const Header = () => {
  const isTaster = localStorage.getItem("roles")?.includes("goûteur");
  const isRestorer = localStorage.getItem("roles")?.includes("restaurateur");
  const id = localStorage.getItem("id");

  return (
    <>
      <header className="d-flex justify-content-center align-items-center">
        <section class="container-fluid d-flex justify-content-center align-items-center">
          <div class="container d-flex d-row">
            <div className="logo">
              {/* Utilisez la variable holyBurgerLogo comme source de l'image */}
              <img className="navbar-brand" src={holyBurgerLogo} alt="logo" />
              
            </div>
            <nav className="navbar navbar-expand-lg d-flex ">
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
              <div className="collapse navbar-collapse div-menu" id="navbarNav">
                <ul className="navbar-nav menu d-flex justify-content-evenly align-items-center">
                  <li className="nav-item menu-link">
                    <Link to={"/"} className="nav-link btn btn-warning accueil" aria-current="page">
                      ACCUEIL
                    </Link>
                  </li>
                  <li className="nav-item menu-link">
                    <Link to={"/burgers"} className="nav-link btn btn-warning burger">
                      BURGER
                    </Link>
                  </li>
                  <li className="nav-item menu-link">
                    <Link to={"/restaurants"} className="nav-link btn btn-warning restaurant">
                      RESTAURANT
                    </Link>
                  </li>
                  {isTaster && (
                    <li className="nav-item">
                      <Link to={`/users/${id}`} className="nav-link btn btn-warning goodie">
                      PROFIL🍔
                      </Link>
                    </li>
                  )}
                  {isRestorer && (
                    <li className="nav-item">
                      <Link to={`/users/${id}`} className="nav-link btn btn-warning goodie">
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
      <div className="slogan d-flex">
        <h1>« Devenez un mordu de burger grâce à nos bons plans ! »</h1>
      </div>
    </>
  );
};

export default Header;