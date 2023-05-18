import LoginSignup from "./LoginSignup";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import SpaceBetweenSection from "../../layout/space-between/SpaceBetweenSection";
import SpaceBetweenItem from "../../layout/space-between/SpaceBetweenItem";
import "./home.scss";


const Home = () => {

    return (
        <div>
            <Header />
            <LoginSignup />
            <SpaceBetweenSection />
            <div className="container-top">
                <div id="section-top">
                    <div className="section-top-title">
                        <h3>HOLY NEWS</h3>
                    </div>
                    <div className="section-top-categorie">
                        <div className="section-top-items">
                            <div className="section-top-item">
                                <h4 className="section-top-categorie-title">HOLY RESTAURANT</h4>
                                <p>Découvrez le restaurant favori de la communauté !</p>
                                <div className="section-top-card">
                                    <h5>SUNNY BURGER</h5>
                                    <img className="latin-blood" src="./images/latin-blood.jpg" alt="latin blood"/>
                                </div>
                                <div className="voir">
                                    <a href="#header">+ de restaurant</a>
                                </div>
                            </div>
                            <div className="section-top-item">
                                <h4 className="section-top-categorie-title">HOLY BURGER</h4>
                                <p>Découvrez le burger du moment choisi par la communauté.</p>
                                <div className="section-top-card">
                                    <h5>LE FUEGO INFERNO</h5>
                                    <img className="western-bacon" src="./images/western-bacon.jpg" alt="western bacon"/>
                                </div>
                                <div className="voir">
                                    <a  href="#header">+ de burgers</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SpaceBetweenItem />
            <Footer />
        </div>
    );
}

export default Home;
