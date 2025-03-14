import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import doctor from "../../assets/doctorImg.png";
const DoctorLogin = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    email: "",
    password: "",
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
      const response = await fetch("https://virtualdoctorapp-backend.onrender.com/docauth/doclogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorDetails),
      });

      const responseData = await response.json();
      if (!response.ok) {
        toast.warn("Incorrect Email or Password", {
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
        Cookies.set("doctorLogin", responseData.token, { expires: 1 });
        Cookies.set("email", responseData.email, { expires: 1 });
        Cookies.set("name", responseData.name, { expires: 1 });
        nav("/");
        window.location.reload(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleDoctorLogin}>
      <div class="py-16">
        <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <img class="hidden lg:block lg:w-1/2 bg-cover" src={doctor} />

          <div class="w-full p-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-gray-700 text-center">
              Welcome Doctor!
            </h2>

            <div class="mt-4 flex items-center justify-between">
              <span class="border-b w-1/5 lg:w-1/4"></span>
              <a href="#" class="text-xs text-center text-gray-500 uppercase">
                login with email
              </a>
              <span class="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div class="mt-4">
              <label
                htmlFor="email"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={doctorDetails.email}
                onChange={handleLoginInput}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                placeholder="Email"
                required
              />
            </div>
            <div class="mt-4">
              <div class="flex justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <a href="#" class="text-xs text-gray-500">
                  Forget Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={doctorDetails.password}
                onChange={handleLoginInput}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                placeholder="Password"
                required
              />
            </div>
            <div class="mt-8">
              <button
                type="submit"
                class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="border-b w-1/5 md:w-1/4"></span>
              <a href="#" class="text-xs text-gray-500 uppercase">
                or sign up
              </a>
              <span class="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DoctorLogin;
