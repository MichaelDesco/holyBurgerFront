import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/header/Header.tsx";
import "./handle.scss";

interface Restaurant {
  id: number;
  name: string;
  UserId: number;
}

interface BurgerFormData {
  name: string;
  price: number;
  garniture: string;
  fromage: string;
  sauce: string;
  restaurantId: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const HandleBurger: React.FC = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRestaurants = async (): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/restaurants/byuser/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data: ApiResponse<Restaurant[]> = await response.json();
        if (id) {
          const userRestaurants = data.data.filter(
            (restaurant) => restaurant.UserId === Number(id)
          );
          setRestaurants(userRestaurants);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [id, token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const burgerData: BurgerFormData = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      garniture: formData.get("garniture") as string,
      fromage: formData.get("fromage") as string,
      sauce: formData.get("sauce") as string,
      restaurantId: Number(formData.get("restaurant")),
    };

    try {
      const roles = localStorage.getItem("roles");
      const response = await fetch("http://localhost:5001/api/burgers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} ${roles}`,
        },
        body: JSON.stringify(burgerData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("data", data);
        navigate(`/restaurants/${burgerData.restaurantId}`);
      } else {
        throw new Error(data.error || "Erreur lors de la création du burger");
      }
    } catch (error) {
      console.error("Erreur lors de la création du burger:", error);
    }
  };

  const formFields = [
    { name: "name", label: "Nom du burger", type: "text" },
    { name: "price", label: "Prix", type: "number" },
    { name: "garniture", label: "Garniture", type: "text" },
    { name: "fromage", label: "Fromage", type: "text" },
    { name: "sauce", label: "Sauce", type: "text" },
  ];

  return (
    <div className="handle-page">
      <Header />
      <form className="handle" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-items">
            {formFields.slice(0, 2).map((field) => (
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
            <label htmlFor="restaurant">Restaurant</label>
            <select
              className="restaurant-select"
              name="restaurant"
              id="restaurant"
              required
            >
              <option className="restaurant-option" value="">
                Sélectionnez un restaurant
              </option>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))
              ) : (
                <option value="">Vous n'avez pas encore de restaurant</option>
              )}
            </select>
          </div>
          <div className="form-items">
            {formFields.slice(2).map((field) => (
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

export default HandleBurger;