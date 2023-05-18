import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./restaurants.scss";

const RestaurantItem = ({ restaurant }) => {
  return (
    <div className="container-burger">
      <div className="burger">
        <h3>{restaurant.name}</h3>
        <img className="imgRestaurant" src={restaurant.picture} alt={restaurant.name} />
        <Link to={`/restaurants/${restaurant.id}`} className="linkBurger">Voir les burgers</Link>
      </div>
      <RestaurantDescription address={restaurant.address} telephone={restaurant.telephone} mail={restaurant.mail} />
    </div>
  );
};

const RestaurantDescription = ({ address, telephone, mail }) => {
  return (
    <div className="description">
      <h4>Adresse</h4>
      <p>{address.number}</p>
      <p>{address.street}</p>
      <p>{address.postCode}</p>
      <p>{address.city}</p>
      <h4>Contact</h4>
      <p>{telephone}</p>
      <p>{mail}</p>
    </div>
  );
};

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.data);
      });
  }, []);

  return (
    <div className="component-burgers">
      <Header />
      {restaurants.map((restaurant) => (
        <div className="container-flexbox" key={restaurant.id}>
          <RestaurantItem restaurant={restaurant} />
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Restaurants;

