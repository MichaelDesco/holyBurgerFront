import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../../layout/header/Header";
import "./handle.scss";

const HandleBurger = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, [navigate]);

  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5001/api/restaurants/byuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userRestaurants = data.data.filter(restaurant => restaurant.UserId === Number(id));
        setRestaurants(userRestaurants);
      })
      .catch((error) => console.log(error));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const garniture = e.target.garniture.value;
    const fromage = e.target.fromage.value;
    const sauce = e.target.sauce.value;
    const restaurantId = e.target.restaurant.value;

    fetch("http://localhost:5001/api/burgers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token} ${localStorage.getItem("roles")}`,
      },
      body: JSON.stringify({
        name: name,
        price: price,
        garniture: garniture,
        fromage: fromage,
        sauce: sauce,
        restaurantId: restaurantId
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data);
        navigate(`/restaurants/${restaurantId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="handle-page">
      <Header />
      <form className="handle" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-items">
            <label>Nom du burger</label>
            <input type="text" name="name" />
            <label>Prix</label>
            <input type="number" name="price" />
            <label>Restaurant</label>
            <select className="restaurant-select" name="restaurant">
              <option className="restaurant-option" value=""></option>
              {restaurants ? (
                restaurants.map((restaurant) => {
                  return <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>;
                })
              ) : (
                <option value="">Vous n'avez pas encore de restaurant</option>
              )}
            </select>
          </div>
          <div className="form-items">
            <label>Garniture</label>
            <input type="text" name="garniture" />
            <label>Fromage</label>
            <input type="text" name="fromage" />
            <label>Sauce</label>
            <input type="text" name="sauce" />
          </div>
        </div>
        <button className="btn-custom" type="submit">Créer</button>
      </form>
    </div>
  );
};

export default HandleBurger;

