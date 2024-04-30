import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import userImg from "../../assets/contactImg.png";

const UserLogin = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
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

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.warn("Incorrect Email OR Password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        toast.warn(responseData.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        Cookies.set("userToken", responseData.token, { expires: 1 });
        Cookies.set("email", responseData.email, { expires: 1 });
        Cookies.set("name", responseData.name, { expires: 1 });

        nav("/");
        window.location.reload(false);
      }
    } catch (error) {
      console.log("Error Response ", error);
    }
  };

  return (
    <form onSubmit={handleLoginForm}>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <img className="hidden lg:block lg:w-1/2 bg-cover" src={userImg} />
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="Email ID"
                value={loginUser.email}
                onChange={LoginInput}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500">
                  Forget Password?
                </a>
              </div>
              <input
                type="password"
                required
                name="password"
                placeholder="Password"
                value={loginUser.password}
                onChange={LoginInput}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <a href="#" className="text-xs text-gray-500 uppercase">
                or sign up
              </a>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserLogin;
