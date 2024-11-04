import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import HeaderAdmin from "./HeaderAdmin.tsx";
import "./admin.scss";

// Définition des types pour un restaurant
interface Restaurant {
  id: number;
  name: string;
  picture: string;
  number: string;
  street: string;
  postCode: string;
  city: string;
  mail: string;
  telephone: string;
}

const AdminRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.data);
        console.log(data);
      });
  }, []);

  return (
    <div className="container-admin">
      <Helmet>
        <title>Admin·Restaurant</title>
      </Helmet>
      <HeaderAdmin />
      <section>
        <div className="container-card d-flex flex-wrap justify-content-evenly align-items-space-around pt-3 pb-5">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="card mt-3 mb-3"
              style={{ width: "15rem" }}
            >
              <img
                className="card-img-top"
                src={restaurant.picture}
                alt={restaurant.name}
              />
              <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p>{restaurant.number}</p>
                  <p>{restaurant.street}</p>
                  <p>{restaurant.postCode}</p>
                  <p>{restaurant.city}</p>
                </li>
                <li className="list-group-item">{restaurant.mail}</li>
                <li className="list-group-item">{restaurant.telephone}</li>
              </ul>
              <div className="card-body">
                <button className="card-link delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminRestaurants;
