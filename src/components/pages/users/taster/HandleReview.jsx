// import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Rating } from 'react-simple-star-rating';
import "./handle-review.scss";
import Header from "../../../layout/header/Header";
import Footer from "../../../layout/footer/Footer";

const HandleReview = () => {
    const userId = localStorage.getItem("id");
    // const { id } = useParams();
    const [reviews, setReviews] = useState(null);
    

    useEffect(() => {
        fetch(`http://localhost:5001/api/reviews/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setReviews(data.reviews); // Assuming 'reviews' is the array containing your reviews
                console.log("data:",data);
            });
    }, [userId]); // Added userId to the dependency array

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