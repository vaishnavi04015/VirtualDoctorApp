import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserLogin = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

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
      console.log(loginUser);

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

        localStorage.setItem('userToken', responseData.token);
      }
    } catch (error) {
      console.log('Error Response ', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleLoginForm}>
        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          placeholder="Email ID"
          value={loginUser.email}
          onChange={LoginInput}
        />{' '}
        <br></br>
        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          placeholder="Password"
          value={loginUser.password}
          onChange={LoginInput}
        />{' '}
        <br></br>
        <button type="submit"> Login !</button>
      </form>
    </div>
  );
};

export default UserLogin;
