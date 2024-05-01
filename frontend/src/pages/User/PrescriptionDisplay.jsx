import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";

const PrescriptionDisplay = () => {
    let k = useLocation();
    let { name, email, doctorName, doctorEmail, dnt, prescription, advice } = k.state.prescription;
    console.log({ name, email, doctorName, doctorEmail, dnt, prescription, advice });

    return (
        <div className="max-w-4xl m-5 border-2 border-black mx-auto p-4">
            <div className="flex justify-center bg-sky-500 h-32 mb-4">
                <h2 className="text-5xl my-auto mr-3 font-bold text-white">Prescription</h2>
                <FaPlus size={100} color='#b22222' className='my-auto' />
            </div>
            <hr className='border-sky-300 mt-10 border-2'/>
            <div className="flex justify-between my-auto">
                <div className="flex flex-col">
                    {/* <h2 className="text-xl my-2">Email: {email}</h2> */}
                    <h2 className="text-xl my-2"><span className='font-bold'>Doctor Name: </span> {doctorName}</h2>
                    <h2 className="text-xl my-2"><span className='font-bold'>Doctor Email: </span> {doctorEmail}</h2>
                </div>
                <div>
                    <h2 className="text-xl my-2"><span className='font-bold'>Date: </span> {dnt.date}</h2>
                    <h2 className="text-xl my-2"><span className='font-bold'>Time: </span> {dnt.time}</h2>
                </div>
            </div>
            <hr className='border-sky-300 border-2'/>
            <div className="my-5 flex justify-between">
                <h2 className="text-xl"><span className='font-bold'>Patient Name:</span> {name}</h2>
                <h2 className="text-xl"><span className='font-bold'>Patient Email:</span> {email}</h2>
            </div>
            <table className="w-full border-collapse border border-slate-400 mt-16 my-6">
                <thead>
                    <tr className="bg-sky-200">
                        <th className="border border-slate-400 px-4 py-3 text-xl">Medicine</th>
                        <th className="border border-slate-400 px-4 py-3 text-xl">Before/After Meal</th>
                        <th className="border border-slate-400 px-4 py-3 text-xl">Times</th>
                        <th className="border border-slate-400 px-4 py-3 text-xl">Days</th>
                        <th className="border border-slate-400 px-4 py-3 text-xl">Dosage</th>
                        <th className="border border-slate-400 px-4 py-3 text-xl">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {prescription.map((temp, index) => (
                        <tr key={index} className="border border-slate-400">
                            <td className="border border-slate-400 px-4 py-3 text-xl">{temp.medicine}</td>
                            <td className="border border-slate-400 px-4 py-3 text-xl">{temp.meal}</td>
                            <td className="border border-slate-400 px-4 py-3 text-xl">{temp.times}</td>
                            <td className="border border-slate-400 px-4 py-3 text-xl">{temp.days}</td>
                            <td className="border border-slate-400 px-4 py-3 text-xl">{temp.dosage}</td>
                            <td className="rounded-md py-1 px-2 w-[98%] h-24 resize-none inline-block overflow-y-auto overflow-x-hidden">{temp.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="text-2xl text-red-400 underline underline-offset-2 font-extrabold mt-10">Advice:</h2>
            <h2 className="text-xl mt-4 mb-10">{advice}</h2>
            <div className="bg-sky-500 h-8 flex justify-center">
                <h2 className="text-lg my-auto mr-3 font-bold text-white">"Don't stop medication because now you feel fine,Please follow doctor prescription."</h2>
            </div>
        </div>
    );
};

export default PrescriptionDisplay;
