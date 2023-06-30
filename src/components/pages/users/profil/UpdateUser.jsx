import Header from "../../../layout/header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confirmation from "../../../layout/confirmation/Confirmation";
import "./update-user.scss";
import { Helmet } from "react-helmet";

const UpdateUser = () => {
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const id = localStorage.getItem("id");

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
        setShowConfirmation(true);
    };

    const handleConfirmation = (e) => {
        setShowConfirmation(false);

        const username = e.username.value;
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

    const handleCancel = () => {
        setShowConfirmation(false);
        navigate(`/users/${id}`);
    };

    return (
        <>
            <Helmet>
                <title>Modifier votre profil</title>
            </Helmet>
            <Header />
            <div className="update-user">
                <form method="PUT" action="/signup" onSubmit={handleUpdate}>
                    {!isUpdate && <p>L'utilisateur a bien été modifié</p>}
                    <h2>Modifier votre profil</h2>
                    <div className="form-user">
                        <label>
                            <input type="text" placeholder="Nom d'utilisateur" id="username" name="username" />
                        </label>
                        <label>
                            <input type="password" placeholder="Mot de passe" id="password" name="password" required />
                        </label>
                        <label>
                            <input type="email" placeholder="@mail" id="mail" name="mail" required />
                        </label>
                        <button type="submit">Modifier mon profil</button>
                    </div>
                </form>
            </div>
            {showConfirmation && (
                <Confirmation
                    onConfirm={handleConfirmation}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default UpdateUser;

