import React from 'react';
import { SlBadge } from 'react-icons/sl';
import { FaFilePrescription } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import Corousal from './Corousal';
import { FaCircleChevronRight } from 'react-icons/fa6';
import { LuMousePointerClick } from 'react-icons/lu';
import { MdHorizontalRule } from 'react-icons/md';
import { GoCommentDiscussion } from 'react-icons/go';
import { PiPrescription } from 'react-icons/pi';

function About() {
  return (
    <div>
      <div className='w-full h-[550px] bg-[url("https://www.att.com/scmsassets/upper_funnel/wireless/2000240_-base-hero-bestdeal-tbl-retina.jpg")] bg-[length:100%_550px]'>
      {/* <div className='w-full h-[500px] bg-[url("https://www.golevelone.com/wp-content/uploads/slider8/slide-2.png")] bg-[length:100%_500px]'> */}
        {/* <img src="https://www.golevelone.com/wp-content/uploads/slider8/slide-2.png" className='w-full h-96'/> */}
        <div className="absolute top-44 left-[3%] ">
          <span className="text-5xl">Skip the travel!</span>
          <br />
          <span className="text-5xl">Take Online Doctor Consultation</span>
          <br />
          <br />
          <span className="text-2xl">
            Private consultation + Video call · Starts at just ₹199
          </span>
          <br />
          <br />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mr-4">
            Consult Now
          </button>
          <br />
          <br />
          <br /><br />
          <br /><br />
          <div className="flex w-[90%] justify-between font-medium mt-2">
            <p className="flex">
              <span className="mt-1 mr-2">
                <SlBadge />
              </span>{' '}
              Verified Doctors
            </p>
            <p className="flex">
              <span className="mt-1 mr-2">
                <FaFilePrescription />
              </span>
              Digital Prescription
            </p>
            <p className="flex">
              <span className="mt-1 mr-2">
                <BiCommentDetail />
              </span>
              Free Followup
            </p>
          </div>
        </div>
      </div>
      <div className="relative top-16">
        <h1 className="text-3xl ml-[3%] font-semibold">
          Common Health Concerns
        </h1>
        <p className="text-lg text-gray-500 ml-[3%]">
          Consult a doctor online for any health issue
        </p>
        <br />
        <br />
        <div className="ml-[0.5%]">
          <Corousal />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="relative top-16 ml-[3%] w-[90%]">
        <h1 className="text-3xl font-semibold">Offers</h1>
        <div className="flex mt-10 justify-between">
          <div className="w-[48%] h-56 bg-green-300 flex rounded">
            <div className="w-[90%]">
              <p className=" bg-white py-1 text-green-500 w-max mt-4 ml-4 font-medium px-3">
                OFFER
              </p>
              <br />
              <p className=" text-3xl font-semibold ml-4">
                Download the App & get
              </p>
              <p className=" text-3xl font-semibold ml-4">₹200 HealthCash</p>
              <br />
              <p className=" text-xl font-semibold ml-4 flex">
                Download App
                <span className="mt-1.5 ml-2">
                  <FaCircleChevronRight />
                </span>{' '}
              </p>
            </div>
            <div className="grid place-items-end justify-end">
              <img
                src="https://www.practo.com/consult/static/images/offer-app-v1.png"
                width="100px"
                height="90px"
              />
            </div>
          </div>
          <div className="w-[48%] h-56 bg-orange-300 flex rounded">
            <div className="w-[90%]">
              <p className=" bg-white py-1 text-orange-500 w-max mt-4 ml-4 font-medium px-3">
                OFFER
              </p>
              <br />
              <p className=" text-3xl font-semibold ml-4">
                Consult with specialists at
              </p>
              <p className=" text-3xl font-semibold ml-4">just ₹199</p>
              <br />
              <p className=" text-xl font-semibold ml-4 flex">
                Consult Now
                <span className="mt-1.5 ml-2">
                  <FaCircleChevronRight />
                </span>{' '}
              </p>
            </div>
            <div className="grid place-items-end justify-end">
              <img
                src="https://www.practo.com/consult/static/images/offer-specialist-v1.png"
                width="100px"
                height="90px"
              />
            </div>
          </div>
        </div>
        <br />
        <br /> <br /> <br />
        <div className="grid place-items-center">
          <h1 className=" text-4xl font-semibold">How it works</h1>
          <br />
          <br />
          <div className="flex">
            <div>
              <div className="flex">
                <LuMousePointerClick
                  size={70}
                  className=" bg-gray-200 rounded-full p-4 ml-14"
                />
                <hr className="border-gray-200 mt-9 border-2 w-[50%] " />
              </div>
              <p className="mt-4">Select a speciality or symptom</p>
            </div>
            <hr className="border-gray-200 mt-9 border-2 w-[20%] " />
            <div>
              <div className="flex">
                <hr className="border-gray-200 mt-9 border-2 w-[60%] " />
                <GoCommentDiscussion
                  size={70}
                  className=" bg-gray-200 rounded-full p-4"
                />
                <hr className="border-gray-200 mt-9 border-2 w-[50%] " />
              </div>
              <p className="mt-4">Audio/ video call with a verified doctor</p>
            </div>
            <hr className="border-gray-200 mt-9 border-2 w-[20%] " />
            <div>
              <div className="flex">
                <hr className="border-gray-200 mt-9 border-2 w-[50%] " />
                <PiPrescription
                  size={70}
                  className=" bg-gray-200 rounded-full p-4"
                />
              </div>
              <p className="mt-4">
                Get a digital prescription & a free follow-up
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="w-full h-32 bg-slate-900 text-white flex justify-evenly">
        <div className="mt-7">
          <p className=" text-3xl font-semibold">2,00,000+</p>
          <p className=" text-lg ml-2 font-semibold">Happy Users</p>
        </div>
        <div className="mt-7">
          <p className=" text-3xl font-semibold ml-3">20,000+</p>
          <p className=" text-lg font-semibold">Verified Doctors</p>
        </div>
        <div className="mt-7">
          <p className=" text-3xl font-semibold ml-6">25+</p>
          <p className=" text-lg  font-semibold">Specialities</p>
        </div>
        <div className="mt-7">
          <p className=" text-3xl font-semibold">4.5 / 5</p>
          <p className=" text-lg  font-semibold">App Rating</p>
        </div>
      </div>
    </div>
  );
}

export default About;
