import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const DoctorAppointmentCard=(props)=>{
    let nav = useNavigate();

    const BookAppointment = ()=>{
        nav("/bookAppoitment",{state:{email:props.email,docName:props.name,expertise:props.expertise}})
    }
    return(<div>
        <Card maxW='sm' className="m-8">
            <CardBody>
                <Image
                src={`./public/Doctordetails/${props.photo}`}
                alt={props.name}
                borderRadius='lg'
                className="h-72 w-full"
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md' className='text-center'>{props.name}</Heading>
                <Text>
                    Expertise: {props.expertise} <br/>
                    experience: {props.experience} <br/>
                    email: {props.email} <br/>
                    contact: {props.phone} <br/>
                </Text>
                </Stack>
            </CardBody>
            
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue' onClick={BookAppointment}>
                    Book Appointment
                </Button>
                </ButtonGroup>
            </CardFooter>
            <Divider />
            </Card>
    </div>)
}
export default DoctorAppointmentCard