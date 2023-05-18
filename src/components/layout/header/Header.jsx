import { Link } from "react-router-dom";

import "./header.scss";


const Header = () => {
    const isAdmin = localStorage.getItem("roles")?.includes("admin");
    const isUser = localStorage.getItem("roles")?.includes("restorer", "taster");
    const id = localStorage.getItem("id");
    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="col-lg-12 col-sm-8 col-ls-4" id="top-header">
                    <div className="col-4 d-flex justify-content-center div-logo">
                        <img className="navbar-brand header-logo" src="./images/holy-burger-logo.png" alt="logo" />
                    </div>
                    <div className="col-8" id="container-slogan-menu">
                        <div className="slogan">
                            <h1>« Devenez un mordu de burger grâce à nos bons plans ! »</h1>
                        </div>
                        <div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <div className="top-header-menu">
                                        <li className="nav-item">
                                            <Link to={"/"} className="nav-link btn btn-warning accueil" aria-current="page">ACCUEIL</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/burgers"} className="nav-link btn btn-warning burger">BURGERS</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/restaurants"} className="nav-link btn btn-warning restaurant">RESTAURANTS</Link>
                                        </li>
                                        {isAdmin && (
                                            <li className="nav-item">
                                                <Link to="/admin" className="nav-link btn btn-warning goodie">
                                                ADMIN
                                                </Link>
                                            </li>
                                        )}
                                        {isUser && (
                                            <li className="nav-item">
                                                <Link to={`/users/${id}`} className="nav-link btn btn-warning goodie">
                                                    PROFIL
                                                </Link>
                                            </li>
                                        )}
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

