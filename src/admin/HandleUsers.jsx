import React, { useState, useEffect } from 'react';
import HeaderAdmin from './HeaderAdmin';
import './admin.scss';
import { Helmet } from 'react-helmet';

const HandleUsersBonus = () => {
    const [users, setUsers] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5001/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const filteredUsers = data.data.filter(user => user.roles.includes("goûteur") || user.roles.includes("restaurateur"));
                setUsers(filteredUsers);
                console.log(data);
            });
    }, []);

    const handleDelete = (id) => {
        setUserIdToDelete(id);
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:5001/api/users/${userIdToDelete}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsers(users.filter(user => user.id !== userIdToDelete));
                setShowConfirmation(false);
                setUserIdToDelete(null);
            });
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
        setUserIdToDelete(null);
    };

    return (
        <div className="container-admin">
            <Helmet>
                <title>Admin·User</title>
            </Helmet>
            <HeaderAdmin />
            <section>
                <div className="container-card d-flex flex-wrap justify-content-evenly align-items-space-around pt-3 pb-5">
                    {users.map((user) => (
                        <div key={user.id} className="card mt-3 mb-3" style={{ width: "15rem" }}>
                            <img className="card-img-top" src={user.picture} alt={user.name} />
                            <div className="card-body">
                                <h5 className="card-title">{user.username}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{user.roles}</li>
                                <li className="list-group-item">{user.mail}</li>
                            </ul>
                            <div className="card-body">
                                <button className="card-link delete" onClick={() => handleDelete(user.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {showConfirmation && (
                <div className="prompt-container">
                    <div className="confirmation-dialog">
                        <h3>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h3>
                        <div className="confirmation-buttons">
                            <button className="confirm-button" onClick={confirmDelete}>Oui</button>
                            <button className="cancel-button" onClick={cancelDelete}>Non</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HandleUsersBonus;
