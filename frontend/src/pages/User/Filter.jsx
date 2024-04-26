import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
  } from '@chakra-ui/react'
  import { FaFilter } from "react-icons/fa";
  import  "../../App.css";

const Filter=(props)=>
{
    
   return(<>
    <Menu className="MenuItem">
  <MenuButton as={Button} style={{backgroundColor:"white"}} rightIcon={<FaFilter/>}>
  </MenuButton>
  <MenuList className="MenuItem">
    <MenuItem onClick={()=>props.filterBookings("Completed")} className="MenuItem">Completed</MenuItem>
    <MenuItem onClick={()=>props.filterBookings("Cancelled")} className="MenuItem">Cancelled</MenuItem>
    <MenuItem onClick={()=>props.filterBookings("None")} className="MenuItem">None</MenuItem>
  </MenuList>
</Menu>
    </>)
}

export default Filter;