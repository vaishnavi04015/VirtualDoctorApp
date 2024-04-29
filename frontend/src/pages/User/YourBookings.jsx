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
             axios.patch("http://localhost:5000/Booking/cancelBooking",{reason,date,time,doctorEmail,email})
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
        axios.get(`http://localhost:5000/Booking/getBooking/${email}`)
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
                        <Td><button style={{backgroundColor:"bisque"}} onClick={()=>{connect(temp.meetingId)}}>Connect</button></Td>
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