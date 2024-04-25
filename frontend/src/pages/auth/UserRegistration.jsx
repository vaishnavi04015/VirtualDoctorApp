import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegistration = () => {
    const [user, setUser] = useState({
        userName:"",
        email:"",
        phone:"",
        password:""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleForm = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            setUser({
                userName:"",
                email:"",
                phone:"",
                password:""
            });
            toast.success("Registered Successfully !");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-[5%]">
            <h1 className="font-bold text-4xl mb-6">User Registration</h1>
            <form onSubmit={handleForm} className="w-64">
                <div className="mb-4">
                    <label htmlFor="userName" className="block mb-2">Full Name:</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={user.userName}
                        onChange={handleInput}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Full Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInput}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Phone"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="******"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserRegistration;
