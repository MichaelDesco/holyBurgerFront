import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Footer from "../../layout/footer/Footer.tsx";
import Header from "../../layout/header/Header.tsx";
import Stars from "../../layout/stars/Stars.tsx";
import "./burgers.scss";

// Définition des types pour les burgers et les restaurants
interface Restaurant {
  id: number;
  name: string;
}

interface Burger {
  id: number;
  name: string;
  averageRating: number;
  picture: string;
  garniture: string;
  fromage: string;
  sauce: string;
  Restaurant: Restaurant;
  RestaurantId: number;
}

const Burgers = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // State pour stocker les burgers et les états d'affichage des avis
  const [showReview, setShowReview] = useState<boolean[]>([]);
  const [burgers, setBurgers] = useState<Burger[]>([]);

  const isTaster = localStorage.getItem("roles")?.includes("goûteur");

  // Gestionnaire de clic pour afficher/masquer les avis
  const reviewClick = (id: number) => {
    setShowReview((prevShowReview) =>
      prevShowReview.map((value, index) => (index === id ? !value : value))
    );
  };

  // Récupération des données des burgers depuis l'API
  useEffect(() => {
    fetch("http://localhost:5001/api/burgers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch burgers!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Burgers data from API:", data);
        const initialShowReview = Array.from(
          { length: data.data.length },
          () => false
        );

        setBurgers(data.data);
        setShowReview(initialShowReview);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fonction pour soumettre un avis
  const submitReview = () => {
    MySwal.fire({
      title: <p>Merci, votre avis a bien été envoyé.</p>,
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/users/handle-review");
    });
  };

  return (
    <div className="component-burgers">
      <Helmet>
        <title>Holy·Burgers</title>
      </Helmet>
      <Header />
      {burgers && burgers.length > 0 ? (
        burgers.map((burger, index) => (
          <div className="container-flexbox" key={burger.id}>
            <div className="container-burger">
              <div className="burger">
                <div className="review-btn">
                  <h3>
                    {burger.name} <span>{burger.averageRating}</span>
                  </h3>
                  {isTaster && (
                    <button onClick={() => reviewClick(index)}>
                      Donnez votre avis
                    </button>
                  )}
                </div>
                <p>{burger.Restaurant.name}</p>
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
            {showReview[index] && (
              <Stars
                burgerId={burger.id}
                restaurantId={burger.RestaurantId}
                submitReview={submitReview}
              />
            )}
          </div>
        ))
      ) : (
        <p>Aucun burger trouvé!</p>
      )}
      <Footer />
    </div>
  );
};

export default Burgers;
