import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin.tsx";
import "./admin.scss";

// Définition des types pour un burger
interface Burger {
  id: number;
  name: string;
  picture: string;
  garniture: string;
  fromage: string;
  sauce: string;
}

const AdminBurgers: React.FC = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/burgers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBurgers(data.data);
        console.log(data);
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5001/api/burgers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBurgers(burgers.filter((burger) => burger.id !== id));
      });
  };

  return (
    <div className="container-admin">
      <Helmet>
        <title>Admin·Burger</title>
      </Helmet>
      <HeaderAdmin />
      <section>
        <div className="container-card d-flex flex-wrap justify-content-around align-items-space-around p-5 pb-5">
          {burgers.map((burger) => (
            <div
              key={burger.id}
              className="card mt-3 mb-3"
              style={{ width: "15rem" }}
            >
              <img
                className="card-img-top"
                src={burger.picture}
                alt={burger.name}
              />
              <div className="card-body">
                <h5 className="card-title">{burger.name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p>{burger.garniture}</p>
                </li>
                <li className="list-group-item">{burger.fromage}</li>
                <li className="list-group-item">{burger.sauce}</li>
              </ul>
              <div className="card-body">
                <Link to={"/admin/burgers/update"} className="card-link">
                  Update
                </Link>
                <button
                  className="card-link delete"
                  onClick={() => handleDelete(burger.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminBurgers;
