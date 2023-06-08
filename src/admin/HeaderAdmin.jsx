import { Link } from "react-router-dom";
import './admin.scss';

const HeaderAdmin = () => {
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("jwt");
        localStorage.removeItem("roles");
        window.location.href="/";
    };
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary nav-custom">
                <div className="container-fluid">
                    <h1 className="navbar-brand" href="/admin">Holy Burger Administration</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/admin">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/admin/restaurants"}>Restaurant</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/admin/burgers"}>Burger</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/admin/handle_users"}>Utilisateur</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link exit" to={"/"} onClick={handleLogOut}>déconnexion</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderAdmin;

