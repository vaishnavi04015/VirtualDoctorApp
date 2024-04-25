import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const UserLogin = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

  let nav = useNavigate();

  const LoginInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  const handleLoginForm = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUser),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.warn('Incorrect Email OR Password', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        toast.warn(responseData.message, {
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
        Cookies.set('userToken', responseData.token, { expires: 1 });
        Cookies.set('email', responseData.email, { expires: 1 });
        Cookies.set('name', responseData.name, { expires: 1 });

        nav("/checkAppoitment")
        window.location.reload(false);
      }
    } catch (error) {
      console.log('Error Response ', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[8%]">
      <h1 className="font-bold text-4xl mb-6">User Login</h1>
      <form onSubmit={handleLoginForm} className="w-64">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          required
          name="email"
          placeholder="Email ID"
          value={loginUser.email}
          onChange={LoginInput}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          required
          name="password"
          placeholder="Password"
          value={loginUser.password}
          onChange={LoginInput}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
