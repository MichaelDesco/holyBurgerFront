import Header from "../../layout/header/Header";
import Stars from "../../layout/stars/Stars";
import Footer from "../../layout/footer/Footer";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./burgers.scss";

const Burgers = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState([]);

  const isTaster = localStorage.getItem("roles")?.includes("goûteur");

  const reviewClick = (id) => {
    setShowReview((prevShowReview) =>
      prevShowReview.map((value, index) => (index === id ? !value : value))
    );
  };

  const [burgers, setBurgers] = useState([]);

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
        console.log("Burgers data from API:", data); // Log des données de burgers récupérées depuis l'API
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
    // Affichage de la pop-up
    MySwal.fire({
      title: <p>Merci, votre avis a bien été envoyé.</p>,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: "OK"
    }).then(() => {
      // Redirection vers le composant HandleReview
      navigate('/users/handle-review'); // Remplacez '/handle-review' par l'URL de votre composant HandleReview
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
                  <h3>{burger.name} <span>{burger.averageRating}</span></h3>
                  {isTaster && (
                    <button onClick={() => reviewClick(index)}>Donnez votre avis</button>
                  )}
                </div>
                <p>{burger.Restaurant.name}</p>
                <img className="imgBurger" src={burger.picture} alt={burger.name} />
              </div>
              <div className="description">
                <h4>Ingrédients</h4>
                <p>{burger.garniture}</p>
                <p>{burger.fromage}</p>
                <p>{burger.sauce}</p>
              </div>
            </div>
            {showReview.find((value, i) => i === index) && (
              <Stars burgerId={burger.id} 
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


