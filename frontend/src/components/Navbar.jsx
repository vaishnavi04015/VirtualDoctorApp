import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import Cookies from 'js-cookie';
import axios from "axios";


const Navbar = () => {
  const  docToken = Cookies.get('doctorLogin');
  const userToken = Cookies.get('userToken');
  const adminToken=Cookies.get('adminToken');
  let nav = useNavigate();

  const [isVerified, setVerified] = useState();

  useEffect(()=>{
    if(docToken !== undefined)
    {
      const email = Cookies.get('email');
      axios.get(`http://localhost:5000/getDocData/${email}`)
        .then((res)=>{
          setVerified(res.data.verified);
        })
        .catch((e)=>console.log(e))
    }
  },[docToken])
  const handleLogout=(token)=>
  {
    Cookies.remove(token);
    Cookies.remove('name');
    Cookies.remove('email');
    nav("/");
    window.location.reload(false);
  }
  return (
    <div>
      <div className="bg-slate-700 text-slate-100 font-semibold text-xl h-18 p-5 align-middle text-center sticky">
        <ul className="flex relative justify-around text-center">
          <h1 className="relative align-middle w-1/6">24/7 Virtual Care</h1>
          {
            adminToken!=null ?
              <div className="flex relative space-x-6 text-center ">
                <li>
                  {' '}
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/docrequests">Doctor Requests</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink  onClick={()=>handleLogout('adminToken')}>Logout</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </div>
            :  
            docToken!=null && isVerified ?
              <div className="flex relative space-x-6 text-center ">
                <li>
                  {' '}
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/docSchedule">Schedules</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/pres">Add Prescription</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/presCard">View Prescription</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink  onClick={()=>handleLogout('doctorLogin')}>Logout</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </div>
            :
            docToken!=null && !isVerified ?
              <div className="flex relative space-x-6 text-center ">
                <li>
                  {' '}
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink  onClick={()=>handleLogout('doctorLogin')}>Logout</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </div>
            :
            userToken!=null?
              <div className="flex relative space-x-6 text-center ">
                <li>
                  {' '}
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/checkAppoitment">Book Appointment</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/presCard">Prescription</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink  onClick={()=>handleLogout('userToken')}>Logout</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </div>
            :
              <div className="flex relative space-x-6 text-center ">
                <li>
                  {' '}
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/register">Registration</NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/login">Login</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/docreg">Doctor Registration</NavLink>
                </li>
                <li>
                  <NavLink to="/docLogin">Doctor Login</NavLink>
                </li>
                <li>
                  <NavLink to="/userregister">User</NavLink>
                </li>
                <li>
                  <NavLink to="/userlogin">User Login</NavLink>
                </li> */}
                <li>
                  {' '}
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </div>
          }
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
