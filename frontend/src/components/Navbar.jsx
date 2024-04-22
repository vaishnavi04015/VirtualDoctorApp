import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import Cookies from 'js-cookie';
const Navbar = () => {
  const  docToken = Cookies.get('doctorLogin');
  const userToken = Cookies.get('userToken');
  const adminToken=Cookies.get('adminToken');
  let nav = useNavigate();

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
            <NavLink to="/contact">Contact</NavLink>
            </li>
            </div>
         :  
            docToken!=null?
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
            <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
                  {' '}
                <NavLink  onClick={()=>handleLogout('doctorLogin')}>Logout</NavLink>
                </li>
            </div>
         : userToken!=null?
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
                    <NavLink to="/checkAppoitment">Book Appointment</NavLink>
                  </li>
                  <li>
                  {' '}
                <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                  {' '}
                <NavLink  onClick={()=>handleLogout('userToken')}>Logout</NavLink>
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
              </li>
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
