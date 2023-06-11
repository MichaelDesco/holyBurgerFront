import './footer.scss'
import SpaceBetweenSection from "../space-between/SpaceBetweenSection";

import holyBurgerLogo from "./holy-burger-logo.png"; // Importez l'image

const Footer = () => {
    return (
        <>
        <SpaceBetweenSection />
            <footer id="footer">
                <img className="logo-footer" src={holyBurgerLogo} alt="logo" />
                <div className="developpement">
                    <p>Descorcier Michaël © 2023 Holy Burger</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;