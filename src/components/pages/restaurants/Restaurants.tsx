// Restaurants.tsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "../../layout/footer/Footer.tsx";
import Header from "../../layout/header/Header.tsx";
import SearchBar from "../../layout/search-bar/SearchBar.tsx";
import "./restaurants.scss";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]); // Stocker les résultats des restaurants
  const [searchTerm, setSearchTerm] = useState(""); // Stocker la chaîne de recherche

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    let apiUrl = "http://localhost:5001/api/restaurants";
    if (searchTerm) {
      apiUrl += `?search=${encodeURIComponent(searchTerm)}`;
    }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des restaurants :", error)
      );
  }, [searchTerm]);

  return (
    <>
      <Helmet>
        <title>HOLY·Restaurants</title>
      </Helmet>
      <Header />
      <SearchBar
        onSearch={handleSearch}
        placeholder="Rechercher un restaurant"
      />
      <div className="restaurants-container">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div className="container-flexbox" key={restaurant.id}>
              <div className="container-burger">
                <div className="burger">
                  <h3>🍔 {restaurant.name} 🍔</h3>
                  <img
                    className="imgRestaurant"
                    src={restaurant.picture}
                    alt={restaurant.name}
                  />
                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="linkBurger"
                  >
                    Voir les burgers
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
          ))
        ) : (
          <p>Aucun restaurant trouvé.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Restaurants;
