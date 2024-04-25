import React, { useState } from 'react';
import axios from 'axios';

const DoctorRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [mssg, setMssg] = useState("");
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

  const pssd = () => {
    if (password !== cpassword) {
      setMssg("Password doesn't match");
    } else {
      setMssg("");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === cpassword) {
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('license', license);
        formData.append('degree', degree);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('expertise', expertise);
        formData.append('experience', experience);
        formData.append('address', address);
        formData.append('gender', gender);
        await axios.post("http://localhost:5000/docSubmit", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res) => alert(res.data)).catch((e) => console.log(e));
      } else {
        alert("Password doesn't match!!!")
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1 className="text-center font-bold text-4xl mb-6">Doctor Registration</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/4 p-4">
          <label className="block mb-2">Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Name" required />
          <label className="block mb-2">Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Email" required />
          <label className="block mb-2">Phone:</label>
          <input type="number" onChange={(e) => setPhone(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Phone" required />
          <label className="block mb-2">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Password" required />
          <label className="block mb-2">Confirm Password:</label>
          <input type="password" onChange={(e) => setCpassword(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Confirm Password" required onKeyUp={pssd} />
          <p className="text-red-600">{mssg}</p>
          <label className="block mb-2">Expertise:</label>
          <input type="text" onChange={(e) => setExpertise(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Expertise" required />
        </div>
        <div className="w-full md:w-1/4 p-4">
          <label className="block mb-2">Experience:</label>
          <input type="number" onChange={(e) => setExperience(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Experience" required />
          <label className="block mb-2">Address:</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} className="w-full p-2 rounded border border-gray-300 mb-4" placeholder="Address" required />
          <div className="flex">
            <label className="mr-4">Gender:</label>
            <input type="radio" name="gender" onChange={() => setGender("Male")} /><label className="mr-4">Male</label>
            <input type="radio" name="gender" onChange={() => setGender("Female")} /><label className="mr-4">Female</label>
            <input type="radio" name="gender" onChange={() => setGender("Others")} checked /><label>Other</label>
          </div>
          <p className="mt-4">Photo Upload:</p>
          <input type="file" accept="image/*" onChange={handlePhotoChange} name="photo" required />
          <p className="mt-4">License Upload:</p>
          <input type="file" accept=".pdf" onChange={handleLicenseChange} name="license" required />
          <p className="mt-4">Degree Upload:</p>
          <input type="file" accept=".pdf" onChange={handleDegreeChange} name="degree" required />
        </div>
        <div className="w-full text-center mt-4">
          <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded">Submit</button>
        </div>
      </form>
    </>
  )
}

export default DoctorRegistration;
