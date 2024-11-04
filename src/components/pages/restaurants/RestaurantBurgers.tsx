import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Footer from "../../layout/footer/Footer.tsx";
import Header from "../../layout/header/Header.tsx";
import "./restaurant-burgers.scss";

// Define the types for the burger data
interface Burger {
  id: number;
  name: string;
  averageRating: number;
  picture: string;
  garniture: string;
  fromage: string;
  sauce: string;
}

// Define the response type from the API
interface ApiResponse {
  data: Burger[];
  restaurantName: string;
}

const RestaurantBurgers: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Specify the type for useParams
  const [burgers, setBurgers] = useState<Burger[] | null>(null);
  const [restaurantName, setRestaurantName] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:5001/api/restaurants/${id}/burgers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json() as Promise<ApiResponse>) // Type the response
      .then((data) => {
        setBurgers(data.data);
        console.log("burgers:", data);
        setRestaurantName(data.restaurantName);
      })
      .catch((error) => {
        console.error("Error fetching burgers:", error);
      });
  }, [id]);

  return (
    <div className="component-burgers">
      <Helmet>
        <title>{restaurantName && `${restaurantName} 🍔`}</title>
      </Helmet>
      <Header />
      {burgers && burgers.length > 0 ? (
        burgers.map((burger) => (
          <div key={burger.id}>
            <div className="container-flexbox">
              <div className="container-burger">
                <div className="burger">
                  <h3>
                    {burger.name} {burger.averageRating}
                  </h3>
                  <img
                    className="imgBurger"
                    src={burger.picture}
                    alt={burger.name}
                  />
                </div>
                <div className="description">
                  <h4>Ingrédients</h4>
                  <p>{burger.garniture}</p>
                  <p>{burger.fromage}</p>
                  <p>{burger.sauce}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun burger n'as été ajouté à ce restaurant!</p>
      )}
      <Footer />
    </div>
  );
};

export default RestaurantBurgers;
