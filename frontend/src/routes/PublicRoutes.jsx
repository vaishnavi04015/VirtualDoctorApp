import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import About from '../pages/About'
import Contact from '../pages/contact/Contact'
import Favorites from '../pages/Favorites'
import Services from '../pages/Services'
import DoctorRegistration from '../pages/DoctorRegistration'
import DoctorDetails from '../pages/SuperAdmin/DoctorDetails'

const PublicRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/fav' element={<Favorites/>}></Route>
            <Route path='/services' element={<Services/>}></Route>
            <Route path='/auth' element={<Services/>}></Route>
            <Route path='/docreg' element={<DoctorRegistration/>}></Route>
            <Route path="/docdetails" element={<DoctorDetails/>}></Route>
        </Routes>
    </div>
  )
}

export default PublicRoutes