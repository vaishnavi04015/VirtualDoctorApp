import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import About from '../pages/About';
import Contact from '../pages/contact/Contact';
import Favorites from '../pages/Favorites';
import Services from '../pages/Services';
import DoctorRegistration from '../pages/DoctorRegistration';
import DoctorDetails from '../pages/SuperAdmin/DoctorDetails';
import UserRegistration from '../pages/auth/UserRegistration';
import DoctorRequestCard from '../pages/SuperAdmin/DoctorRequestCard';
import BookSchedule from '../pages/User/BookSchedule';
import DoctorLogin from '../pages/Doctor/DoctorLogin';
import UserLogin from '../pages/auth/UserLogin';
import DoctorSchedule from '../pages/Doctor/DoctorSchedule';
import DoctorAppointment from '../pages/User/DoctorAppointment';
import Prescription from '../pages/Doctor/Prescription';
import PrescriptionDisplayCard from '../pages/User/PrescriptionDisplayCard';
import PrescriptionDisplay from '../pages/User/PrescriptionDisplay';
import Registration from '../components/Registration';
import Login from '../components/Login';
import ReviewsDisplay from '../pages/User/ReviewsDisplay';

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/fav" element={<Favorites />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/auth" element={<Services />}></Route>
        <Route path="/register" element={<Registration/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

        {/* User Auth */}
        <Route path="/userregister" element={<UserRegistration />}></Route>
        <Route path="/userlogin" element={<UserLogin />}></Route>

        {/* Doctor Auth */}
        <Route path="/docreg" element={<DoctorRegistration />}></Route>
        <Route path="/docLogin" element={<DoctorLogin />}></Route>

        <Route path="/docrequests" element={<DoctorRequestCard />}></Route>
        <Route path="/bookAppoitment" element={<BookSchedule />}></Route>
        <Route path="/docdetails" element={<DoctorDetails />}></Route>
        <Route path="/docSchedule" element={<DoctorSchedule/>}></Route>
        <Route path="/checkAppoitment" element={<DoctorAppointment/>}></Route>
        <Route path="/pres" element={<Prescription/>}></Route>
        <Route path="/presCard" element ={<PrescriptionDisplayCard/>}></Route>
        <Route path="/presDisplay" element={<PrescriptionDisplay/>}></Route>
        <Route path="/reviewDisplay" element={<ReviewsDisplay/>}></Route>

      </Routes>
    </>
  );
};

export default PublicRoutes;
