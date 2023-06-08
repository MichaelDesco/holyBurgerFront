import Header from "../../layout/header/Header";
import SpaceBetweenItem from "../../layout/space-between/SpaceBetweenItem";
import Footer from "../../layout/footer/Footer";
import { useEffect, useState } from "react";
import "./burgers.scss";

const Burgers = () => {
  const [burgers, setBurgers] = useState([]);
  // const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
    let apiUrl = "http://localhost:5001/api/burgers";
    // if (searchValue) {
    //     // encodeURIComponent() is used to encode special characters
    //   apiUrl += `?search=${encodeURIComponent(searchValue)}`;
    // }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBurgers(data.data);
      });
  }, []);
// }, [searchValue]);

  return (
    <div className="component-burgers">
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
                  <h3>🍔{burger.name}🍔</h3>
                  <img className="imgBurger" src={burger.picture} alt={burger.name} />
                  <p>{burger.cooker}</p>
                  <p>{burger.RestaurantId.name}</p>
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
          <p>No burgers found.</p>
        )}
        <SpaceBetweenItem />
      <Footer />
    </div>
  );
};

export default Burgers;
