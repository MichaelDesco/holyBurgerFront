import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../../../layout/header/Header";
import "./handle.scss";

const HandleRestaurant = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, [navigate, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    // Ajouter l'ID de l'utilisateur aux données envoyées
    data.append("userId", id);

    fetch("http://localhost:5001/api/restaurants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token} ${localStorage.getItem("roles")}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        navigate("/restaurants");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="handle-page">
      <Header />
      <form className="handle" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="name">Nom du restaurant</label>
            <input type="text" name="name" />
            <label htmlFor="mail">Mail</label>
            <input type="email" name="mail" />
            <label htmlFor="telephone">Téléphone</label>
            <input type="tel" name="telephone" />
            <label htmlFor="picture">Photo du restaurant</label>
            <input type="file" name="picture" accept=".jpg, .jpeg, .png" />
          </div>
          <div className="form-items">
            <label htmlFor="number">Numéro de rue</label>
            <input type="text" name="number" />
            <label htmlFor="street">Address</label>
            <input type="text" name="street" />
            <label htmlFor="postCode">Code postal</label>
            <input type="text" name="postCode" />
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" />
          </div>
        </div>
        <button className="btn-custom" type="submit">
          Créer
        </button>
      </form>
    </div>
  );
};

export default HandleRestaurant;