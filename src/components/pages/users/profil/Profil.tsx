import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Admin from "../../../../admin/Admin.tsx";
import ProfilRestorer from "./ProfilRestorer.tsx";
import ProfilTaster from "./ProfilTaster.tsx";

// Type pour les rôles possibles
type UserRole = "admin" | "goûteur" | "restaurateur";

const Profil: React.FC = () => {
  const navigate = useNavigate();
  const role: string = localStorage.getItem("roles") || "";

  // Vérification de la présence du rôle
  if (!role) {
    localStorage.clear();
    navigate("/");
    return null;
  }

  // Helper function pour vérifier si un rôle spécifique est présent
  const hasRole = (roleToCheck: UserRole): boolean => {
    return role.includes(roleToCheck);
  };

  return (
    <>
      <Helmet>
        <title>HOLY·Profil🍔</title>
      </Helmet>
      {hasRole("admin") && <Admin />}
      {hasRole("goûteur") && <ProfilTaster />}
      {hasRole("restaurateur") && <ProfilRestorer />}
    </>
  );
};

export default Profil;
