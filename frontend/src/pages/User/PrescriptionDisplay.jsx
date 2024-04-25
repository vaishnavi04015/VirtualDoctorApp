import React from 'react';
import { useLocation } from 'react-router-dom';

const PrescriptionDisplay = () => {
    let k = useLocation();
    let { name, email, doctorName, doctorEmail, dnt, prescription, advice } = k.state.prescription;
    console.log({ name, email, doctorName, doctorEmail, dnt, prescription, advice });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">Name: {name}</h2>
            <h2 className="text-xl mb-4">Email: {email}</h2>
            <h2 className="text-xl mb-4">Doctor Name: {doctorName}</h2>
            <h2 className="text-xl mb-4">Doctor Email: {doctorEmail}</h2>
            <h2 className="text-xl mb-4">Date: {dnt.date}</h2>
            <h2 className="text-xl mb-4">Time: {dnt.time}</h2>
            <table className="w-full border-collapse border border-gray-300 my-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-3 text-xl">Medicine</th>
                        <th className="border border-gray-300 px-4 py-3 text-xl">Before/After Meal</th>
                        <th className="border border-gray-300 px-4 py-3 text-xl">Times</th>
                        <th className="border border-gray-300 px-4 py-3 text-xl">Days</th>
                        <th className="border border-gray-300 px-4 py-3 text-xl">Dosage</th>
                        <th className="border border-gray-300 px-4 py-3 text-xl">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {prescription.map((temp, index) => (
                        <tr key={index} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-3 text-xl">{temp.medicine}</td>
                            <td className="border border-gray-300 px-4 py-3 text-xl">{temp.meal}</td>
                            <td className="border border-gray-300 px-4 py-3 text-xl">{temp.times}</td>
                            <td className="border border-gray-300 px-4 py-3 text-xl">{temp.days}</td>
                            <td className="border border-gray-300 px-4 py-3 text-xl">{temp.dosage}</td>
                            <td className="rounded-md py-1 px-2 w-[98%] h-24 resize-none inline-block overflow-y-auto overflow-x-hidden">{temp.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="text-xl mt-4">Advice:</h2>
            <h2 className="text-xl mt-4 h-72 resize-none inline-block overflow-y-auto overflow-x-hidden">{advice}</h2>
        </div>
    );
};

export default PrescriptionDisplay;
