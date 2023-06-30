import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from "react-router";

const Stars = ({ burgerId }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    const [rating, setRating] = useState(0); // initial rating value

    const handleRating = (rate) => {
        setRating(rate);
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);
        const content = formData.get("content");
        const rating = formData.get("ratingValue");
        
        
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
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            navigate("/burgers");
            console.log(data);
        })
        .catch((error) => console.log(error));
        console.log(content, rating, burgerId, localStorage.getItem("id"));
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


