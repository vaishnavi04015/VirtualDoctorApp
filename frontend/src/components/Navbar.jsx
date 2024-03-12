import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    <div className='bg-slate-800 text-cyan-100  h-18 p-4'>
       <ul className='flex relative justify-around text-center'>
    <h1 className='relative align-middle w-1/5 bg-slate-500'>LOGO HERE</h1>
          <li> <NavLink to="/">Home</NavLink></li>
          <li> <NavLink to="/about">About</NavLink></li>
          <li> <NavLink to="/services">Services</NavLink></li>
          <li> <NavLink to="/fav">Favorites</NavLink></li>
          <li> <NavLink to="/contact">Contact</NavLink></li>
          <li> <NavLink to="/contact">Login/Register</NavLink></li>
       </ul>
       </div>
    </div>
  )
}

export default Navbar