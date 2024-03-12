import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Favorites from '../pages/Favorites'
import Services from '../pages/Services'

const PublicRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/fav' element={<Favorites/>}></Route>
            <Route path='/services' element={<Services/>}></Route>
        </Routes>
    </div>
  )
}

export default PublicRoutes