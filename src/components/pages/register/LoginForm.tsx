import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header/Header.tsx";
import "./login-form.scss";

// Interface pour la réponse de l'API
interface LoginResponse {
  user: {
    roles: string;
    username: string;
    picture: string;
    id: string;
  };
  token: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // On utilise type assertion pour accéder aux valeurs du formulaire
    const form = e.target as HTMLFormElement;
    const usernameInput = form.username as HTMLInputElement;
    const passwordInput = form.password as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
      }

      const data: LoginResponse = await response.json();

      localStorage.setItem("roles", data.user.roles);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("picture", data.user.picture);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("jwt", data.token);

      navigate(`/users/${data.user.id}`);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur est survenue");
      }
    }
  };

  return (
    <div className="login-form">
      <Header />
      <div className="container-login">
        <div id="login">
          <form onSubmit={handleLogin}>
            <h2>Se Connecter</h2>
            <div className="id-password">
              <label>
                <b>Nom d'utilisateur</b>
                <input
                  type="text"
                  placeholder="Entrer votre identifiant"
                  name="username"
                  required
                />
              </label>
              <label>
                <b>Mot de passe</b>
                <input
                  type="password"
                  placeholder="Entrer votre mot de passe"
                  name="password"
                  required
                />
              </label>
            </div>
            <button type="submit" id="submit">
              Se connecter
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
