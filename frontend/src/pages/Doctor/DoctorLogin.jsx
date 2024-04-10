import React, { useState } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DoctorLogin = () => {
  const [doctorDetails, setdoctorDetails] = useState({
    email: '',
    password: '',
  });

  const LoginInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setdoctorDetails({
      ...doctorDetails,
      [name]: value,
    });
  };

  const handleDocLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(doctorDetails);

      const response = await fetch('http://localhost:5000/docauth/doclogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorDetails),
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
        console.log('Response IS False');
        console.log(response.ok);
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
        alert('Login Successful');
        console.log('Login Response = ', responseData);
        console.log(' Login TOken   =   ', responseData.token);

        localStorage.setItem("doctorLogin", JSON.stringify(responseData.token));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleDocLogin}>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={LoginInput}
            className="ml-3 border-2 border-slate-400 rounded-md"
            type="text"
            id="email"
            name="email"
            required
            placeholder=" Email"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={LoginInput}
            className="ml-3 border-2 border-slate-400 rounded-md"
            type="password"
            id="password"
            name="password"
            required
            placeholder=" ******"
          />
        </div>
        <button className="p-2 border-2 border-emerald-600" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;
