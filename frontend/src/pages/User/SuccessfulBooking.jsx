import  "../../App.css";
import { MdVerified } from "react-icons/md";
import { Button} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const SuccessfulBooking = () => {
  return (
    <div className="booking-success-container">
      <div className="success-icon">
        {/* <img src="https://www.kindpng.com/picc/m/23-230429_transparent-success-png-success-png-icon-png-download.png" height={250} width={250}/> */}
        <MdVerified size={200}/>
      </div>
      <h1 className="text-2xl font-bold mt-5">Your Appointment Booked Successfully!</h1>
      <p className="text-xl text-gray-500  m-5">You can see your appointment under MyBookings section</p>
      <Link to="/myBookings"><Button colorScheme='blue' className="mt-7">View Your Booking</Button></Link>
    </div>
  );
};

export default SuccessfulBooking;