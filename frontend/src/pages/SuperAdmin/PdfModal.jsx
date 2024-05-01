import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button
  } from '@chakra-ui/react';
  import { pdfjs } from 'react-pdf';
  import { useDisclosure } from '@chakra-ui/react';
  import { useState } from 'react';
   import PdfComp from './PdfComp';
   import "../../App.css"

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
           'pdfjs-dist/build/pdf.worker.min.js',
         import.meta.url,
      ).toString();

   function PdfModal(props) {

    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
  
    return (
      <>
        <Button
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}
        >
            {props.name}
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose} className=" w-[90%]">
          {overlay}
          <ModalContent className='pdf-modal'>
            <ModalCloseButton />
            <ModalBody>
                 <PdfComp fileName={props.fileName}/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default PdfModal;