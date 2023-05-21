import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/home/About";
import Login from "./components/pages/login/Login";
import Profil from "./components/pages/users/Profil";
import ProfilUpdate from "./components/pages/users/ProfilUpdate";
import HandleRestaurant from "./components/pages/users/HandleRestaurant";
import HandleBurger from "./components/pages/users/HandleBurger";
import BurgerReview from "./components/pages/users/BurgerReview";
import Signup from "./components/pages/signup/Signup";
import Restaurants from "./components/pages/restaurants/Restaurants";
import RestaurantBurgers from "./components/pages/restaurants/RestaurantBurgers";
import Burgers from "./components/pages/burgers/Burgers";
import Admin from "./admin/Admin";
import NotFound from "./components/pages/NotFound"
import "./App.scss";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* ROUTE ALL USERS */}
          <Route path="*" element = {<NotFound />} />
          <Route path="/" element = {<Home />} />
          <Route path="/restaurants" element = {<Restaurants />} />
          <Route path="/restaurants/:id" element = {<RestaurantBurgers />} />
          <Route path="/burgers" element = {<Burgers />} />
          <Route path="/about" element = {<About />} />
          <Route path="/signup" element = {<Signup />} />
          <Route path="/login" element = {<Login />} />

          {/* ROUTE REGISTER USERS */}
          <Route path="/users/:id" element = {<Profil />} />
          <Route path="/users/update" element = {<ProfilUpdate />} />
          <Route path="/users/handle_restaurant" element={<HandleRestaurant />} />
          <Route path="/users/handle_burger" element = {<HandleBurger />} />
          <Route path="/users/burger-review" element = {<BurgerReview />} />

          {/* ROUTE ADMIN */}
          <Route path="/admin" element={<Admin />} />
          {/*<Route path="/admin/" element={<HomeAdmin />} />
          <Route path="/admin/restaurants" element={<RestaurantsAdmin />} />
          <Route path="/admin/restaurants/:id" element={<RestaurantsCRUDAdmin />} />
          <Route path="/admin/restaurants/burgers" element={<BurgersAdmin />} />
          <Route path="/admin/restaurants/burgers/:id" element={<BurgersCRUDAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

