import React from 'react';
import StarRating from './StarRating';

const Reviews = ({reviews}) => {
    return (
        <div className="row row-cols-3 mb-2 justify-content-evenly">
            {
                reviews.map(review => {
                    return (
                        <div
                            key={review.id}
                            className="card text-white bg-dark mb-3 mr-4 pt-2"
                            style={{ maxWidth: "26%" }}
                        >
                            <div className="card-header d-flex justify-content-between mx-0 rounded-10">
                                <span className="fw-bolder">{review.name}</span>
                                <span><StarRating rating={review.rating} /></span>
                            </div>

                            <div className="card-body">
                                <p className="card-text">{review.review}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Reviews;
