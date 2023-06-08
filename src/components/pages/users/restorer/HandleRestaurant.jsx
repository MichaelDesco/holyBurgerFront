import React, { useEffect } from "react";
import Header from "../../../layout/header/Header";
import { useNavigate } from "react-router";
import "./handle.scss"


const HandleRestaurant = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const mail = e.target.mail.value;
    const telephone = e.target.telephone.value;
    const number = e.target.number.value;
    const street = e.target.street.value;
    const postCode = e.target.postCode.value;
    const city = e.target.city.value;


    fetch("http://localhost:5001/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}  ${localStorage.getItem("roles")}`,
      },
      body: JSON.stringify({
        name: name,
        mail: mail,
        telephone: telephone,
        number: number,
        street: street,
        postCode: postCode,
        city: city,
        userId: localStorage.getItem("id"),
      }),
    })
      .then((dataJson) => dataJson.json())
      .then((dataJs) => {
        console.log(dataJs);
        navigate("/restaurants");
      })
      .catch((error) => console.log(error));
  };


  return (
    <div>
      <Header />
      <form
        className="handle"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <div className="form-items">
            <label htmlFor="name">
              Nom du restaurant
              <input type="text" name="name" />
            </label>
            <label htmlFor="mail">
              Mail
              <input type="email" name="mail" />
            </label>
            <label htmlFor="telephone">
              Téléphone
              <input type="tel" name="telephone" />
            </label>
          </div>
          <div className="form-items">
            <label htmlFor="number">
              Numéro de rue
              <input type="text" name="number" />
            </label>
            <label htmlFor="street">
              Address
              <input type="text" name="street" />
            </label>
            <label htmlFor="postCode">
              Code postal
              <input type="text" name="postCode" />
            </label>
            <label htmlFor="city">
              Ville
              <input type="text" name="city" />
            </label>
          </div>
        </div>
        <button className="btn-custom" type="submit">Créer</button>
      </form>
    </div>
  );
};

export default HandleRestaurant;



