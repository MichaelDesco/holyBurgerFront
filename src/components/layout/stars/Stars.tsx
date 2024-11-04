import React, { FormEvent, useState } from 'react';
import { useNavigate } from "react-router";
import { Rating } from 'react-simple-star-rating';

interface StarsProps {
    burgerId: number;
    restaurantId: number;
    submitReview: () => void;
}

const Stars: React.FC<StarsProps> = ({ burgerId, restaurantId, submitReview }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt") || '';
    const [rating, setRating] = useState<number>(0); // initial rating value

    const handleRating = (rate: number) => {
        console.log("New rating:", rate);
        setRating(rate);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const content = formData.get("content") as string;
        const ratingValue = formData.get("ratingValue") as string;

        console.log("Content:", content);
        console.log("Rating:", ratingValue);
        console.log("Burger ID:", burgerId);
        console.log("User ID:", localStorage.getItem("id"));
        console.log("Restaurant ID:", restaurantId);

        fetch("http://localhost:5001/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token} ${localStorage.getItem("roles")}`,
            },
            body: JSON.stringify({
                content,
                rating: ratingValue,
                burgerId,
                userId: localStorage.getItem("id"),
                restaurantId,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response data:", data);
            navigate("/burgers");
        })
        .then(submitReview) // Appel de la fonction submitReview après avoir traité la réponse
        .catch((error) => console.log(error));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className='textarea' type='text' name="content" />
                    <div className="review-send">
                        <input type="hidden" name="ratingValue" value={rating.toString()} />
                        <Rating
                            name='rating'
                            onClick={handleRating}
                            ratingValue={rating}
                            showTooltip
                            tooltipDefaultText='Note le burger'
                        />
                        <button type="submit">Envoyer</button>
                    </div>
                </label>
            </form>
        </>
    )
}

export default Stars;
