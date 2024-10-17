import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from "react-router";

const Stars = ({ burgerId, restaurantId, submitReview }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    const [rating, setRating] = useState(0); // initial rating value

    const handleRating = (rate) => {
        console.log("New rating:", rate); // Log du nouveau rating
        setRating(rate);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const content = formData.get("content");
        const rating = formData.get("ratingValue");
    
        console.log("Content:", content); // Log du contenu
        console.log("Rating:", rating); // Log du rating
        console.log("Burger ID:", burgerId); // Log de l'ID du burger
        console.log("User ID:", localStorage.getItem("id")); // Log de l'ID de l'utilisateur
        console.log("Restaurant ID:", restaurantId); // Log de l'ID du restaurant
    
        fetch("http://localhost:5001/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}  ${localStorage.getItem("roles")}`,
            },
            body: JSON.stringify({
                content,
                rating,
                burgerId,
                userId: localStorage.getItem("id"),
                restaurantId,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response data:", data); // Log des données de réponse
            navigate("/burgers");
        })
        .then(submitReview) // Appel de la fonction submitReview après avoir traité la réponse
        .catch((error) => console.log(error));
    };
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label >
                    <input className='textarea' type='text' name="content" />
                    <div className="review-send">
                        <input type="hidden" name="ratingValue" value={rating} />
                        <Rating
                            name='rating'
                            onClick={handleRating}
                            ratingValue={rating}
                            showTooltip
                            tooltipDefaultText='note le burger'
                        />
                        <button type="submit">Envoyer</button>
                    </div>
                </label>
            </form>
        </>
    )
}

export default Stars;
