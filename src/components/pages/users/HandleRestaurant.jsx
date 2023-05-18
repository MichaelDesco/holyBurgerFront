import React, { useState } from "react";
import Header from "../../layout/header/Header";
import "./handle.scss";


const HandleRestaurant = () => {
  const [create, setCreate] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("number", e.target.number.value);
    formData.append("street", e.target.street.value);
    formData.append("postCode", e.target.postCode.value);
    formData.append("city", e.target.city.value);
    formData.append("picture", e.target.picture.files[0]); // Utilisez l'index 0 pour récupérer le fichier
    formData.append("telephone", e.target.telephone.value);
    formData.append("mail", e.target.mail.value);
    fetch("http://localhost:5000/api/restaurants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCreate(true);
        setRestaurantName(data.name);
      })
      .catch((error) => console.log(error));
  };
  

  return (
    <div>
      <Header />
      {create ? (
        <p>Le restaurant {restaurantName} a bien été créé</p>
      ) : (
        <form
          className="handle"
          onSubmit={handleSubmit}
          action="/api/restaurants"
          method="POST"
        >
          <div className="form-group">
            <div className="form-items">
              <label>
                Nom du restaurant
                <input type="text" id="name" name="name" />
              </label>
              <label>
                Mail
                <input type="email" id="mail" name="mail" />
              </label>
              <label>
                Téléphone
                <input type="tel" id="telephone" name="telephone" />
              </label>
              <label>
                Photo
                <input type="file" id="picture" name="picture" />
              </label>
            </div>
            <div className="form-items">
              <label>
                Numéro de rue
                <input type="number" id="number" name="number" />
              </label>
              <label>
                Address
                <input type="text" id="street" name="street" />
              </label>
              <label>
                Code postal
                <input type="text" id="postCode" name="postCode" />
              </label>
              <label>
                Ville
                <input type="text" id="city" name="city" />
              </label>
            </div>
          </div>
          <button type="submit">Créer</button>
        </form>
      )}
    </div>
  );
};

export default HandleRestaurant;



