import React from 'react'
import { NavLink } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div>
     <div className='bg-slate-700 text-slate-100 font-semibold text-xl h-18 p-5 align-middle text-center sticky'>
       <ul className='flex relative justify-around text-center'>

         <h1 className='relative align-middle w-1/6'>24/7 Virtual Care</h1>
          <li> <NavLink to="/">Home</NavLink></li>
          <li> <NavLink to="/about">About</NavLink></li>
          <li className='flex relative justify-between ' ><CiSearch className='text-white h-8 w-7 mr-3 border-lime-200' />
          <input placeholder='  search' className='text-black w-72 h-9 border rounded ' type='search'/>
          </li>
          
          <li> <NavLink to="/services">Services</NavLink></li>
          <li> <NavLink to="/contact">Contact</NavLink></li>
          <li> <NavLink to="/auth">Login/Register</NavLink></li>
          <li><NavLink to="/docreg">Doctor Registration</NavLink></li>
          <li><NavLink to="/docdetails">Doctor Details</NavLink></li>
       </ul>
       </div>
    </div>
  )
}

export default Navbar