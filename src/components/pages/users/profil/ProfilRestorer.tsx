import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../layout/header/Header.tsx";
import "./profil.scss";

// Interface pour les paramètres d'URL
interface UrlParams {
  [key: string]: string | undefined;
  id?: string;
  role?: string;
}

// Interface pour l'utilisateur
interface User {
  id: string;
  username: string;
  roles: string;
  mail: string;
  picture: string;
}

// Interface pour la réponse de l'API
interface ApiResponse {
  data: User;
}

const ProfilRestorer: React.FC = () => {
  const navigate = useNavigate();
  const { id, role } = useParams<UrlParams>();
  const [user, setUser] = useState<User | null>(null);

  // Vérification de l'authentification
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("jwt");
      localStorage.removeItem("roles");
      navigate("/");
    }
  }, [navigate]);

  // Récupération des données utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "jwt"
            )} ${localStorage.getItem("roles")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const data: ApiResponse = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, role]);

  const handleLogOut = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("roles");
    window.location.replace("/");
  };

  return (
    <div className="component-profil">
      <Header />
      {user ? (
        <main key={user.id}>
          <section>
            <div className="usernav">
              <Link className="btn-taster" to="/users/update">
                Modifier profil
              </Link>
              <Link className="btn-taster" to="/users/handle_restaurant">
                Gestion Restaurant
              </Link>
              <Link className="btn-taster" to="/users/handle_burger">
                Gestion Burger
              </Link>
            </div>
            <div className="container-profil">
              <div className="profil">
                <img src={user.picture} alt={user.username} />
                <input type="file" name="file" id="file" />
              </div>
              <div className="description">
                <h2>{user.username}</h2>
                <p>{user.roles}</p>
                <p>{user.mail}</p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ProfilRestorer;
