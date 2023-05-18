import Header from "../../layout/header/Header";
import { useNavigate } from "react-router-dom";

import "./login.scss";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then((dataJson) => dataJson.json())
        .then((dataJs) => {
            localStorage.setItem("roles", dataJs.user.roles); 
            // localStorage.setItem("user", JSON.stringify(dataJs.user));
            // localStorage.setItem("id", dataJs.user.id); 
            // localStorage.setItem("username", dataJs.user.username); 
            const jwt = dataJs.token;
            localStorage.setItem("jwt", jwt);
            navigate(`/users/${dataJs.user.id}`);
        });
    };

    return (
        <div>
            <Header />
            <div className="container-login">
                <div id="login">
                    <form  onSubmit={handleLogin}>
                        <h2>Se Connecter</h2>
                        <div className="id-password">
                            <label><b>Nom d'utilisateur</b></label>
                            <input type="text" placeholder="Entrer votre identifiant" name="username" required />
                            <label><b>Mot de passe</b></label>
                            <input type="password" placeholder="Entrer votre mot de passe" name="password" required />
                        </div>
                        <button type="submit" id='submit'>Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

