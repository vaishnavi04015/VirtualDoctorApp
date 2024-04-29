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
  import Filter from "./Filter";
import FeedBackModal from "./FeedBackModal";

const HistoryPage=()=>
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
        axios.get(`http://localhost:5000/Booking/getBooking/${email}`)
        .then((res) => {
          const sortedData = res.data.sort((a, b) => {
              const dateA = a.dnt.date.split('/').reverse().join('/');
              const dateB = b.dnt.date.split('/').reverse().join('/');
              return dateB.localeCompare(dateA);
          });
          const today = new Date().toLocaleDateString("en-GB");
          const filteredData = sortedData.filter((temp) => temp.dnt.date <= today);
          const sortedDateTime = filteredData.filter((temp) => {          
            if (temp.dnt.date === today) {
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
                    if(temp.sta==="Completed")
                    {
                      return <Tr>
                        <Td>{temp.docName}</Td>
                        <Td>{temp.expertise}</Td>
                        <Td>{temp.dnt.date}</Td>
                        <Td>{temp.dnt.time}</Td>
                        <Td>{temp.sta}</Td>
                        <Td>{temp.reason}</Td>
                        <Td><FeedBackModal/></Td>
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

export default HistoryPage;