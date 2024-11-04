import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./components/pages/home/About.tsx";
import Home from "./components/pages/home/Home.tsx";

import LoginForm from "./components/pages/register/LoginForm.tsx";
import SignupForm from "./components/pages/register/SignupForm.tsx";
import UserValidation from "./components/pages/register/UserValidation";

import Profil from "./components/pages/users/profil/Profil.tsx";
import UpdateUser from "./components/pages/users/profil/UpdateUser.tsx";

import HandleBurger from "./components/pages/users/restorer/HandleBurger.tsx";
import HandleRestaurant from "./components/pages/users/restorer/HandleRestaurant.tsx";

import HandleReview from "./components/pages/users/taster/HandleReview";

import RestaurantBurgers from "./components/pages/restaurants/RestaurantBurgers.tsx";
import Restaurants from "./components/pages/restaurants/Restaurants.tsx";

import Burgers from "./components/pages/burgers/Burgers.tsx";

import Admin from "./admin/Admin.tsx";
import AdminBurgers from "./admin/AdminBurgers.tsx";
import AdminRestaurants from "./admin/AdminRestaurants.tsx";
import HandleUsers from "./admin/HandleUsers.tsx";

import NotFound from "./components/pages/error/NotFound";
// import Unauthorized from "./components/pages/error/Unauthorized"
// import Forbidden from "./components/pages/error/Forbidden"
// import InternalServerError from "./components/pages/error/InternalServerError"
// import ServiceUnavailable from "./components/pages/error/ServiceUnavailable"

import "./App.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantBurgers />} />
        <Route path="/burgers" element={<Burgers />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/userValidation"
          element={<UserValidation user={undefined} />}
        />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/users/:id" element={<Profil />} />
        <Route path="/users/update" element={<UpdateUser />} />
        <Route path="/users/handle_restaurant" element={<HandleRestaurant />} />
        <Route path="/users/handle_burger" element={<HandleBurger />} />
        <Route path="/users/handle-review" element={<HandleReview />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/restaurants" element={<AdminRestaurants />} />
        <Route path="/admin/burgers" element={<AdminBurgers />} />
        <Route path="/admin/handle_users" element={<HandleUsers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
