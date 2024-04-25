import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const DoctorLogin = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    email: '',
    password: '',
  });

  const nav = useNavigate();

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({
      ...doctorDetails,
      [name]: value,
    });
  };

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/docauth/doclogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorDetails),
      });

      const responseData = await response.json();
      if (!response.ok) {
        toast.warn('Incorrect Email or Password', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.success('Login Successful', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        Cookies.set('doctorLogin', responseData.token, { expires: 1 });
        Cookies.set('email', responseData.email, { expires: 1 });
        Cookies.set('name', responseData.name, { expires: 1 });
        nav("/");
        window.location.reload(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[8%]">
      <h1 className="font-bold text-4xl mb-6">Doctor Login</h1>
      <form onSubmit={handleDoctorLogin} className="w-64">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={doctorDetails.email}
            onChange={handleLoginInput}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={doctorDetails.password}
            onChange={handleLoginInput}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;
