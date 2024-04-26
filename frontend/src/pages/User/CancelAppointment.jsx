import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,Input
  } from '@chakra-ui/react'

  import { useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'

const CancelAppointment=(props)=>
{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef();
    let [reason,setReason] = useState("");
    
    return(<>
    <Button colorScheme='red' onClick={onOpen}>
        Cancel Booking
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             Cancel Booking
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input placeholder="Reason for cancelling" 
              onChange={(e) => {
                setReason(e.target.value);
              }}
              borderColor={props.isReasonInvalid ? 'red' : 'gray.300'}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>props.onHandleProceed(reason,props.date,props.time,props.doctorEmail)} ml={3}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>)
}

export default CancelAppointment;