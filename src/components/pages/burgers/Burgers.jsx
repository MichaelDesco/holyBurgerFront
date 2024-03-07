import Header from "../../layout/header/Header";
import Stars from "../../layout/stars/Stars";
import Footer from "../../layout/footer/Footer";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import "./burgers.scss";

const Burgers = () => {
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
                  <h3>{burger.name} {burger.averageRating}</h3>
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
              <Stars burgerId={burger.id} />
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