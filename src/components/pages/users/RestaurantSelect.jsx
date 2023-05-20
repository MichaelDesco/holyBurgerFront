import React, { useState, useEffect } from "react";

const RestaurantSelect = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/restaurants");
        const data = await response.json();

        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          console.log("Invalid data format", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <>
      <label htmlFor="RestaurantId">
        Nom du restaurant
        <select className="restaurant-select" id="RestaurantId" name="RestaurantId">
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id} className="restaurant-option">
              {restaurant.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default RestaurantSelect;
