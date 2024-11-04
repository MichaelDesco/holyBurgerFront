import React, { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/header/Header.tsx";
import "./handle.scss";

interface RestaurantFormData {
  name: string;
  mail: string;
  telephone: string;
  picture: File | null;
  number: string;
  street: string;
  postCode: string;
  city: string;
  userId: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const HandleRestaurant: React.FC = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, [navigate, id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Ajouter l'ID de l'utilisateur aux données envoyées
    if (id) {
      formData.append("userId", id);
    }

    try {
      const roles = localStorage.getItem("roles");
      const response = await fetch("http://localhost:5001/api/restaurants", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token} ${roles}`,
        },
        body: formData,
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        console.log("data", data);
        navigate("/restaurants");
      } else {
        throw new Error(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur lors de la création du restaurant:", error);
      // Ici vous pourriez ajouter une gestion des erreurs plus élaborée
    }
  };

  const inputFields = [
    { name: "name", label: "Nom du restaurant", type: "text" },
    { name: "mail", label: "Mail", type: "email" },
    { name: "telephone", label: "Téléphone", type: "tel" },
    {
      name: "picture",
      label: "Photo du restaurant",
      type: "file",
      accept: ".jpg, .jpeg, .png",
    },
  ];

  const addressFields = [
    { name: "number", label: "Numéro de rue", type: "text" },
    { name: "street", label: "Address", type: "text" },
    { name: "postCode", label: "Code postal", type: "text" },
    { name: "city", label: "Ville", type: "text" },
  ];

  return (
    <div className="handle-page">
      <Header />
      <form className="handle" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-items">
            {inputFields.map((field) => (
              <React.Fragment key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  accept={field.accept}
                  required
                />
              </React.Fragment>
            ))}
          </div>
          <div className="form-items">
            {addressFields.map((field) => (
              <React.Fragment key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  required
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <button className="btn-custom" type="submit">
          Créer
        </button>
      </form>
    </div>
  );
};

export default HandleRestaurant;
