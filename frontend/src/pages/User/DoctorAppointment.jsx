import axios from "axios";
import { useState,useEffect } from "react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";

const DoctorAppointment = () =>{
    let [data,setData] = useState([]);
    const getData=()=>
    {
        axios.get("http://localhost:5000/docDetails")
        .then((res)=>setData(res.data))
        .catch((e)=>console.log(e))
    }
    useEffect(()=>{getData()},[])

    return(<div>
        {
            data?data.map((temp,index)=>{if(temp.verified==true){
                return (
                    <DoctorAppointmentCard key={index} name={temp.name} expertise={temp.expertise} experience={temp.experience} email={temp.email} phone={temp.phone} photo={temp.photo} />
            )}}) : <p>Data is loading</p>
        }
    </div>)
}
export default DoctorAppointment