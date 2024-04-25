import axios from "axios";
import { useState,useEffect } from "react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";

const DoctorAppointment = () =>{
    let [data,setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState("");

    const getData=()=>
    {
        axios.get("http://localhost:5000/docDetails")
        .then((res)=>setData(res.data))
        .catch((e)=>console.log(e))
    }
    useEffect(()=>{getData()},[])

    useEffect(()=>{
        setSearchData(data.filter((temp)=>temp.name.toLowerCase().includes(search.toLowerCase()) || temp.expertise.includes(search.toLowerCase()) || temp.experience==search ));
      },[search])

    return(
    <div>
        <input
            type='text'
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."
            className="w-[40%] mt-10 ml-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {
            search.length>0
            ?
                searchData.map((temp,index)=>{if(temp.verified==true){
                    return (
                        <DoctorAppointmentCard key={index} name={temp.name} expertise={temp.expertise} experience={temp.experience} email={temp.email} phone={temp.phone} photo={temp.photo} />
                )}})
            :
            data?data.map((temp,index)=>{if(temp.verified==true){
                return (
                    <DoctorAppointmentCard key={index} name={temp.name} expertise={temp.expertise} experience={temp.experience} email={temp.email} phone={temp.phone} photo={temp.photo} />
            )}}) : <p>Data is loading</p>
        }
    </div>)
}
export default DoctorAppointment