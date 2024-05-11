import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { RxDividerVertical } from 'react-icons/rx';

const PrescriptionDisplayCard = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState('');
  const email = Cookies.get('email');
  const token = Cookies.get('userToken') || null;
  const nav = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/pres/getPrescription/${email}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get(`http://localhost:5000/pres/getDocPrescription/${email}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [email, token]);

  useEffect(() => {
    if (token) {
      setSearchData(
        data.filter(
          (temp) =>
            temp.doctorName.toLowerCase().includes(search.toLowerCase()) ||
            temp.doctorEmail.includes(search.toLowerCase())
        )
      );
    } else {
      setSearchData(
        data.filter(
          (temp) =>
            temp.name.toLowerCase().includes(search.toLowerCase()) ||
            temp.email.includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  const handleLink = (prescription) => {
    nav('/presDisplay', { state: { prescription } });
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Email/Name"
        className="w-[40%] mt-10 ml-[30%] px-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-md text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
      />
      {search.length > 0
        ? searchData.map((temp, index) => (
            <div className="w-92 b m-2 relative left-40 ml-40 top-5">
              <div
                key={index}
                className="flex flex-col w-2/3 rounded-lg bg-white shadow-md m-2  hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => handleLink(temp)}
              >
                <div className="flex flex-col w-full p-4  rounded-lg bg-white border-l-emerald-800 border-s-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {token ? temp.doctorName : temp.name}
                    </h2>
                    <h2 className="text-gray-600">
                      {token ? temp.doctorEmail : temp.email}
                    </h2>
                  </div>
                  <div className="text-right">
                    <h3 className="text-gray-700">{temp.dnt.date}</h3>
                    <h3 className="text-gray-700">{temp.dnt.time}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))
        : data.map((temp, index) => (
            <div className=" w-92 b m-2 relative left-40 ml-40 top-5 ">
              <div
                key={index}
                className=" flex flex-col w-2/3 rounded-lg bg-white shadow-md m-2  hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => handleLink(temp)}
              >
                <div class="flex flex-col w-full rounded-lg bg-white border-l-emerald-800 border-s-4 ">
                  <div class="px-4 py-4 flex items-center justify-between">
                    <div class="flex flex-col">
                      <h2 class="text-xl font-bold text-[#1e4070] mb-2">
                        {token ? temp.doctorName : temp.name}
                      </h2>
                      <h2 class="text-gray-600 text-base">
                        {token ? temp.doctorEmail : temp.email}
                      </h2>
                    </div>
                    <div class="text-right">
                      <h3 class="text-gray-700 mb-0.5">{temp.dnt.date}</h3>
                      <h3 class="text-gray-700">{temp.dnt.time}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PrescriptionDisplayCard;
