import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import { Helmet } from 'react-helmet';
import "./restaurant-burgers.scss";

const RestaurantBurgers = () => {
    const { id } = useParams();
    const [burgers, setBurgers] = useState(null);
    const [restaurantName, setRestaurantName] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5001/api/restaurants/${id}/burgers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setBurgers(data.data);
                setRestaurantName(data.restaurantName);
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
                        <div className="container-flexbox" key={burger.id}>
                            <div className="container-burger">
                                <div className="burger">
                                    <h3>{burger.name}</h3>
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
                    </div>
                ))
            ) : (
                <p>Aucun burger n'as été ajouté a ce restaurant!</p>
            )}
            <Footer />
        </div>
    )
}

export default RestaurantBurgers;

