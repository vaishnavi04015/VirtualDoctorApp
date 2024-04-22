import { useLocation } from "react-router-dom"
import axios from "axios";
import { useState,useEffect } from "react";

const BookSchedule = () =>{
    let k=useLocation();
    let {email} = k.state;
    let [data,setData] = useState([]);
    let [color,setColor] = useState();
    let[flag,setFlag] = useState(false);

    const getData=()=>
    {
        axios.get(`http://localhost:5000/getSchedule/${email}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((e)=>console.log(e))
    }

    const handleBooking=(index)=>{
        setColor((temp)=>temp === index ? null : index);
    }
    
    useEffect(()=>{getData()},[])

    return(<div>
        {data && data.length>0 ?data.map((temp, dayIndex)=>{
            return(<div key={dayIndex}>
                <p>{temp.dnt.date}</p>
                {
                    temp.dnt.time.map((time,timeIndex)=>{
                        const index = dayIndex.toString() + timeIndex.toString()
                        return(<button key={index} className={`m-5 ${color === index ? "bg-green-500" : "bg-blue-500"}`} onClick={()=>handleBooking(index)}>{time}</button>)
                    })
                }
            </div>)
        }):<h1>No Schedules to book</h1>}
      
      <button className="bg-slate-500">Book Slot</button>
    </div>)
}
export default BookSchedule