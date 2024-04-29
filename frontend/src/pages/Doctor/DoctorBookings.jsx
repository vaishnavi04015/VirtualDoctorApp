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
import DoctorAppointmentCancel from "./DoctorAppointmentCancel";

const DoctorBooking=()=>
{

    let[data,setData] = useState([]);
    let doctoremail = Cookies.get('email');
    let name = Cookies.get('name');
    const [isReasonInvalid, setIsReasonInvalid] = useState(false);
    const nav = useNavigate();
    const {onClose } = useDisclosure()

    const onHandleProceed=(reason,date,time,email)=>
    {
         if(reason!=="")
         {
             axios.patch("http://localhost:5000/Booking/cancelBooking",{reason,date,time,doctorEmail:doctoremail,email})
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
        axios.get(`http://localhost:5000/Booking/getDoctorBooking/${doctoremail}`)
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
              <Th>Patient Name</Th>
              <Th>Email</Th>
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
                        <Td>{temp.name}</Td>
                        <Td>{temp.email}</Td>
                        <Td>{temp.dnt.date}</Td>
                        <Td>{temp.dnt.time}</Td>
                        <Td>{temp.sta}</Td>
                        <Td>{temp.reason}</Td>
                        <Td><button style={{backgroundColor:"bisque"}} onClick={()=>{connect(temp.meetingId)}}>Connect</button></Td>
                        <Td><DoctorAppointmentCancel onHandleProceed={onHandleProceed} isReasonInvalid={isReasonInvalid} date={temp.dnt.date} time={temp.dnt.time} email={temp.email}/></Td>
                     </Tr>
                    }
                    else
                    {
                      return <Tr>
                        <Td>{temp.name}</Td>
                        <Td>{temp.email}</Td>
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

export default DoctorBooking;