import React, { useState } from 'react'
import UserLogin from '../pages/auth/UserLogin';
import DoctorLogin from '../pages/Doctor/DoctorLogin';
import AdminLogin from '../pages/auth/AdminLogin';

const Login = () => {
    const [flag, setFlag] = useState(3);

    return (
      <div>
        <div className="flex justify-end pt-4 pr-4 mt-3 mr-8">
            <button
            onClick={() => setFlag(1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mr-4"
          >
            Admin
          </button>
          <button
            onClick={() => setFlag(2)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mr-4"
          >
            Doctor
          </button>
          <button
            onClick={() => setFlag(3)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
          >
            User
          </button>
        </div>
        <div className="mt-4">
          {flag === 3 ? <UserLogin/> : flag === 2 ? <DoctorLogin/> : <AdminLogin/>}
        </div>
      </div>
    );
}

export default Login