import axios from "axios";
import { useState,useEffect } from "react";
const DoctorDetails=()=>
{
    let [data,setData] = useState([]);

    const getData=()=>
    {
        axios.get("http://localhost:5000/docDetails")
        .then((res)=>setData(res.data))
        .catch((e)=>console.log(e))
    }

    useEffect(()=>{getData()},[])

    return(<>
    
    <h1>Doctor Details</h1>

     {
        data?data.map((temp)=>{
            console.log(temp.photo)
            return <img src={`${temp.photo}`} /> 
        }) : <p>Data is loading</p>
    }
    
    </>)
}

export default DoctorDetails;