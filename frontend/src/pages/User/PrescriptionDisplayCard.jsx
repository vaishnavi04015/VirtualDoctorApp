import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PrescriptionDisplayCard = () => {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState("");
    const email = Cookies.get('email');
    const token = Cookies.get('userToken') || null;
    const nav = useNavigate();


    useEffect(() => {
        if(token)
        {
            axios.get(`http://localhost:5000/pres/getPrescription/${email}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => console.log(e))
        }
        else
        {
            axios.get(`http://localhost:5000/pres/getDocPrescription/${email}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => console.log(e))
        }
    }, [email,token]);

    useEffect(()=>{
        if(token)
        {
            setSearchData(data.filter((temp)=>temp.doctorName.toLowerCase().includes(search.toLowerCase())||temp.doctorEmail.includes(search.toLowerCase())));
        }
        else
        {
            setSearchData(data.filter((temp)=>temp.name.toLowerCase().includes(search.toLowerCase())||temp.email.includes(search.toLowerCase())));
        }
    },[search])

    const handleLink = (prescription) => {
        nav("/presDisplay",{state:{prescription}})
    }

    return (
        <div>
            <input
                type='text'
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search by Email/Name"
                className="w-[40%] mt-10 ml-[30%] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {
                search.length>0 ? 
                searchData.map((temp, index) => (
                    <div key={index} className="mb-4 ml-[25%] p-4 border border-gray-300 rounded w-[50%] m-8" onClick={()=>handleLink(temp)}>
                        <div className="flex justify-between mb-2">
                            <div>
                                <h2 className="text-xl font-bold">{token ? temp.doctorName : temp.name}</h2>
                                <h2 className="text-black">{token ? temp.doctorEmail : temp.email}</h2>
                            </div>
                            <div>
                                <h3 className="text-black">{temp.dnt.date}</h3>
                                <h3 className="text-black">{temp.dnt.time}</h3>
                            </div>
                        </div>
                    </div>
                ))
                :
                data.map((temp, index) => (
                    <div key={index} className="mb-4 ml-[25%] p-4 border border-gray-300 rounded w-[50%] m-8" onClick={()=>handleLink(temp)}>
                        <div className="flex justify-between mb-2">
                            <div>
                                <h2 className="text-xl font-bold">{token ? temp.doctorName : temp.name}</h2>
                                <h2 className="text-black">{token ? temp.doctorEmail : temp.email}</h2>
                            </div>
                            <div>
                                <h3 className="text-black">{temp.dnt.date}</h3>
                                <h3 className="text-black">{temp.dnt.time}</h3>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default PrescriptionDisplayCard;
