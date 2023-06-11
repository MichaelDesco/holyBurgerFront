import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import "./restaurants.scss";
import SpaceBetweenSection from "../../layout/space-between/SpaceBetweenSection";
import SpaceBetweenItem from "../../layout/space-between/SpaceBetweenItem";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/restaurants", {
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
    <>
      <Helmet>
        <title>HOLY·Restaurants</title>
      </Helmet>
      <Header />
      <SpaceBetweenItem />
      {restaurants.map((restaurant) => (
        <div className="container-flexbox" key={restaurant.id}>
          <div className="container-burger">
            <div className="burger">
              <h3>🍔{restaurant.name}🍔</h3>
              <img className="imgRestaurant"
                src={restaurant.picture}
                alt={restaurant.name} 
              />
              <Link to={`/restaurants/${restaurant.id}`}
                className="linkBurger">Voir les burgers
              </Link>
            </div>
            <div className="description">
              <h4>Adresse</h4>
              <p>{restaurant.number}</p>
              <p>{restaurant.street}</p>
              <p>{restaurant.postCode}</p>
              <p>{restaurant.city}</p>
              <h4>Contact</h4>
              <p>{restaurant.telephone}</p>
              <p>{restaurant.mail}</p>
            </div>
          </div>
        </div>
      ))}
      <SpaceBetweenSection />
      <Footer />
    </>
  );
};

export default Restaurants;