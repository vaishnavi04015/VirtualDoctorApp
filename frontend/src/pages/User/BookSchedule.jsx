import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

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
                const filteredData = sortedData.filter((temp) => temp.dnt.date >= today);
                setData(filteredData);
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
        } else {
            alert("Select your booking")
        }
    }

    const handleBooking = (index, date, time) => {
        setColor((temp) => temp === index ? null : index);
        setDate(date);
        setTime(time);
        console.log(date);
        console.log(time);
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            {data && data.length > 0 ? data.map((temp, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                    <p className="font-semibold mb-2">{temp.dnt.date}</p>
                    <div className="flex flex-wrap">
                        {temp.dnt.time.map((time, timeIndex) => {
                            const index = dayIndex.toString() + timeIndex.toString();
                            return (
                                <button
                                    key={index}
                                    disabled={time.booked}
                                    className={`m-3 px-4 py-2 rounded ${!time.booked ? (color === index ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600") : "bg-gray-300 cursor-not-allowed"}`}
                                    onClick={() => handleBooking(index, temp.dnt.date, time.t)}
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
