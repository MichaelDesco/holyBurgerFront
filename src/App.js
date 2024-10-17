import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/home/Home";
import About from "./components/pages/home/About";

import SignupForm from "./components/pages/register/SignupForm";
import UserValidation from "./components/pages/register/UserValidation";
import LoginForm from "./components/pages/register/LoginForm";

import Profil from "./components/pages/users/profil/Profil";
import UpdateUser from "./components/pages/users/profil/UpdateUser";

import HandleRestaurant from "./components/pages/users/restorer/HandleRestaurant";
import HandleBurger from "./components/pages/users/restorer/HandleBurger";

import HandleReview from "./components/pages/users/taster/HandleReview";

import Restaurants from "./components/pages/restaurants/Restaurants";
import RestaurantBurgers from "./components/pages/restaurants/RestaurantBurgers";

import Burgers from "./components/pages/burgers/Burgers";

import Admin from "./admin/Admin";
import AdminRestaurants from "./admin/AdminRestaurants";
import AdminBurgers from "./admin/AdminBurgers";
// import AdminBurgerUpdate from "./admin/AdminBurgerUpdate";
import HandleUsers from "./admin/HandleUsers";

import NotFound from "./components/pages/error/NotFound"
// import Unauthorized from "./components/pages/error/Unauthorized"
// import Forbidden from "./components/pages/error/Forbidden"
// import InternalServerError from "./components/pages/error/InternalServerError"
// import ServiceUnavailable from "./components/pages/error/ServiceUnavailable"

import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* ROUTE ALL USERS */}
          <Route path="*" element = {<NotFound />} />
          <Route path="/" element = {<Home />} />
          <Route path="/restaurants" element = {<Restaurants />} />
          <Route path="/restaurants/:id" element = {<RestaurantBurgers />} />
          <Route path="/burgers" element = {<Burgers />} />
          <Route path="/about" element = {<About />} />
          <Route path="/signup" element = {<SignupForm />} />
          <Route path="/userValidation" element = {<UserValidation />} />
          <Route path="/login" element = {<LoginForm />} />
        {/* ROUTE REGISTER */}
          {/* ROUTE PROFIL USERS */}
          <Route path="/users/:id" element = {<Profil />} />
          <Route path="/users/update" element = {<UpdateUser />} />
          {/* ROUTE RESTORER PROFIL */}
          <Route path="/users/handle_restaurant" element={<HandleRestaurant />} />
          <Route path="/users/handle_burger" element = {<HandleBurger />} />
          {/* ROUTE TASTER PROFIL */}
          <Route path="/users/handle-review" element = {<HandleReview />} />
        {/* ROUTE ADMIN */}
          <Route path="/admin" element={<Admin />} />
          {/*<Route path="/admin/" element={<HomeAdmin />} />*/}
          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
          <Route path="/admin/burgers" element={<AdminBurgers />} />
          {/* <Route path="/admin/burgers/update" element={<AdminBurgerUpdate />} /> */}
          <Route path="/admin/handle_users" element={<HandleUsers />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;