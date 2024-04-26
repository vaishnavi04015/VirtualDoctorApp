import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import  "../../App.css";
import { Link } from 'react-router-dom';

const DoctorBookingsMenu=()=>
{


    return(<>
    
    <Menu isLazy className="DoctorMenuItem">
  <MenuButton >Appointments</MenuButton>
  <MenuList className="DoctorMenuItem">
    {/* MenuItems are not rendered unless Menu is open */}
   <Link to="/doctorBookings"><MenuItem className="DoctorMenuItem">My Appointments</MenuItem></Link> 
   <Link to="/doctorHistory"><MenuItem>History</MenuItem></Link> 
  </MenuList>
</Menu>
    
    </>)
}

export default DoctorBookingsMenu;