import Header from "../../../layout/header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const  id  = localStorage.getItem("id");

    useEffect(() => {
        fetch(`http://localhost:5001/api/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setIsUpdate(true);
            }
        );
    }, [id, navigate]);               

const handleUpdate = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const mail = e.target.mail.value;

    fetch(`http://localhost:5001/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
            username: username,
            password: password,
            mail: mail,
        }),
    })
    .then((data) => {
        if (data.status === 200) {
            console.log("utilisateur modifié");
        } else {
            console.log("erreur");
        }
    })
    .then((data) => {
        navigate(`/users/${id}`);
    });
};

    return (
        <div>
            <Header />
            <div className="container-register">
                <div className="register">
                    <form method="PUT" action="/signup" onSubmit={handleUpdate}>
                        {!isUpdate && <p>L'utilisateur a bien été modifié</p>}
                        <div className="form-register">
                            <h2>Créer Votre Compte</h2>
                            <div className="signup-label">
                                <div className="label">
                                    <label>
                                        <b>Nom d'utilisateur</b>
                                        <input type="text" id="username"  name="username"/>
                                    </label>
                                    <label>
                                        <b>Mot de passe</b>
                                        <input type="password" id="password"  name="password" required/>
                                    </label>
                                </div>
                                <div className="label">
                                    <label>
                                        <b>Mail</b>
                                        <input type="email" id="mail"  name="mail" required/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit">Modifier mon profil</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;

