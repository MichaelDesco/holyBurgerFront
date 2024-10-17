import React, { useState, useEffect } from "react";

const LogoutButton = () => {
  const handleLogOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("roles");
    window.location.replace("/");
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'écouteur d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button className={`btn-logout${isSticky ? ' sticky' : ''}`} onClick={handleLogOut}>
      Logout
    </button>
  );
};

export default LogoutButton;
