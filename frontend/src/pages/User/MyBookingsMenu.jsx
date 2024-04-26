import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import  "../../App.css";
import { Link } from 'react-router-dom';

const MyBookingsMenu=()=>
{


    return(<>
    <Menu isLazy>
  <MenuButton >Bookings</MenuButton>
  <MenuList>
    {/* MenuItems are not rendered unless Menu is open */}
   <Link to="/myBookings"><MenuItem >My Bookings</MenuItem></Link> 
   <Link to="/history"><MenuItem>History</MenuItem></Link> 
  </MenuList>
</Menu>
    
    </>)
}

export default MyBookingsMenu;