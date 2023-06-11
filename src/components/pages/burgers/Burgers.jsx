import Header from "../../layout/header/Header";
import SpaceBetweenItem from "../../layout/space-between/SpaceBetweenItem";
import Footer from "../../layout/footer/Footer";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import "./burgers.scss";

const Burgers = () => {
  const [burgers, setBurgers] = useState([]);
  // const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
    // let apiUrl = "http://localhost:5001/api/burgers";
    // if (searchValue) {
    //     // encodeURIComponent() is used to encode special characters
    //   apiUrl += `?search=${encodeURIComponent(searchValue)}`;
    // }

    fetch("http://localhost:5001/api/burgers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failde to fetch burgers!");
        }
        return response.json();
      })
      .then((data) => {
        setBurgers(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
// }, [searchValue]);

  return (
    <div className="component-burgers">
      <Helmet>
        <title>Holy·Burgers</title>
      </Helmet>
      <Header />
      <SpaceBetweenItem />
        {/* <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Rechercher un burger"
        /> */}
        {burgers && burgers.length > 0 ? (
          burgers.map((burger) => (
            <div className="container-flexbox" key={burger.id}>
              <div className="container-burger">
                <div className="burger">
                  <h3>{burger.name}</h3>
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
            </div>
          ))
        ) : (
          <p>Aucun burger trouvé!</p>
        )}
        <SpaceBetweenItem />
      <Footer />
    </div>
  );
};

export default Burgers;

