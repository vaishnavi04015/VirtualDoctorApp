import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegistration = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setUser({
        userName: "",
        email: "",
        phone: "",
        password: "",
      });
      toast.success("Registered Successfully !");
    }
  };

  return (
    // <div
    //   className="flex flex-col shadow-lg overflow-hidden  bg-white rounded-lg items-center justify-center
    //       mx-auto max-w-sm lg:max-w-4xl"
    // >
    //   <h1 className="font-bold text-4xl mb-6">User Registration</h1>
    //   <form onSubmit={handleForm} className="w-64">
    //     <div className="mb-4">
    //       <label htmlFor="userName" className="block mb-2">
    //         Full Name:
    //       </label>
    //       <input
    //         type="text"
    //         id="userName"
    //         name="userName"
    //         value={user.userName}
    //         onChange={handleInput}
    //         className="w-full p-2 border border-gray-300 rounded"
    //         placeholder="Full Name"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="email" className="block mb-2">
    //         Email:
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={user.email}
    //         onChange={handleInput}
    //         className="w-full p-2 border border-gray-300 rounded"
    //         placeholder="Email"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="phone" className="block mb-2">
    //         Phone:
    //       </label>
    //       <input
    //         type="text"
    //         id="phone"
    //         name="phone"
    //         value={user.phone}
    //         onChange={handleInput}
    //         className="w-full p-2 border border-gray-300 rounded"
    //         placeholder="Phone"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="password" className="block mb-2">
    //         Password:
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={user.password}
    //         onChange={handleInput}
    //         className="w-full p-2 border border-gray-300 rounded"
    //         placeholder="******"
    //         required
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </div>
    <form onSubmit={handleForm}>
      <div className="h-full bg-gray-100 dark:bg-gray-100">
        <div className="mx-auto">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <img
                className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                src=""
              />

              <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                  Create an Account!
                </h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                  <div className="mb-4 md:flex md:justify-between w-74">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      {/* Full Name */}

                      <label
                        htmlFor="userName"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Full Name:
                      </label>
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={user.userName}
                        onChange={handleInput}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    {/* Phone */}
                    <div className="md:ml-2">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Phone:
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInput}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Phone"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4  "></div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    className="w-full px-3 py-2  text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                    required
                  />

                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="*******"
                        required
                      />
                      <p className="text-xs italic text-red-500">
                        Please choose a password.
                      </p>
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                      type="submit"
                    >
                      Register Account
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="./index.html"
                    >
                      Already have an account? Login!
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserRegistration;
