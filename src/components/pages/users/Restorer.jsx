import Header from "../../layout/header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./profil.scss";

const Restorer = () => {

  const { id, role } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method:"GET",
      headers: {
        "content-type": "application/json",
        // le token est envoyé au back pour vérifier l'authentification
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,

      },
    })

    .then((dataJson) => dataJson.json())
    .then((dataJs) => setUser(dataJs.data));
  }, [id, role]);

  const handleLogOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    window.location.replace("/");
  };

  return (
    <div className="component-profil">
      <Header /> 
        {user ? (
          <main key={user.id}>
            <section>
              <div className="container-profil">
                <div className="profil">
                  <img src={user.picture} alt={user.username} />
                </div>
                <div className="description">
                  <h2>{user.username}</h2>
                  <p>{user.roles}</p>
                  <p>{user.mail}</p>
                </div>
              </div>
              <aside>
                <h3>Gestion du profil</h3>
                <Link className="btn-taster" to={"/users/update"}>Modifier mon profil</Link>
                <Link className="btn-taster" to={"/users/handle_restaurant"}>Gestion Restaurant</Link>
                <Link className="btn-taster" to={"/users/handle_burger"}>Gestion Burger</Link>
                <Link className="btn-taster" to={"/"} onClick={handleLogOut}>se déconnecter</Link>
              </aside>
            </section>
          </main>
        ) : (
          <p>Chargement...</p>
        )
      }
    </div>
  );
}

export default Restorer;

