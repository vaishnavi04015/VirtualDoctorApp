import { Card, CardBody, CardFooter, Stack, Heading, Image, Text, Button } from '@chakra-ui/react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const DoctorRequestCard = () => {
    let [data, setData] = useState([]);
    let nav = useNavigate();

    const getData = () => {
        axios.get("http://localhost:5000/docDetails")
            .then((res) => {
                let data = res.data;
                let filterData = data.filter((temp) => temp.verified == false);
                setData(filterData);
            })
            .catch((e) => console.log(e));
    };

    const sendData = (details) => {
        nav("/docdetails", { state: { details } });
    };

    useEffect(() => { getData(); }, []);

    return (
        <div className="flex flex-wrap justify-center items-center mt-8 mb-8">
            {
              data.length > 0
              ?
                data.map((temp) => {
                    return (
                      <Card
                        key={temp.id}
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        className='w-[40%] m-4 h-60'
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
                                {temp.expertise}
                                <br />
                                {temp.experience} years of experience.
                              </Text>
                            </CardBody>
                            <CardFooter>
                              <Button variant='solid' colorScheme='blue' onClick={() => sendData(temp)}>
                                View
                              </Button>
                            </CardFooter>
                        </Stack>
                      </Card>
                    )
                })
              :
                <p className="text-center text-gray-500 mt-[15%] text-2xl">No Pending Requests</p>
            }
        </div>
    );
};

export default DoctorRequestCard;
