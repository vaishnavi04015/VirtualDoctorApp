import React from 'react';
import { SlBadge } from "react-icons/sl";
import { FaFilePrescription } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import Corousal from './Corousal';
import { FaCircleChevronRight } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";
import { MdHorizontalRule } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { PiPrescription } from "react-icons/pi";


function About() {
  return (
    <div>
      <div className='w-full h-96 bg-[url("https://www.golevelone.com/wp-content/uploads/slider8/slide-2.png")] bg-[length:100%_384px]'>
        {/* <img src="https://www.golevelone.com/wp-content/uploads/slider8/slide-2.png" className='w-full h-96'/> */}
        <div className='absolute top-36 left-[3%] '>
                 <span className='text-5xl'>Skip the travel!</span><br/>
                 <span className='text-5xl'>Take Online Doctor Consultation</span><br/><br/>
                 <span className='text-2xl'>Private consultation + Video call · Starts at just ₹199</span><br/><br/>
                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mr-4">Consult Now</button>
                 <br/><br/><br/>
                 <div className='flex w-[90%] justify-between font-medium mt-2'>
                  <p className='flex'><span className='mt-1 mr-2'><SlBadge /></span> Verified Doctors</p>
                  <p className='flex'><span className='mt-1 mr-2'><FaFilePrescription /></span>Digital Prescription</p>
                  <p className='flex'><span className='mt-1 mr-2'><BiCommentDetail /></span>Free Followup</p>
                 </div>
        </div>
      </div>
      <div className='relative top-16'>
              <h1 className='text-3xl ml-[3%] font-semibold'>Common Health Concerns</h1>
              <p className='text-lg text-gray-500 ml-[3%]'>Consult a doctor online for any health issue</p>
              <br/><br/>
              <div className='ml-[0.5%]'>
                 <Corousal/>
              </div>
      </div>
      <br/><br/><br/>
       <div className='relative top-16 ml-[3%]'>
         <h1 className='text-3xl font-semibold'>Offers</h1>
         <div className='flex mt-10 w-[90%] justify-between'>
          <div className='w-[48%] h-56 bg-green-300 flex rounded'>
            <div className='w-[90%]'>
            <p className=' bg-white py-1 text-green-500 w-max mt-4 ml-4 font-medium px-3'>OFFER</p>
            <br/>
            <p className=' text-3xl font-semibold ml-4'>Download the App & get</p>
            <p className=' text-3xl font-semibold ml-4'>₹200 HealthCash</p>
            <br/>
            <p className=' text-xl font-semibold ml-4 flex'>Download App<span className='mt-1.5 ml-2'><FaCircleChevronRight/></span> </p>
            </div>
            <div className='grid place-items-end justify-end'>
            <img src="https://www.practo.com/consult/static/images/offer-app-v1.png" width="100px" height="90px"/>
            </div>
          </div>
          <div className='w-[48%] h-56 bg-orange-300 flex rounded'>
            <div className='w-[90%]'>
            <p className=' bg-white py-1 text-orange-500 w-max mt-4 ml-4 font-medium px-3'>OFFER</p>
            <br/>
            <p className=' text-3xl font-semibold ml-4'>Consult with specialists at</p>
            <p className=' text-3xl font-semibold ml-4'>just ₹199</p>
            <br/>
            <p className=' text-xl font-semibold ml-4 flex'>Consult Now<span className='mt-1.5 ml-2'><FaCircleChevronRight/></span> </p>
            </div>
            <div className='grid place-items-end justify-end'>
            <img src="https://www.practo.com/consult/static/images/offer-specialist-v1.png" width="100px" height="90px"/>
            </div>
          </div>
         </div>
         <br/><br/> <br/> <br/>
         <div className='grid place-items-center'>
           <h1 className=' text-4xl font-semibold'>How it works</h1>
           <br/><br/>
           <div className="flex">
           <div>
           <LuMousePointerClick size={70} className=' bg-gray-200 rounded-full p-4 ml-14'/>
           <p className='mt-4'>Select a speciality or symptom</p>
           </div>
           <hr className='border-gray-200 mt-9 border-2 w-96 '/>
           <GoCommentDiscussion  size={70} className=' bg-gray-200 rounded-full p-4'/>
           <hr className='border-gray-200 mt-9 border-2 w-96 '/>
           <PiPrescription size={70} className=' bg-gray-200 rounded-full p-4'/>
           </div>
         </div>
       </div>
    </div>
  );
}

export default About;
