import React, { useState } from "react";
import Header from "../../layout/header/Header";


const HandleBurger = () => {
    const [create, setCreate] = useState(false);

    const handleSubmit = (e) => {
            e.preventDefault();

            const name = e.target.name.value;
            const price = e.target.price.value;
            const picture = e.target.picture.value;
            const garniture = e.target.garniture.value;
            const fromage = e.target.fromage.value;
            const sauce = e.target.sauce.value;


            

            fetch("http://localhost:5000/api/burgers",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer" ${localStorage.getItem("token")} + ${localStorage.getItem("roles")}`,
                },          
                body: JSON.stringify({
                    name: name,
                    price: price,
                    picture: picture,
                    garniture: garniture,
                    fromage: fromage,
                    sauce: sauce,
                }),
            })
            .then((dataJs) => (setCreate(true)))
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Header />
            <form
                className="handle"
                onSubmit={handleSubmit}
                action="post"
                method="POST"
                encType="multipart/form-data"
            >
                {create && <p>Le burger a bien été créé</p>}
                    <div className="form-group">
                        <div className="form-items">
                            <label>Nom du burger
                                <input type="text" id="name" name="name" />
                            </label>
                            {/* <label>Cuisinier
                                <input type="text" id="cooker" name="cooker" />
                            </label> */}
                            <label>Prix
                                <input type="number" id="price" name="price" />
                            </label>
                            <label>Photo
                                <input type="file" id="picture" name="picture" />
                            </label>
                        </div>
                        <div className="form-items">
                            <label>Garniture
                                <input type="text" id="garniture" name="garniture" />
                            </label>
                            {/* <label>Garniture 2
                                <input type="text" id="garniture2" name="garniture2" />
                            </label> */}
                            <label>Fromage
                                <input type="text" id="fromage" name="fromage" />
                            </label>
                            {/* <label>Légumes
                                <input type="text" id="legumes" name="legumes" />
                            </label> */}
                            <label>Sauce
                                <input type="text" id="sauce" name="sauce" />
                            </label>
                            {/* <label>Description
                                <input type="text" id="description" name="description" />
                            </label>
                            <label>Nom du restaurant
                                <input type="text" id="restaurantName" name="restaurantName" />
                            </label> */}
                        </div>
                    </div>
                <button type="submit">Créer</button>
            </form>          
        </div>
    );
};

export default HandleBurger;