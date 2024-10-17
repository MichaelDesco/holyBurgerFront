import React, { useState, useEffect } from "react";
import Header from "../../layout/header/Header";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import logoImage from "../../../assets/holy-burger-logo.png";
import "./signup-form.scss";

const SignupForm = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        // Effectuez l'action souhaitée après l'inscription ici, par exemple la redirection vers la page d'accueil
        if (isSignup) {
            navigate("/");
        }
    }, [isSignup, navigate]);

    const handleSignup = async (event) => {
        event.preventDefault();
        
        // Créer un objet FormData pour collecter les données du formulaire
        const formData = new FormData(event.target);
        
        try {
            console.log('FormData:', formData);
            // Envoyer les données du formulaire à l'API
            const response = await fetch("http://localhost:5001/api/users/signup", {
                method: "POST",
                body: formData,
            });
            console.log('Response:', response);
            if (response.ok) {
                // Mettre à jour l'état pour afficher le message de confirmation
                setIsSignup(true);

                // Afficher le pop-up Swal en cas de succès
                Swal.fire({
                    title: "Inscription réussie !",
                    text: "Vous allez maintenant recevoir un mail de confirmation.",
                    imageUrl: logoImage,
                    imageWidth: 150,
                    icon: "success",
                    iconColor: "#FAAF18",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#066330",
                    allowOutsideClick: false, // Empêcher la fermeture du pop-up en cliquant à l'extérieur
                }).then(() => {
                    fetch("http://localhost:5001/api/users/send-confirmation-email")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to send confirmation email");
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        console.error("Error sending confirmation email:", error);
                        // Gérer les erreurs ici
                    });
                });
            } else {
                // Gérer les erreurs ici
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

        } catch (error) {
            console.error("Signup failed:", error);
            // Gérer les erreurs ici
            // Afficher la popup Swal en cas d'erreur
            Swal.fire({
                title: "Erreur lors de l'inscription !",
                text: "Veuillez réessayer plus tard.",
                icon: "error",
                confirmButtonText: "OK",
                allowOutsideClick: false,
            });
        }
    };

    return (
        <div className="signup-form">
            <Header />
            <div className="container-register">
                <div className="register">
                    <form method="POST" action="/signup" onSubmit={handleSignup} encType="multipart/form-data">
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
                        <button type="submit">S'enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;





