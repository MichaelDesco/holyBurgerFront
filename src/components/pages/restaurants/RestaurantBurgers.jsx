import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

const RestaurantBurgers = () => {
    const { id } = useParams();
    const [burgers, setBurgers] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/restaurants/${id}/burgers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((dataJson) => dataJson.json())
        .then((dataJs) => setBurgers(dataJs.data)); 
    }, [id]);

    return (
        <div>
            <Header />
                {burgers && burgers.map((burger) => (
                    <div key={burger.id}>
                        <h1>{burger.name}</h1>
                        {/* <img src={burger.picture} alt={burger.name} /> */}
                        <p>{burger.description}</p>
                        <p>{burger.price}</p>
                    </div>
                ))}
            <Footer />
        </div>
    )
}

export default RestaurantBurgers;

