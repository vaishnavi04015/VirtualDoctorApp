import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addDays, isWeekend} from "date-fns";

const DoctorSchedule=()=>
{
    const [selectedDate,setSelectedDate] = useState(null);

    const handleDateChange=(date)=>{
        setSelectedDate(date);
    }

    const isWeekendDay = (date) =>{
        return isWeekend(date);
    }

    const filterWeekends = (date) =>{
        return !isWeekendDay(date);
    }

    const minDate = new Date();
    const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);

    return(<div>
        <Datepicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy; hh:mm aa"
            minDate={minDate}
            maxDate={maxDate}
            filterDate={filterWeekends}
            showTimeSelect
            timeIntervals={60}
            timeFormat="hh:mm aa"
            className="border-2 ml-48"
        />
    </div>)
}
export default DoctorSchedule;