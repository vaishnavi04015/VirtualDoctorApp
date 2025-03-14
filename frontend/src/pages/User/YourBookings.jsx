import { useEffect, useState, useCallback } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react'
import CancelAppointment from "./CancelAppointment";
import { Button} from '@chakra-ui/react'


const YourBookings=()=>
{

    let[data,setData] = useState([]);
    let email = Cookies.get('email');
    let name = Cookies.get('name');
    const nav = useNavigate();
    const [isReasonInvalid, setIsReasonInvalid] = useState(false);
    const {onClose } = useDisclosure()

    const onHandleProceed=(reason,date,time,doctorEmail)=>
    {
         if(reason!=="")
         {
             axios.patch("https://virtualdoctorapp-backend.onrender.com/Booking/cancelBooking",{reason,date,time,doctorEmail,email})
             .then((res)=>console.log(res.data))
             .catch((e)=>console.log(e))
             onClose();
         }
         else
         {
            setIsReasonInvalid(true)
         }
    }

   
    const getData=()=>
    {
        axios.get(`https://virtualdoctorapp-backend.onrender.com/Booking/getBooking/${email}`)
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
              const currentTotalMinutes = currentHours * 60 + currentMinutes;
                const [hours, minutes]= temp.dnt.time.split(':');
                const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
                if(totalMinutes>currentTotalMinutes)
                  return temp;
         } else {
             return temp;
          }
          });
          setData(sortedDateTime);
      })
        .catch((e)=>console.log(e))
    }

    const connect=useCallback((id)=>{
        nav(`/userRoom/${id}`,{state:{name}})
    },[nav])

    useEffect(()=>{getData()},[data])

    return(<>
    
    {
        data && data.length>0?
        <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Doctor Name</Th>
              <Th>Expertise</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Status</Th>
              <Th>Comments</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {
                data.map((temp)=>{
                    if(temp.sta==="Upcomming")
                    {
                      return <Tr>
                        <Td>{temp.docName}</Td>
                        <Td>{temp.expertise}</Td>
                        <Td>{temp.dnt.date}</Td>
                        <Td>{temp.dnt.time}</Td>
                        <Td>{temp.sta}</Td>
                        <Td>{temp.reason}</Td>
                        <Td><button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 m-3" onClick={()=>{connect(temp.meetingId)}}>connect</button></Td>
                        <Td><CancelAppointment onHandleProceed={onHandleProceed} isReasonInvalid={isReasonInvalid} date={temp.dnt.date} time={temp.dnt.time} doctorEmail={temp.doctorEmail}/></Td>
                     </Tr>
                    }
                    else
                    {
                      return <Tr>
                        <Td>{temp.docName}</Td>
                        <Td>{temp.expertise}</Td>
                        <Td>{temp.dnt.date}</Td>
                        <Td>{temp.dnt.time}</Td>
                        <Td>{temp.sta}</Td>
                        <Td>{temp.reason}</Td>
                        <Td></Td>
                        <Td></Td>
                     </Tr>
                    }
                })
            }
          </Tbody>
        </Table>
      </TableContainer>
         :
         <p className="text-center text-gray-500 mt-[15%] text-2xl">No Bookings to show</p>
    }
     
    </>)
}

export default YourBookings;