import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Prescription = () => {
    const [prescription, setPrescription] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [advice, setAdvice] = useState('');
    const doctorEmail = Cookies.get('email');
    const doctorName = Cookies.get('name');


    const addMedicine = () => {
        setPrescription([...prescription, { medicine: '', meal: '', times: [], dosage: '', days: '', notes: '' }]);
    };

    const removeMedicine = (index) => {
        const newPrescription = [...prescription];
        newPrescription.splice(index, 1);
        setPrescription(newPrescription);
    };

    const handlePrescription = (index, e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        const newPrescription = [...prescription];
        if (name === 'times') {
            if (val) {
                newPrescription[index][name].push(value);
            } else {
                const indexToRemove = newPrescription[index][name].indexOf(value);
                if (indexToRemove !== -1) {
                    newPrescription[index][name].splice(indexToRemove, 1);
                }
            }
        } else {
            newPrescription[index][name] = val;
        }
        setPrescription(newPrescription);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() !== '' && email.trim() !== '' && prescription.length > 0 && prescription.every(item => item.medicine.trim() !== '' && item.meal.trim() !== '' && item.times.length > 0 && item.dosage.trim() !== '' && item.days.trim() !== '')) {
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Prescription:', prescription);
            const date = new Date().toLocaleDateString("en-GB");
            const time = new Date().toLocaleTimeString();
            console.log(date);
            console.log(time);
            console.log(advice);
            axios.post("http://localhost:5000/pres/addPrescription",{name,email,doctorName,doctorEmail,date,time,prescription,advice})
            .then((res)=>{
                alert(res.data)
                console.log(res.data)
            })
            .catch((e)=>console.log(e))
        } else {
            alert('Please fill in all fields.');
        }
    };
    
    

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Patient Name:</label>
                    <input type='text' onChange={(e) => setName(e.target.value)} className="border-2 rounded-md py-1 px-2 w-48" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Patient Email:</label>
                    <input type='text' onChange={(e) => setEmail(e.target.value)} className="border-2 rounded-md py-1 px-2 w-48" />
                </div>
                <button type='button' onClick={addMedicine} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-4 hover:bg-blue-600">Add Medicine</button>
                <table className="border-collapse w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border-2">Medicine</th>
                            <th className="border-2">Before/After Meal</th>
                            <th className="border-2">Times</th>
                            <th className="border-2">Dosage</th>
                            <th className="border-2">Days</th>
                            <th className="border-2">Notes</th>
                            <th className="border-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescription.map((temp, index) => (
                            <tr key={index}>
                                <td className="border-2 text-center"><input type='text' name='medicine' value={temp.medicine} onChange={(e) => handlePrescription(index, e)} className="border-2 rounded-md py-1 px-2 w-[65%] inline-block" /></td>
                                <td className="border-2 text-center">
                                    <select name='meal' value={temp.meal} onChange={(e) => handlePrescription(index, e)} className="border-2 rounded-md py-1 px-2 w-32">
                                        <option value=''>Select</option>
                                        <option value='Before'>Before</option>
                                        <option value='After'>After</option>
                                        <option value='Both'>Both</option>
                                    </select>
                                </td>
                                <td className="border-2 text-center">
                                    <label><input type='checkbox' name='times' value='Morning' checked={temp.times.includes('Morning')} onChange={(e) => handlePrescription(index, e)} /> Morning</label><br/>
                                    <label><input type='checkbox' name='times' value='Afternoon' checked={temp.times.includes('Afternoon')} onChange={(e) => handlePrescription(index, e)} /> Afternoon</label><br/>
                                    <label><input type='checkbox' name='times' value='Evening' checked={temp.times.includes('Evening')} onChange={(e) => handlePrescription(index, e)} /> Evening</label><br/>
                                    <label><input type='checkbox' name='times' value='Night' checked={temp.times.includes('Night')} onChange={(e) => handlePrescription(index, e)} /> Night</label>
                                </td>
                                <td className="border-2 text-center"><input type='text' name='dosage' value={temp.dosage} onChange={(e) => handlePrescription(index, e)} className="border-2 rounded-md py-1 px-2 w-32 inline-block" /></td>
                                <td className="border-2 text-center"><input type='text' name='days' value={temp.days} onChange={(e) => handlePrescription(index, e)} className="border-2 rounded-md py-1 px-2 w-32 inline-block" /></td>
                                <td className="border-2 text-center">
                                    <textarea
                                        name='notes'
                                        value={temp.notes}
                                        onChange={(e) => handlePrescription(index, e)}
                                        className="border-2 rounded-md py-1 px-2 w-[98%] h-28 resize-none inline-block overflow-y-auto overflow-x-hidden"
                                    ></textarea>
                                </td>
                                <td className="border-2 text-center">
                                    <button type='button' onClick={() => removeMedicine(index)} className="bg-red-500 text-white font-bold py-1 px-2 rounded-full hover:bg-red-600">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <textarea
                    onChange={(e) => setAdvice(e.target.value)}
                    className="border-2 rounded-md py-1 px-2 w-[55%] h-52 resize-none overflow-y-auto overflow-x-hidden"
                    placeholder="Enter additional advice or information..."
                ></textarea>
                <br/>
                <button type='submit' className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600">Submit</button>
            </form>
        </div>
    );
};

export default Prescription;
