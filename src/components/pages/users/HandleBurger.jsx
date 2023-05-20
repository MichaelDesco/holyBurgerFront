import React, { useEffect } from "react";
import Header from "../../layout/header/Header";
import { useNavigate } from "react-router";
import "./handle.scss"
// import RestaurantSelect from "./RestaurantSelect";


const HandleBurger = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const name = e.target.name.value;
    const price = e.target.price.value;
    const garniture = e.target.garniture.value;
    const fromage = e.target.fromage.value;
    const sauce = e.target.sauce.value;
    
    fetch("http://localhost:5001/api/burgers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")} ${localStorage.getItem("roles")}`,
      },
      body: JSON.stringify({
        name: name,
        price: price,
        garniture: garniture,
        fromage: fromage,
        sauce: sauce
      }),
    })
      .then((dataJson) => dataJson.json())
      .then((dataJs) => {
        console.log(dataJs);
        navigate("/burgers");
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
            <label>
              Nom du burger
              <input type="text" name="name" />
            </label>
            <label>
              Prix
              <input type="number" name="price" />
            </label>
            {/* <RestaurantSelect /> */}
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
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default HandleBurger;
