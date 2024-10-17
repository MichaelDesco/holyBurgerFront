import Header from "../../../layout/header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./profil.scss";

const ProfilTaster = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("roles");
      navigate("/");
    }
  }, [navigate]);
  
  const { id, role } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")} ${localStorage.getItem("roles")}`,
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
              <Link className="btn-taster" to={"/users/update"}>
                Modifier profil
              </Link>
              <Link className="btn-taster" to="/users/handle-review">
                Voir mes avis
              </Link>
              {/* <Link className="btn-taster" to="/" onClick={handleLogOut}>
                Déconnexion
              </Link> */}
            </div>
            <div className="container-profil">
              <div className="profil">
                <img src={user.picture} alt={user.username} />
                <input type="file" name="file" id="file" />
              </div>
              <div className="description">
                <h2>{user.username}</h2>
                <p>{user.roles}</p>
                <p>{user.mail.slice(0, user.mail.indexOf("@"))}@*****</p>
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

export default ProfilTaster;
