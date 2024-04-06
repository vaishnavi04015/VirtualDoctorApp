import { useLocation } from "react-router-dom"
import axios from "axios";
import { useState,useEffect } from "react";

const BookSchedule = () =>{
    let k=useLocation();
    let {email} = k.state;
    let [data,setData] = useState([]);

    const getData=()=>
    {
        axios.get(`http://localhost:5000/getSchedule/${email}`)
        .then((res)=>{
            setData(res.data)
            // console.log(res.data)
        })
        .catch((e)=>console.log(e))
    }
    
    useEffect(()=>{getData()},[])

    return(<div>
        {data && data.length>0 ?data.map((temp)=>{
            return(<div>
                <p>{temp.dnt.date}</p>
                {
                    temp.dnt.time.map((time)=>{
                        return(<button className="bg-blue-500 m-5">{time}</button>)
                    })
                }
            </div>)
        }):null}
    </div>)
}
export default BookSchedule