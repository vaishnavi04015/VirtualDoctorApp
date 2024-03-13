import React from 'react'
import doctorImg from '../images/doctorImg.png'
import VerifiedDoctors from '../images/VerifiedDoctors.png'
const HeroSection = () => {
  return (
    <>

    <div className='bg-gradient-to-r from-slate-200 to-white flex justify-around relative align-middle '>
       <div className=' felx  justify-around relative align-middle p-4 mt-20 h-1/4'>
      <h1 className='text-5xl text-slate-700 font-semibold relative  leading-normal '>Your Wellness, <br></br>Our  Priority: Where Health <br></br>Meets Care.</h1>
       <p className=''>Our expert team of doctors combines cutting-edge medical technology with<br></br>
        compassionate, personalized attention to provide precision medicine tailored<br></br>
        to your unique needs. From routine check-ups to complex treatments, trust us<br></br>
        to be your unwavering partner in health.</p>
       </div>
       
        <img className='w-1/3' src={doctorImg} alt='doctorImage'/>
    </div>

    <div className='flex justify-around bg-slate-600 h-72'>
    
      <div className='bg-sky-100 p-6 m-5'>
      <img className='w-20' src={VerifiedDoctors} alt='verfied Doctors'/>
      <div className='text-2xl'>24/7 Services</div>
       <div className='mt-2'>
        Discover skilled doctors based on<br></br>
        specialization and location.<br></br>
       </div> 
        <button className='bg-blue-500 text-white p-2 w-1/2 border rounded-md mt-3'>Read more</button>
        </div>

        <div className='bg-sky-100 p-6 m-5'>
      <img className='w-20' src={VerifiedDoctors} alt='verfied Doctors'/>
      <div className='text-2xl'>24/7 Services</div>
       <div className='mt-2'>
        Discover skilled doctors based on<br></br>
        specialization and location.<br></br>
       </div> 
        <button className='bg-blue-500 text-white p-2 w-1/2 border rounded-md mt-3'>Read more</button>
        </div>

        <div className='bg-sky-100 p-6 m-5'>
      <img className='w-20' src={VerifiedDoctors} alt='verfied Doctors'/>
      <div className='text-2xl'>24/7 Services</div>
       <div className='mt-2'>
        Discover skilled doctors based on<br></br>
        specialization and location.<br></br>
       </div> 
        <button className='bg-blue-500 text-white p-2 w-1/2 border rounded-md mt-3'>Read more</button>
        </div>
    </div>
    </>
  )
}

export default HeroSection