import { useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react';
  import Filter from "../User/Filter";

const DoctorHistory=()=>
{

    let[data,setData] = useState([]);
    let email = Cookies.get('email');
    let[bookings,setBookings] = useState([]);

    const filterBookings = (s) => {
         if(s==="None")
         {
            setBookings(data);
         }
         else
         {
            setBookings(data.filter((temp) => temp.sta === s));
         }
      };
      
    const getData=()=>
    {
        axios.get(`http://localhost:5000/Booking/getDoctorBooking/${email}`)
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
            return year < currentYear ||
                (year === currentYear && month < currentMonth) ||
                (year === currentYear && month === currentMonth && day <= currentDate);
        });
          const sortedDateTime = filteredData.filter((temp) => {          
            if (temp.dnt.date === today.toLocaleDateString("en-GB")) {
              const currentTime = new Date();
              const currentHours = currentTime.getHours();
              const currentMinutes = currentTime.getMinutes();
              const currentTotalMinutes = currentHours * 60 + currentMinutes;
                const [hours, minutes]= temp.dnt.time.split(':');
                const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
                if(totalMinutes<=currentTotalMinutes)
                  return temp;
         } else {
             return temp;
          }
          });
          for (const item of sortedDateTime)
          {
            try
            {
               axios.patch("http://localhost:5000/Booking/updateBooking",{_id:item._id})
               .then((res)=>{
                console.log(res);
               })
               .catch((e)=>console.log(e))
            }
            catch(e)
            {
                console.log(e);
            }
          }
          setData(sortedDateTime);
          setBookings(sortedDateTime);
      })
        .catch((e)=>console.log(e))
    }

    useEffect(()=>{getData();getData()},[])


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
              <Th>Status<Filter filterBookings={filterBookings}/></Th>
              <Th>Comments</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {
                bookings.map((temp)=>{
                    {
                      return <Tr>
                        <Td>{temp.docName}</Td>
                        <Td>{temp.expertise}</Td>
                        <Td>{temp.dnt.date}</Td>
                        <Td>{temp.dnt.time}</Td>
                        <Td>{temp.sta}</Td>
                        <Td>{temp.reason}</Td>
                     </Tr>
                    }
                })
            }
          </Tbody>
        </Table>
      </TableContainer>
         :
         <p className="text-center text-gray-500 mt-[15%] text-2xl">No History to display</p>
    }
    
    
    </>)
}

export default DoctorHistory;