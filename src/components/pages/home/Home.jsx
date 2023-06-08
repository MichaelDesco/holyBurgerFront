import Header from "../../layout/header/Header";
import Register from "../../layout/register/Register";
import SpaceBetweenItem from "../../layout/space-between/SpaceBetweenItem";
import SpaceBetweenSection from "../../layout/space-between/SpaceBetweenSection";
import Footer from "../../layout/footer/Footer";
import "./home.scss";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';


const Home = () => {
    const [randomRestaurant, setRandomRestaurant] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5001/api/restaurants/random", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setRandomRestaurant(data.data);
            });
    }, []);
    console.log(randomRestaurant);

    const [randomBurger, setRandomBurger] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5001/api/burgers/random", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setRandomBurger(data.data);
            });
    }, []);
    console.log(randomBurger);


    return (
        <>
            <Helmet>
                <title>HOLY·Burger🍔</title>
            </Helmet>
            <Header />
            <SpaceBetweenItem />
            <main>
                <Register />
                <SpaceBetweenSection />
                <div className="container-top">
                    <div id="section-top">
                        <div className="section-top-title">
                            <h3>HOLY DAY'S</h3>
                        </div>
                        <div className="section-top-categorie">
                            <div className="section-top-items">
                                {(randomRestaurant) ?
                                    (
                                        <div className="section-top-item right">
                                            <h4 className="section-top-categorie-title">HOLY RESTAURANT</h4>
                                            <div className="section-top-card">
                                                <h5>{randomRestaurant.name}</h5>
                                                <img className="img-restaurant" src={randomRestaurant.picture} alt={randomRestaurant.name} />
                                            </div>
                                            <div className="voir">
                                                <a href="#header">+ de restaurant</a>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <p>chargement...</p>
                                    )
                                }
                                {(randomBurger) ?
                                    (
                                        <div className="section-top-item left">
                                            <h4 className="section-top-categorie-title">HOLY BURGER</h4>
                                            <div className="section-top-card">
                                                <h5>{randomBurger.name}</h5>
                                                <img className="img-burger" src={randomBurger.picture} alt={randomBurger.name} />
                                            </div>
                                            <div className="voir">
                                                <a href="#header">+ de burgers</a>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <p>chargement...</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <SpaceBetweenSection />
            </main>
            <Footer />
        </>
    );
}

export default Home;

