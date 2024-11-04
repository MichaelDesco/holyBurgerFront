import React, { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Confirmation from "../../../layout/confirmation/Confirmation.tsx";
import Header from "../../../layout/header/Header.tsx";
import "./update-user.scss";

interface UserData {
  username: string;
  password: string;
  mail: string;
}

interface UpdateFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  mail: HTMLInputElement;
}

interface UpdateFormElement extends HTMLFormElement {
  readonly elements: UpdateFormElements;
}

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5001/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsUpdate(true);
      })
      .catch((error: Error) => {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      });
  }, [id, navigate]);

  const handleUpdate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = (e: UpdateFormElement): void => {
    setShowConfirmation(false);

    const userData: UserData = {
      username: e.elements.username.value,
      password: e.elements.password.value,
      mail: e.elements.mail.value,
    };

    if (!id) {
      console.error("ID utilisateur non trouvé");
      return;
    }

    fetch(`http://localhost:5001/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("utilisateur modifié");
        } else {
          throw new Error("Erreur lors de la modification");
        }
      })
      .then(() => {
        navigate(`/users/${id}`);
      })
      .catch((error: Error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  };

  const handleCancel = (): void => {
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
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                id="username"
                name="username"
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Mot de passe"
                id="password"
                name="password"
                required
              />
            </label>
            <label>
              <input
                type="email"
                placeholder="@mail"
                id="mail"
                name="mail"
                required
              />
            </label>
            <button type="submit">Modifier mon profil</button>
          </div>
        </form>
      </div>
      {showConfirmation && (
        <Confirmation
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
          message="Est-tu certain de vouloir modifier ton profil?"
        />
      )}
    </>
  );
};

export default UpdateUser;
