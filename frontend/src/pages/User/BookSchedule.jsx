import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { format } from "date-fns";

const BookSchedule = () => {
    let k = useLocation();
    let { email } = k.state;
    const UserEmail = Cookies.get('email');
    const name = Cookies.get('name');
    let [data, setData] = useState([]);
    let [color, setColor] = useState();
    let [date, setDate] = useState("");
    let [time, setTime] = useState("");

    const getData = () => {
        axios.get(`http://localhost:5000/getSchedule/${email}`)
            .then((res) => {
                const sortedData = res.data.sort((a, b) => {
                    const dateA = a.dnt.date.split('/').reverse().join('/');
                    const dateB = b.dnt.date.split('/').reverse().join('/');
                    return dateA.localeCompare(dateB);
                });
                const today = new Date().toLocaleDateString("en-GB");
                const filteredData = sortedData.filter((temp) => temp.dnt.date >= today);  // filter from current date
                const sortedDateTime = filteredData.filter((temp) => {          // filter from current time of today
                    if (temp.dnt.date === today) {
                        const currentTime = new Date();
                        const currentHours = currentTime.getHours();
                        const currentMinutes = currentTime.getMinutes();
                        const currentTotalMinutes = currentHours * 60 + currentMinutes;
                
                        temp.dnt.time = temp.dnt.time.filter((time) => {
                            const [hours, minutes] = time.t.split(':').map(Number);
                            const totalMinutes = hours * 60 + minutes;
                            return totalMinutes >= currentTotalMinutes;
                        });
                
                        return temp;
                    } else {
                        return temp;
                    }
                });
                
                setData(sortedDateTime);
            })
            .catch((e) => console.log(e));
    }

    const userBooking = () => {
        if (date !== "" && time !== "") {
            axios.post(`http://localhost:5000/Booking/addBooking`, { name, email: UserEmail, doctorEmail: email, date, time })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((e) => console.log(e))

            axios.patch('http://localhost:5000/scheduleStatus', { email, date, time })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((e) => console.log(e))
                alert("booked succefully")
        } else {
            alert("Select your booking")
        }
    }

    const handleBooking = (index, date, time) => {
        setColor((temp) => temp === index ? null : index);
        setDate((temp) => temp === date ? "" : date);
        setTime((temp) => temp === time ? "" : time);
    }
    

    useEffect(() => { getData() }, [])

    return (
        <div className="mt-8 ml-10">
            {data && data.length > 0 ? data.map((data, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                    <p className="font-semibold text-lg mb-2">{data.dnt.date}</p>
                    <div className="flex flex-wrap">
                        {data.dnt.time
                        .sort((a, b) => a.t.localeCompare(b.t))    // sort in acsending order of time slots
                        .map((time, timeIndex) => {
                            const index = dayIndex.toString() + timeIndex.toString();
                            return (
                                <button
                                    key={index}
                                    disabled={time.booked}
                                    className={`m-3 px-4 py-2 rounded ${!time.booked ? (color === index ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600") : "bg-gray-300 cursor-not-allowed"}`}
                                    onClick={() => handleBooking(index, data.dnt.date, time.t)}
                                >
                                    {time.t}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )) : <h1 className="text-xl font-semibold mb-4">No Schedules to book</h1>}

            <button className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700 m-3" onClick={userBooking}>Book Slot</button>
        </div>
    );
}

export default BookSchedule;
