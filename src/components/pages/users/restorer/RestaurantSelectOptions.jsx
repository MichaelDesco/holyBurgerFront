import React, { useState, useEffect } from "react";

const RestaurantSelectOptions = ({ onChange, userId }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/users/${userId}/restaurants`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
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

  return (
    <label>
      Restaurant
      <select onChange={(e) => onChange(JSON.parse(e.target.value))}>
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

