import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaStar , FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar} from "react-icons/ai"

const Services = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");


  const nav = useNavigate();

  const getData = () => {
    axios.get("http://localhost:5000/docDetails")
      .then((res) => {
        let data = res.data;
        let filteredData = data.filter((temp) => temp.verified === true);
        setData(filteredData);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    setSearchData(data.filter((temp)=>temp.name.toLowerCase().includes(search.toLowerCase()) || temp.expertise.includes(search.toLowerCase()) || temp.experience==search ));
  },[search])

  const handleLink = (email) => {
    nav("/reviewDisplay", { state: { reviewEmail: email } });
  };

  const getOverallRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    return parseFloat(averageRating.toFixed(1));
  };

  return (
    <div>
      <input
      type='text'
      onChange={(e)=>setSearch(e.target.value)}
      placeholder="Search..."
      className="w-[40%] mt-10 ml-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {
        searchData.length>0
        ?
        ( 
          searchData.map((temp, index) => (
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              key={index}
              className="w-[45%] m-8"
              onClick={() => handleLink(temp.email)}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={`./public/Doctordetails/${temp.photo}`}
                alt={temp.name}
              />

              <Stack>
                <CardBody>
                  <Heading className="text-2xl">{temp.name}</Heading>

                  <Text py='2' className="text-xl">
                    Expertise: {temp.expertise}
                  </Text>
                  <Text py='2' className="text-xl">
                    Experience: {temp.experience}
                  </Text>
                </CardBody>

                <CardFooter>
                  <Stack direction="row" align="center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {
                          getOverallRating(temp.reviews) >= index + 1 ? <FaStar size={20} /> : getOverallRating(temp.reviews) > index + 0.5 ? <FaStarHalfAlt size={20} /> : <AiOutlineStar size={20} />
                        }
                      </span>
                    ))}
                    <span>({getOverallRating(temp.reviews)})</span>
                    <Text ml="2">{temp.reviews.length} reviews</Text>
                  </Stack>
                </CardFooter>
              </Stack>
            </Card>
          ))
        )
        :
        data 
        ?
        (
          data.map((temp, index) => (
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              key={index}
              className="w-[45%] m-8"
              onClick={() => handleLink(temp.email)}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={`./public/Doctordetails/${temp.photo}`}
                alt={temp.name}
              />
  
              <Stack>
                <CardBody>
                  <Heading className="text-2xl">{temp.name}</Heading>
  
                  <Text py='2' className="text-xl">
                    Expertise: {temp.expertise}
                  </Text>
                  <Text py='2' className="text-xl">
                    Experience: {temp.experience}
                  </Text>
                </CardBody>
  
                <CardFooter>
                  <Stack direction="row" align="center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {
                          getOverallRating(temp.reviews) >= index + 1 ? <FaStar size={20} /> : getOverallRating(temp.reviews) > index + 0.5 ? <FaStarHalfAlt size={20} /> : <AiOutlineStar size={20} />
                        }
                      </span>
                    ))}
                    <span>({getOverallRating(temp.reviews)})</span>
                    <Text ml="2">{temp.reviews.length} reviews</Text>
                  </Stack>
                </CardFooter>
              </Stack>
            </Card>
          ))
        )
        :
        (
          <p className="text-center text-gray-500 mt-[15%] text-2xl">Data is loading</p>
        ) 
      }
    </div>
  );
};

export default Services;
