import React from "react";
import "./footer.scss";
import holyBurgerLogo from "./holy-burger-logo.png"; // Importez l'image

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <img className="logo-footer" src={holyBurgerLogo} alt="logo" />
      <div className="developpement">
        <p>Descorcier Michaël © 2023 Holy Burger</p>
      </div>
    </footer>
  );
};

export default Footer;
