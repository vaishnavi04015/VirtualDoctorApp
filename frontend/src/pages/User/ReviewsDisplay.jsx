import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const ReviewsDisplay = () => {
    let k = useLocation();
    let { reviewEmail } = k.state;

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const email = reviewEmail;
        axios.get(`http://localhost:5000/getDocData/${email}`)
            .then((res) => {
                setReviews(res.data.reviews);
            })
            .catch((e) => console.log(e));
    }, [reviewEmail]);

    return (
        <div>
            {reviews.length > 0
            ?
            (
                reviews.map((temp, index) => (
                    <div key={index} className="w-[50%] ml-[25%] m-8 p-4 border rounded-lg relative">
                        <h2 className="text-xl font-bold mb-2">{temp.userName}</h2>
                        <div className="absolute top-2 right-4">
                            <h3 className="text-sm mb-1">{temp.date}</h3>
                            <h3 className="text-sm mb-2">{temp.time}</h3>
                        </div>
                        <div className="flex flex-wrap mb-2">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="mr-1">
                                    <FaStar
                                        size={25}
                                        className="cursor-pointer"
                                        color={index < temp.rating ? "#ffc60b" : "grey"}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-base">{temp.review}</p>
                    </div>
                ))
            )
            :
            (
                <p className="text-center text-gray-500 mt-[15%] text-3xl">No Reviews Yet</p>
            )}
        </div>
    );
};

export default ReviewsDisplay;
