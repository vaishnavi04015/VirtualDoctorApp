import axios from "axios";
import { useState } from "react";
const DoctorRegistration=()=>
{
  let [name,setName]= useState("");
  let [email,setEmail]= useState("");
  let[phone,setPhone] = useState(0);
  let [password,setPassword]= useState("");
  let[cpassword,setCpassword] = useState("");
  let[expertise,setExpertise]= useState("");
  let [experience,setExperience] = useState(0);
  let [address,setAddress] = useState("");
  let[gender,setGender] = useState("");
  let[mssg,setMssg] = useState("");
  const [photo, setPhoto] = useState(null);
  const [license, setLicense] = useState(null);
  const [degree, setDegree] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleLicenseChange = (e) => {
    setLicense(e.target.files[0]);
  };

  const handleDegreeChange = (e) => {
    setDegree(e.target.files[0]);
  };

  const pssd=()=>
{
    if(password!==cpassword)
    {
        setMssg("Password dosen't match");
    }
    else
    {
       setMssg("");
    }

}


  const handleSubmit=async(e)=>
  {
     e.preventDefault();
     try
     {
        if(password===cpassword)
        {
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('license',license );
        formData.append('degree',degree );
        formData.append('name',name);
        formData.append('email',email);
        formData.append('phone',phone);
        formData.append('password',password);
        formData.append('expertise',expertise);
        formData.append('experience',experience);
        formData.append('address',address);
        formData.append('gender',gender);
        await axios.post("http://localhost:5000/docSubmit",formData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        console.log("Successful")
        }
        else
        {
          alert("Password dosen't match!!!")
        }
     }
     catch(e)
     {
      console.log(e);
     }
  }
   
    return(<>
    <h1>Doctor Registration Form</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e)=>setName(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="name" required/>
      <br/><br/>
      <input type="email" onChange={(e)=>setEmail(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="email" required/>
      <br/><br/>
      <input type="number" onChange={(e)=>setPhone(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="phone" required/>
      <br/><br/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="password" required/>
      <br/><br/>
      <input type="password" onChange={(e)=>setCpassword(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="confirm password" required onKeyUp={pssd}/>
      <p className="text-red-600">{mssg}</p>
      <br/><br/>
      <input type="text" onChange={(e)=>setExpertise(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="expertise" required/>
      <br/><br/>
      <input type="number" onChange={(e)=>setExperience(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="experience" required/>
      <br/><br/>
      <input type="text" onChange={(e)=>setAddress(e.target.value)} style={{backgroundColor:"bisque"}} placeholder="address" required/>
      <br/><br/>
      <input type="radio" name="gender"  onChange={()=>setGender("Male")}/><label>Male</label>
      <br/><br/>
      <input type="radio" name="gender" onChange={()=>setGender("Female")}/><label>Female</label>
      <br/><br/>
      <input type="radio" name="gender" onChange={()=>setGender("Others")} checked /><label>Other</label>
      <br/><br/>
      <p>Photo Upload</p>
      <input type="file" accept="image/*" onChange={handlePhotoChange} name="photo" required/>
      <br/><br/>
      <p>License upload</p>
      <input type="file" accept=".pdf" onChange={handleLicenseChange} name="license"  required/>
      <br/><br/>
      <p>Degree upload</p>
      <input type="file" accept=".pdf" onChange={handleDegreeChange} name="degree" required/>
      <br/><br/>
      <button type="submit" style={{backgroundColor:"bisque"}}>Submit</button>
    </form>
    </>)
}

export default DoctorRegistration;