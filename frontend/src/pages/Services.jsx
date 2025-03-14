import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, CardBody, CardFooter, Stack, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaStar , FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar} from "react-icons/ai"

const Services = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();

  const getData = () => {
    axios.get("https://virtualdoctorapp-backend.onrender.com/docDetails")
      .then((res) => {
        let data = res.data;
        let filteredData = data.filter((temp) => temp.verified === true);
        setData(filteredData);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    setSearchData(data.filter((temp)=>temp.name.toLowerCase().includes(search.toLowerCase()) || temp.expertise.toLowerCase().includes(search.toLowerCase()) || temp.experience>=search ));
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
      <div className="flex justify-center mt-10">
        <input
          type='text'
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[40%] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      {
        search ? (
          <div className="container mx-auto grid grid-cols-2 gap-x-4 justify-evenly">
            { 
              searchData.map((temp, index) => (
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    key={index}
                    className="w-[full] m-8"
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
            }
          </div>
        ) : (
          data ? (
            <div className="container mx-auto grid grid-cols-2 gap-x-4 justify-evenly">
              {
                data.map((temp, index) => (
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    key={index}
                    className="w-[full] m-8"
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
              }
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-[15%] text-2xl">{loading ? "Data is loading..." : "No data found."}</p>
          ) 
        )
      }
    </div>
  );
};

export default Services;
