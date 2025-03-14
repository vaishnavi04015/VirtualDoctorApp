import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const FeedBackForm = () => {
    const [rating, setRating] = useState(null);
    const [review,setReview] = useState("");
    const [doctorEmail, setDoctorEmail] = useState("")
    const Email = Cookies.get('email');
    const Name = Cookies.get('name');
    const token = Cookies.get('userToken');

    const handleSubmit=()=>
    {
        if(token)
        {
            if(doctorEmail.length > 0)
            {
                if(rating !== null)
                {
                    const date = new Date().toLocaleDateString("en-GB");
                    const time = new Date().toLocaleTimeString();
                    const reviews = { userName: Name, userEmail: Email, date, time, rating, review}
                    axios.patch("https://virtualdoctorapp-backend.onrender.com/reviews",{reviews, doctorEmail})
                    .then((res)=>{
                    // alert(res.data);
                    toast.success(res.data, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    })
                    .catch((e)=>console.log(e))
                    setRating(null);
                    setDoctorEmail("");
                    setReview("");
                }
                else
                {
                    // alert("Please give a Rating")
                    toast.warn("Please give a Rating", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                }
            }
            else
            {
                // alert("Please give a doctor Email")
                toast.warn("Please give a doctor Email", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            }
        }
        else
        {
            // alert("Please Login as user")
            toast.warn("Please Login as user", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
    }

    return (
        <div className="py-4 px-8">
            <form>
                <div className="mb-4">
                    <label className="block mb-1 text-lg">Doctor Email:</label>
                    <input className="border-2 rounded-md py-1 px-2 w-[40%]" type="text" value={doctorEmail} onChange={(e)=>setDoctorEmail(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1 text-lg">Rating:</label>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {[...Array(5)].map((_, index) => {
                            const currentRate = index + 1;
                            return (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rate"
                                            value={currentRate}
                                            onClick={() => setRating(currentRate)}
                                            style={{ display: "none" }}
                                        />
                                        <FaStar
                                            size={25}
                                            style={{ cursor: "pointer" }}
                                            color={currentRate <= rating ? "#ffc60b" : "grey"}
                                            className="mx-2"
                                        />
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block mb-2 mt-4 text-lg">Review:</label>
                    <textarea
                        value={review}
                        onChange={(e)=>setReview(e.target.value)}
                        className="border-2 rounded-md py-1 px-2 w-[80%] h-52 resize-none overflow-y-auto overflow-x-hidden"
                        placeholder="Enter additional information..."
                    ></textarea>
                </div>
                <button type='button' onClick={handleSubmit} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600">Submit</button>
            </form>
        </div>
    );
};

export default FeedBackForm;
