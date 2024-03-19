import { Card,CardBody, CardFooter, Stack, Heading, Image, Text, Button } from '@chakra-ui/react'
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const DoctorRequestCard=()=>
{

    let [data,setData] = useState([]);
    let nav = useNavigate();

    const getData=()=>
    {
        axios.get("http://localhost:5000/docDetails")
        .then((res)=>setData(res.data))
        .catch((e)=>console.log(e))
    }

    const sendData=(details)=>
    {
        nav("/docdetails",{state:{details}})
    }

    useEffect(()=>{getData()},[])

    return (<>
   
    {
        data?data.map((temp)=>{if(temp.verified==false){
            return (<Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
             variant='outline'
             className='w-[40%]'
           >
          <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={`./public/Doctordetails/${temp.photo}`}
          alt='Caffe Latte'
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>{temp.name}</Heading>
      
            <Text py='2'>
              {temp. expertise}
              <br/>
              {temp.experience} years of experience.
            </Text>
          </CardBody>
      
          <CardFooter>
            <Button variant='solid' colorScheme='blue' onClick={()=>sendData(temp)}>
              View
            </Button>
          </CardFooter>
        </Stack>
      </Card>
        )}}) : <p>Data is loading</p>
    }
    
    </>)
}

export default DoctorRequestCard;