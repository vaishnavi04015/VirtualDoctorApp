import axios from "axios";
import { useState, useEffect } from "react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";

const DoctorAppointment = () => {
    let [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState("");

    const getData = () => {
        axios.get("http://localhost:5000/docDetails")
            .then((res) => setData(res.data))
            .catch((e) => console.log(e))
    }
    useEffect(() => { getData() }, [])

    useEffect(() => {
        setSearchData(data.filter((temp) => temp.name.toLowerCase().includes(search.toLowerCase()) || temp.expertise.includes(search.toLowerCase()) || temp.experience == search));
    }, [search])

    return (
        <div className="flex flex-col items-center">
            <input
                type='text'
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-[40%] mt-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="grid grid-cols-3 gap-6 mt-4">
                {
                    search.length > 0
                        ? searchData.map((temp, index) => {
                            if (temp.verified == true) {
                                return (
                                    <DoctorAppointmentCard key={index} name={temp.name} expertise={temp.expertise} experience={temp.experience} email={temp.email} phone={temp.phone} photo={temp.photo} />
                                )
                            }
                        })
                        : data ? data.map((temp, index) => {
                            if (temp.verified == true) {
                                return (
                                    <DoctorAppointmentCard key={index} name={temp.name} expertise={temp.expertise} experience={temp.experience} email={temp.email} phone={temp.phone} photo={temp.photo} />
                                )
                            }
                        }) : <p className="text-center text-gray-500 mt-[15%] text-2xl">data is loading</p>
                }
            </div>
        </div>
    )
}
export default DoctorAppointment;
