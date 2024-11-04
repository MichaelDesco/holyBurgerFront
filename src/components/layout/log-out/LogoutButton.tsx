import React, { useEffect, useState } from "react";

const LogoutButton: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  // Gestionnaire de déconnexion
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("roles");
    window.location.replace("/");
  };

  // Effet pour gérer le défilement de la page
  useEffect(() => {
    // Fonction pour déterminer si le bouton doit être sticky
    const handleScroll = () => {
      // Utiliser une mise à jour basée sur la fonction pour garantir la cohérence
      setIsSticky((prevSticky) => window.scrollY > 0);
    };

    // Ajout de l'écouteur d'événement au défilement
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'écouteur d'événement lors de la destruction du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`btn-logout${isSticky ? " sticky" : ""}`}
      onClick={handleLogOut}
      aria-label="Logout" // Accessibilité
    >
      Logout
    </button>
  );
};

export default LogoutButton;
