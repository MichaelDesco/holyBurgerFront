import React from "react";
import { Link } from "react-router-dom";
import "./register.scss";

const Register: React.FC = () => {
  // Récupérer les données du localStorage (en prenant soin de gérer les valeurs potentiellement nulles)
  const role: string | null = localStorage.getItem("roles");
  const username: string | null = localStorage.getItem("username") || "";
  const picture: string | null = localStorage.getItem("picture") || "";

  return (
    <div className="container-login-signup">
      <div className="slogan">
        <h1>"Laissez-vous tenter et prenez du plaisir à chaque bouchée !"</h1>
      </div>
      <div id="main-header">
        <div className="container-about">
          <Link to="/about" className="btn-about">
            ABOUT
          </Link>
        </div>
        <div className="container-btn-register">
          {/* Afficher le contenu en fonction de la présence de 'role' dans localStorage */}
          {!role ? (
            <div>
              <Link to="/login" className="login">
                <div className="push">
                  <h2>PUSH</h2>
                  <p>Login</p>
                </div>
              </Link>
              <Link to="/signup" className="signup">
                <p>Signup</p>
              </Link>
            </div>
          ) : (
            <div className="username">
              <img
                className="image-user-connect"
                src={picture}
                alt={username}
              />
              <p>{username}</p>
              <p>connecté</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
