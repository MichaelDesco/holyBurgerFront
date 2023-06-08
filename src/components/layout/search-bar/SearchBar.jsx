import { useEffect, useState } from "react";


const SearchBar = () => {
    const [searchRestaurant, setSearchRestaurant] = useState("");

    useEffect(() => {
        let apiUrl = "http://localhost:5001/api/restaurants";
        if (searchRestaurant) {
            // encodeURIComponent() is used to encode special characters
            apiUrl += `?search=${encodeURIComponent(searchRestaurant)}`;
        }

        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSearchRestaurant(data.data);
            });
    }, [searchRestaurant]);

    const [searchBurger, setSearchBurger] = useState("");

    useEffect(() => {
        let apiUrl = "http://localhost:5001/api/burgers";
        if (searchBurger) {
            // encodeURIComponent() is used to encode special characters
            apiUrl += `?search=${encodeURIComponent(searchBurger)}`;
        }

        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSearchBurger(data.data);

            });
    }, [searchBurger]);

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchRestaurant}
                onChange={(e) => setSearchRestaurant(e.target.value)}
                placeholder="Rechercher un restaurant"
            />
            <input
                type="text"
                value={searchBurger}
                onChange={(e) => setSearchBurger(e.target.value)}
                placeholder="Rechercher un burger"
            />
        </div>
    );
};

export default SearchBar;
