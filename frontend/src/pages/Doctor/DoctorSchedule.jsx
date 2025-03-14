import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import schedule from '../../assets/schedule.png';

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
    timeFormat: 'HH:mm',
    timeCaption: 'Time',
    classNameName: 'border-2 m-3 p-2 rounded',
  };

  const submit = () => {
    if (selectedDate !== null && selectedTimes.length > 0) {
      let name = Cookies.get('name');
      let email = Cookies.get('email');
      const formattedTimes = selectedTimes.map((time) => ({
        t: format(time, 'HH:mm'),
        booked: false,
      }));
      const formattedDate = selectedDate.toLocaleDateString('en-GB');
      axios
        .post('https://virtualdoctorapp-backend.onrender.com/createSchedule', {
          name,
          email,
          date: formattedDate,
          time: formattedTimes,
        })
        .then((res) => {
          // alert(res.data);
          // console.log(res);
          toast.success(res.data, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        })
        .catch((e) => console.log(e));
      setSelectedDate(null);
      setSelectedTimes([]);
    } else {
      // alert("please select a date and time slots");
      toast.warn('please select a date and time slots', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className=" w-full flex justify-center bg-slate-100 h-[91vh] mx-auto px-4 ">
      <div className='w-[50%] '>
        <img src={schedule} alt="img" className='h-[87vh] mt-[2vh]'/>
      </div>
      <div className="flex flex-col space-y-20 bg-white rounded-lg shadow-md h-[87vh] mt-[2vh] w-[50%] p-8">
        <h2 className="text-start text-gray-800 font-semibold text-xl">
          Select the slots as per availibility :{' '}
        </h2>
        <div className="flex flex-wrap justify-evenly items-center">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-bold">Date:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={minDate}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
            />
          </div>
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-bold">Time:</h3>
            <DatePicker
              selected={null}
              onChange={handleTimeChange}
              {...timePickerProps}
              excludeTimes={selectedTimes}
              shouldCloseOnSelect={false}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-4 h-[43vh]">
          <h2 className="text-lg font-bold">Selected Time Slots:</h2>
          <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-[46vh] place-content-start">
            {selectedTimes.map((time, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 bg-gray-100 rounded-md shadow-sm h-14"
              >
                <span className="text-gray-700">{format(time, 'HH:mm')}</span>
                <button
                  onClick={() => handleRemoveTime(index)}
                  className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={submit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorSchedule;
