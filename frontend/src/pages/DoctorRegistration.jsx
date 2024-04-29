import React, { useState } from 'react';
import axios from 'axios';

const DoctorRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [mssg, setMssg] = useState('');
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
      setMssg('');
    }
  };

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
        await axios
          .post('http://localhost:5000/docSubmit', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => alert(res.data))
          .catch((e) => console.log(e));
      } else {
        alert("Password doesn't match!!!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="text-center font-bold text-4xl mb-6">
        Doctor Registration
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-center bg-white rounded-lg shadow-lg w-full m-4"
      >
        <div className="w-1/3 md:w-1/4 p-4 bg-white rounded-lg shadow-lg ">
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Name:
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Name"
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Email"
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Phone:
          </label>
          <input
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Phone"
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Password"
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Confirm Password:
          </label>
          <input
            type="password"
            onChange={(e) => setCpassword(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Confirm Password"
            required
            onKeyUp={pssd}
          />
          <p className="text-red-600">{mssg}</p>
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Expertise:
          </label>
          <input
            type="text"
            onChange={(e) => setExpertise(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Expertise"
            required
          />
        </div>
        <div className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-lg ">
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Experience:
          </label>
          <input
            type="number"
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Experience"
            required
          />
          <label className="block mb-2 text-sm font-bold text-gray-500 ">
            Address:
          </label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-500  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Address"
            required
          />

          {/*  ---- New checkBox  Start ---- */}

          <h3 className="mb-2 mt-2 font-semibold text-gray-900 ">Gender :</h3>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 ">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="horizontal-gender-license"
                  type="radio"
                  value=""
                  name="gender"
                  onChange={() => setGender('Male')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="horizontal-gender-license"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male{' '}
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  type="radio"
                  name="gender"
                  onChange={() => setGender('Female')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="horizontal-gender-id"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  type="radio"
                  name="gender"
                  onChange={() => setGender('Others')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="horizontal-gender-military"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Other
                </label>
              </div>
            </li>
          </ul>

          {/* ---- New Checkbox End * ----/}


          {/* ----  Old Gender Radio Btn Start ---- */}
          {/* <div className="flex">
            <label className="relative flex items-center p-0 rounded-full cursor-pointer">
              Gender:
            </label>
            <input
              type="radio"
              name="gender"
              onChange={() => setGender("Male")}
            />
            <label className="mr-4">Male</label>
            <input
              type="radio"
              name="gender"
              onChange={() => setGender("Female")}
            />
            <label className="mr-4">Female</label>
            <input
              type="radio"
              name="gender"
              onChange={() => setGender("Others")}
              checked
            />
            <label>Other</label>
          </div> */}

          {/* ---- Old Gender Radio Btn END ---- */}

          <p className="mt-4">Photo Upload:</p>
          <input
            className="block w-full text-sm text-gray-500
          file:me-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700
          file:disabled:opacity-50 file:disabled:pointer-events-none
          dark:text-neutral-500
          dark:file:bg-blue-500
          dark:hover:file:bg-blue-400"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            name="photo"
            required
          />
          <p className="mt-4">License Upload:</p>
          <input
            className="block w-full text-sm text-gray-500
          file:me-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700
          file:disabled:opacity-50 file:disabled:pointer-events-none
          dark:text-neutral-500
          dark:file:bg-blue-500
          dark:hover:file:bg-blue-400"
            type="file"
            accept=".pdf"
            onChange={handleLicenseChange}
            name="license"
            required
          />
          <p className="mt-4">Degree Upload:</p>
          <input
            className="block w-full text-sm text-gray-500
          file:me-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700
          file:disabled:opacity-50 file:disabled:pointer-events-none
          dark:text-neutral-500
          dark:file:bg-blue-500
          dark:hover:file:bg-blue-400"
            type="file"
            accept=".pdf"
            onChange={handleDegreeChange}
            name="degree"
            required
          />
        </div>
        <div className="w-full text-center mt-4">
          <button
            type="submit"
            className="bg-gray-700 text-white font-bold py-2 px-4 w-1/2 rounded hover:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default DoctorRegistration;
