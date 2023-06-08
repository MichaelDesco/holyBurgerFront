import Header from "../../layout/header/Header";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./signup-form.scss";

const SignupForm = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const handleSignup = (event) => {
        event.preventDefault();
        const roles = event.target.roles.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        const mail = event.target.mail.value;
        fetch("http://localhost:5001/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roles: [roles],
                    username: username,
                    password: password,
                    mail: mail,
                    }),
            })
            .then((dataJson) => dataJson.json())
            .then((dataJs) => {
                setIsSignup(true);
                navigate("/login");
            })
        };

    return (
        <div>
            <Header />
            <div className="container-register">
                <div className="register">
                    <form method="POST" action="/signup" onSubmit={handleSignup}>
                        {!isSignup ?
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
                                        <label for="roles">Vous-êtes :</label>
                                        <select name="roles">
                                            <option value="goûteur">Goûteur</option>
                                            <option value="restaurateur">Restaurateur</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            :
                            <p>Vous êtes bien enregistré !</p>
                        }
                        <button type="submit">S'enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;