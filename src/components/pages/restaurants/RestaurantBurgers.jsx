import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

import "./restaurant-burgers.scss";

const RestaurantBurgers = () => {
    const { id } = useParams();
    const [burgers, setBurgers] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5001/api/restaurants/${id}/burgers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((dataJson) => dataJson.json())
        .then((dataJs) => setBurgers(dataJs.data));
    }, [id]);

    return (
        <div className="component-burgers">
            <Header />
                {burgers && burgers.map((burger) => (
                    <div key={burger.id}>
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
                    </div>
                ))}
            <Footer />
        </div>
    )
}

export default RestaurantBurgers;

