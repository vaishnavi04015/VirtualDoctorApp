import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";
import Cookies from 'js-cookie';

const DoctorSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTimes([...selectedTimes, time]);
    };

    const handleRemoveTime = (index) => {
        const updatedTimes = [...selectedTimes];
        updatedTimes.splice(index, 1);
        setSelectedTimes(updatedTimes);
    };

    const minDate = new Date();
    // const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);

    const timePickerProps = {
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 60,
        timeFormat: "HH:mm",
        timeCaption: "Time",
        className: "border-2 m-3 p-2 rounded"
    };

    const submit = () => {
        if(selectedDate !== null && selectedTimes.length > 0)
        {
            let name = Cookies.get('name');
            let email = Cookies.get('email');
            const formattedTimes = selectedTimes.map((time) => ({
                t: format(time, 'HH:mm'),
                booked: false,
            }));
            const formattedDate = selectedDate.toLocaleDateString("en-GB");
            axios.post("http://localhost:5000/createSchedule", { name, email, date: formattedDate, time: formattedTimes })
                .then((res) => {
                    alert(res.data);
                    console.log(res);
                })
                .catch((e) => console.log(e));
            setSelectedDate(null);
            setSelectedTimes([]);
        }
        else
        {
            alert("please select a date and time slots");
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-wrap mb-4">
                <div>
                    <h3 className="mb-2">Date:</h3>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={minDate}
                        // maxDate={maxDate}
                        className="border-2 m-3 p-2 rounded"
                    />
                </div>
                <div>
                    <h3 className="mb-2">Time:</h3>
                    <DatePicker
                        selected={null}
                        onChange={handleTimeChange}
                        {...timePickerProps}
                        excludeTimes={selectedTimes}
                        shouldCloseOnSelect={false}
                    />
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold">Select Time Slots:</h2>
                <div>
                    {selectedTimes.map((time, index) => (
                        <div key={index} className="items-center m-2">
                            <span>{format(time, 'HH:mm')}</span>
                            <button onClick={() => handleRemoveTime(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 ml-6 rounded">Remove</button>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={submit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
    );
};

export default DoctorSchedule;
