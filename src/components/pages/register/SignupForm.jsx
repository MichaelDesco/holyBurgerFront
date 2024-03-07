import Header from "../../layout/header/Header";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./signup-form.scss";

const SignupForm = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const handleSignup = async (event) => {
        event.preventDefault();
        
        // Créer un objet FormData pour collecter les données du formulaire
        const formData = new FormData(event.target);
        
        try {
            // Envoyer les données du formulaire à l'API
            const response = await fetch("http://localhost:5001/api/users/signup", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            setIsSignup(true);
            navigate("/login");
        } catch (error) {
            console.error("Signup failed:", error);
            // Gérer les erreurs ici
        }
    };

    return (
        <div className="signup-form">
            <Header />
            <div className="container-register">
                <div className="register">
                    <form method="POST" action="/signup" onSubmit={handleSignup} encType="multipart/form-data">
                        {!isSignup ?
                            <div className="form-register">
                                <h2>Créer Votre Compte</h2>
                                <div className="signup-label">
                                    <div className="label">
                                        <label htmlFor="username">
                                            <b>Nom d'utilisateur</b>
                                            <input type="text" id="username"  name="username" autoComplete="username"/>
                                        </label>
                                        <label htmlFor="password">
                                            <b>Mot de passe</b>
                                            <input type="password" id="password"  name="password" autoComplete="new-password" required/>
                                        </label>
                                        <label htmlFor="verifyPassword">
                                            <b>Vérifiez le mot de passe</b>
                                            <input type="password" id="verifyPassword"  name="verifyPassword" autoComplete="new-password" required/>
                                        </label>
                                    </div>
                                    <div className="label">
                                        <label htmlFor="mail">
                                            <b>Mail</b>
                                            <input type="email" id="mail"  name="mail" autoComplete="mail" required/>
                                        </label>
                                        <label htmlFor="picture">
                                            <b>Photo de profil</b>
                                            <input type="file" name="picture" accept=".jpg, .jpeg, .png" autoComplete="off" />
                                        </label>
                                        <label htmlFor="roles">Vous-êtes :</label>
                                        <select name="roles" autoComplete="off">
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

