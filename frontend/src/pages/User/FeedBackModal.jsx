import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from '@chakra-ui/react';
import FeedBackForm from './FeedBackForm';
import "./FeedBackModal.css";
import "../../App.css"

const FeedBackModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        onClick={() => {
          onOpen();
        }}
      >
        FeedBack
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent className='feedback-modal-content'>
          <ModalHeader>FeedBack Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text><FeedBackForm/></Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FeedBackModal;
