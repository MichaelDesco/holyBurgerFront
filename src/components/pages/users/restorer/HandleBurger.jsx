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
    <>
      <Header />
      <form className="handle" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-items">
            <label>
              Nom du burger
              <input type="text" name="name" />
            </label>
            <label>
              Prix
              <input type="number" name="price" />
            </label>
            <label>
              Restaurant
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
            </label>
          </div>
          <div className="form-items">
            <label>
              Garniture
              <input type="text" name="garniture" />
            </label>
            <label>
              Fromage
              <input type="text" name="fromage" />
            </label>
            <label>
              Sauce
              <input type="text" name="sauce" />
            </label>
          </div>
        </div>
        <button className="btn-custom" type="submit">Créer</button>
      </form>
    </>
  );
};

export default HandleBurger;

