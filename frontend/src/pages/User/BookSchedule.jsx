import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

const BookSchedule = () => {
    let k = useLocation();
    let { email,docName,expertise } = k.state;
    const UserEmail = Cookies.get('email');
    const name = Cookies.get('name');
    let [data, setData] = useState([]);
    let [color, setColor] = useState();
    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    const nav= useNavigate();

    const getData = () => {
        if (email != null) {
            axios.get(`http://localhost:5000/getSchedule/${email}`)
                .then((res) => {
                    const sortedData = res.data.sort((a, b) => {
                        // Extract date parts
                        const [dayA, monthA, yearA] = a.dnt.date.split('/').map(Number);
                        const [dayB, monthB, yearB] = b.dnt.date.split('/').map(Number);
                        // Compare by year
                        if (yearA !== yearB) {
                            return yearA - yearB;
                        }
                        // Compare by month
                        if (monthA !== monthB) {
                            return monthA - monthB;
                        }
                        // Compare by day
                        return dayA - dayB;
                    });
    
                    const today = new Date();
                    const currentYear = today.getFullYear();
                    const currentMonth = today.getMonth() + 1; // January is 0, so add 1
                    const currentDate = today.getDate();
    
                    const filteredData = sortedData.filter((temp) => {
                        // Extract date parts
                        const [day, month, year] = temp.dnt.date.split('/').map(Number);
                        // Compare by year, month, and date
                        return year > currentYear ||
                            (year === currentYear && month > currentMonth) ||
                            (year === currentYear && month >= currentMonth && day >= currentDate);
                    });

                    const sortedDateTime = filteredData.filter((temp) => {          // filter from current time of today
                             if (temp.dnt.date === today.toLocaleDateString("en-GB")) {
                                 const currentTime = new Date();
                                 const currentHours = currentTime.getHours();
                                 const currentMinutes = currentTime.getMinutes();
                                 const currentTotalMinutes = currentHours * 60 + currentMinutes
                                 temp.dnt.time = temp.dnt.time.filter((time) => {
                                     const [hours, minutes] = time.t.split(':').map(Number);
                                     const totalMinutes = hours * 60 + minutes;
                                     return totalMinutes >= currentTotalMinutes;
                                 })
                                 return temp;
                             } else {
                                 return temp;
                             }
                         });
    
                    setData(sortedDateTime);
                })
                .catch((e) => console.log(e));
        }
    }
    

    
    const userBooking = () => {
        if (date !== "" && time !== "") {
            let uid= uuidv4();
            axios.post(`http://localhost:5000/Booking/addBooking`, { name, email: UserEmail, doctorEmail: email, date, time,meetingId:uid,docName,expertise,sta:"Upcomming",reason:"N/A" })
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
                nav("/bookingDone");
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
