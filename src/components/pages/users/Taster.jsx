import Header from "../../layout/header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./profil.scss";

const Taster = () => {
  const { id, role } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")} + ${localStorage.getItem("roles")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data.data))
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
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
              <Link className="btn-taster" to={"/users/update"}>
                Modifier mon profil
              </Link>
              <Link className="btn-taster" to="#">
                Voir mes avis
              </Link>
              <Link className="btn-taster" to="/" onClick={handleLogOut}>
                Me déconnecter
              </Link>
            </aside>
          </section>
        </main>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Taster;

