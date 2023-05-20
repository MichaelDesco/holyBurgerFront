import Header from "../../layout/header/Header";
import { useState } from "react";
import "./signup.scss";

const Signup = () => {
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
            .then((dataJs) => (setIsSignup(true)))
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
                                <div className="role">
                                    <label for="roles">Vous-êtes :</label>
                                    <select name="roles">
                                        <option value="taster">Goûteur</option>
                                        <option value="restorer">Restaurateur</option>
                                    </select>
                                </div>
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

export default Signup;