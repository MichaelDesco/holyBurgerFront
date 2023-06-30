import Header from "../../layout/header/Header";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./login-form.scss";

const LoginForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        fetch("http://localhost:5001/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then((dataJson) => {
            if (dataJson.ok) {
                return dataJson.json();
            } else {
                throw new Error("Nom d'utilisateur ou mot de passe incorrect");
            }
        })
        .then((dataJs) => {
            localStorage.setItem("roles", dataJs.user.roles);
            localStorage.setItem("username", dataJs.user.username);
            localStorage.setItem("id", dataJs.user.id); 
            localStorage.setItem("jwt", dataJs.token);
            navigate(`/users/${dataJs.user.id}`);
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
    };

    return (
        <div className="login-form">
            <Header />
            <div className="container-login">
                <div id="login">
                    <form  onSubmit={handleLogin}>
                        <h2>Se Connecter</h2>
                        <div className="id-password">
                            <label><b>Nom d'utilisateur</b>
                                <input type="text" placeholder="Entrer votre identifiant" name="username" required />
                            </label>
                            <label><b>Mot de passe</b>
                                <input type="password" placeholder="Entrer votre mot de passe" name="password" required />
                            </label>
                        </div>
                        <button type="submit" id='submit'>Se connecter</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;