import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [Name, setName] = useState("");
  const [Pass, setPass] = useState("");
  const nav = useNavigate();

  const handleLoginForm = (e) => {
    e.preventDefault();
    if (Name === "admin" && Pass === "admin123") {
      Cookies.set("adminToken", "token", { expires: 1 });
      nav("/docrequests");
      window.location.reload(false);
    }
  };

  return (
    <form onSubmit={handleLoginForm}>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <img
            className="hidden lg:block lg:w-1/2 bg-cover"
            src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
          />
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Welcome Admin!
            </h2>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                login with email !
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label htmlFor="ID" classNameName="block mb-2">
                ID:
              </label>

              <input
                type="text"
                id="ID"
                required
                placeholder="ID"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  classNameName="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password:
                </label>
                <a href="#" className="text-xs text-gray-500">
                  Forget Password?
                </a>
              </div>

              <input
                type="password"
                id="password"
                required
                placeholder="Password"
                value={Pass}
                onChange={(e) => setPass(e.target.value)}
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

              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
