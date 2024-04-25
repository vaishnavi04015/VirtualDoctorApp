import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [Name, setName] = useState("");
    const [Pass, setPass] = useState("");
    const nav = useNavigate();

    const handleLoginForm = (e) => {
        e.preventDefault();
        if (Name === 'admin' && Pass === 'admin123') {
            Cookies.set('adminToken', "token", { expires: 1 });
            nav("/docrequests");
            window.location.reload(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-[8%]">
            <h1 className="font-bold text-4xl mb-6">Admin Login</h1>
            <form onSubmit={handleLoginForm} className="w-64">
                <label htmlFor="ID" className="block mb-2">ID:</label>
                <input
                    type="text"
                    id="ID"
                    required
                    placeholder="ID"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <label htmlFor="password" className="block mb-2">Password:</label>
                <input
                    type="password"
                    id="password"
                    required
                    placeholder="Password"
                    value={Pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
