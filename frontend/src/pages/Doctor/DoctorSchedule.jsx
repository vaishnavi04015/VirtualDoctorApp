import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isWeekend } from "date-fns";
import axios from "axios"
import Cookies from 'js-cookie';

const DoctorSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTimes([...selectedTimes,time]);
    };

    const handleRemoveTime = (index) => {
        const updatedTimes = [...selectedTimes];
        updatedTimes.splice(index, 1);
        setSelectedTimes(updatedTimes);
    };

    // const isWeekendDay = (date) => {
    //     return isWeekend(date);
    // };

    // const filterWeekends = (date) => {
    //     return !isWeekendDay(date);
    // };

    const minDate = new Date();
    const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);

    const timePickerProps = {
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 60,
        timeFormat: "hh:mm aa",
        timeCaption: "Time",
        className: "border-2 m-10"
    };

    const submit=()=>{
        let name=Cookies.get('name')
        let email=Cookies.get('email')
        const formattedTimes = selectedTimes.map((time) => ({
            t: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            booked: false,
        }));
        const formattedDate = selectedDate.toLocaleDateString("en-GB");
        console.log(formattedDate)
        axios.post("http://localhost:5000/createSchedule",{name,email,date:formattedDate,time:formattedTimes})
        .then((res)=>{
            alert(res.data)
            console.log(res)
        })
        .catch((e)=>console.log(e))
        setSelectedDate(null);
        setSelectedTimes([]);
    }

    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={minDate}
                maxDate={maxDate}
                // filterDate={filterWeekends}
                className="border-2 m-10"
            />
            <DatePicker
                selected={null}
                onChange={handleTimeChange}
                {...timePickerProps}
                excludeTimes={selectedTimes}
                className="border-2 m-10"
                shouldCloseOnSelect={false}
            />
            <div>
                <h2>Select Time Slots:</h2>
                {selectedTimes.map((time, index) => (
                    <div key={index}>
                        {time.toLocaleTimeString()}
                        <button onClick={() => handleRemoveTime(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={submit}>submit</button>
        </div>
    );
};

export default DoctorSchedule;
