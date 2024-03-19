import { useLocation } from "react-router-dom";
import PdfModal from "./PdfModal";
import axios from "axios";

const DoctorDetails=()=>
{
    let k = useLocation();
    let {name,email,phone,experience,degree,expertise,gender,photo,license,address} = k.state.details;

     const Accept=()=>
     {
       axios.patch("http://localhost:5000/docVerfication",{email})
       .then((res)=>alert(res.data))
       .catch((e)=>console.log(e))
     }

     const Decline=()=>
     {

        axios.delete(`http://localhost:5000/docDelete/${email}`)
        .then((res)=>alert(res.data))
        .catch((e)=>console.log(e))
     }
    return(<>
     
          <div>
            <h1 className="text-xl font-bold text-center">Details</h1>
            <img src={`./public/Doctordetails/${photo}`} className="absolute right-[2%] top-37 border-solid w-52 h-52"/>
            <table>
                <tr><td>Name: </td><td>{name}</td></tr>
                <tr><td>Gender</td><td>{gender}</td></tr>
                <tr><td>Expertise: </td><td>{expertise}</td></tr>
                <tr><td>Experience: </td><td>{experience}</td></tr>
                <tr><td>Phone: </td><td>{phone}</td></tr>
                <tr><td>Email: </td><td>{email}</td></tr>
                <tr><td>Address: </td><td>{address}</td></tr>
                <tr><td><PdfModal name="View Degree" fileName={degree}/></td><td><PdfModal name="View License" fileName={license}/></td></tr>
            </table>
            <button className="bg-green-400" onClick={Accept}> Accept</button> <button className="bg-red-400" onClick={Decline}>Decline</button>
          </div>

    </>)
}

export default DoctorDetails;