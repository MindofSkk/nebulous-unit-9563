
import React ,{useEffect,useState}from "react"
import {Box, Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

function Edit(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    console.log(props)
    
    const [task, settask] = useState("");
    const [time, setTime] = useState(0);
    const [projectManagement, setProjectManagement] = useState('');
    const [notes, setNotes] = useState('');
  




    useEffect(() => {
        
        fetch(`https://project-backend-production-62d5.up.railway.app/time/${props._id}`)
        .then(res => res.json())
        .then(product => {

            settask(product.task);
            setTime(product.time);
            setProjectManagement(product.projectManagement);
          setNotes(product.notes);
        })          
       
      }, [])

    const submit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/time/${props._id}`, {
            method: 'PUT',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ task, time, projectManagement, notes })
        }).then((res) =>
        {
            console.log(res.data)
        });
    }

    return (
      <>
 <Box style={{ margin: "auto" }}>
      <Button  onClick={onOpen}>Edit</Button>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} w="400px">
            <FormControl h={50} mb="40px">
              <FormLabel>Task/Project</FormLabel>
              <Input
                name="title"
                onChange={(e) => settask(e.target.value)}
                ref={initialRef}
                placeholder="Task"
              />
            </FormControl>

            <FormControl mt={4}>
 
              <Select placeholder="Project Management">
                <option value="option1">Marketing</option>
                <option value="option2">Programming</option>
                <option value="option3">Design</option>
              </Select>
            </FormControl>
            <Flex>
              {" "}
              <FormControl mt={4}>
                {/* <FormLabel></FormLabel> */}
                <Input
                  name="title"
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write Notes"
                />
              </FormControl>
              <FormControl mt={4}>
                {/* <FormLabel>Time</FormLabel> */}
                <Input
                  name="title"
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="00:00"
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={submit}
              mr={3}
              size="sm"
              isAttached
              variant="outline"
 
              color="white"
              
              bg="green"
            >
              Start Timer 
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
      </>
    )
  }

  export default Edit