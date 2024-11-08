import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Rating } from 'react-simple-star-rating';
import "./handle-review.scss";
import Header from "../../../layout/header/Header.tsx";
import Footer from "../../../layout/footer/Footer.tsx";

const HandleReview = () => {
    const userId = localStorage.getItem("id");
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        console.log("Fetching reviews for userId:", userId);
        fetch(`http://localhost:5001/api/reviews/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Received data:", data);
                setReviews(data.reviews); // Assuming 'reviews' is the array containing your reviews
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, [userId]); // Added userId to the dependency array

    console.log("Reviews state:", reviews);

    return (
        <div>
            <Header />
            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        <Helmet>
                            <title>{`Holy Review ${review.User && review.User.username}`}</title>
                        </Helmet>

                        <div className="container-review" key={review.id}>
                            <div className="review-burger">
                                <p>{review.Burger.name}</p>
                                <img className="imgRestaurant"
                                    src={review.Burger.picture}
                                    alt={review.Burger.name}
                                />
                            </div>
                            <div className="review">
                                <p>{review.content}</p>
                                <Rating 
                                    ratingValue={review.rating} 
                                    size={40}
                                    showTooltip
                                    initialValue={review.rating}
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Vous n'avez aucun avis!</p>
            )}
            <Footer />
        </div>
    );
};

export default HandleReview;
