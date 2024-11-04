import React, { useState, useEffect, ChangeEvent } from "react";

interface Restaurant {
  id: number;
  name: string;
  // Add other restaurant properties as needed
}

interface RestaurantSelectOptionsProps {
  onChange: (restaurant: Restaurant) => void;
  userId: number;
}

const RestaurantSelectOptions: React.FC<RestaurantSelectOptionsProps> = ({ onChange, userId }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async (): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/${userId}/restaurants`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setRestaurants(data.data);
        } else {
          console.log("Invalid data format", data);
        }
      } catch (error) {
        console.log("Error fetching restaurants", error);
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value) {
      onChange(JSON.parse(e.target.value));
    }
  };

  return (
    <label>
      Restaurant
      <select onChange={handleChange}>
        <option value="">Sélectionnez un restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={JSON.stringify(restaurant)}>
            {restaurant.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default RestaurantSelectOptions;