import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
function Create(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  console.log(props);

  const [task, setTask] = useState();
  const [time, setTime] = useState(0);
  const [projectManagement, setProjectManagement] = useState("");
  const [notes, setNotes] = useState("");

  let today = new Date().toLocaleDateString();

  console.log(today);

  const [date, setDate] = useState(today);
  const [day, setDay] = useState("Monday");

  console.log(time);

  useEffect(() => {}, []);

  const handleSubmit = () => {
    let payload = {
      task,
      time,
      projectManagement,
      notes,
      date,
      day,
    };

    axios({
      url: "https://project-backend-production-62d5.up.railway.app/time/create",
      method: "Post",
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box style={{ margin: "auto" }}>
      <IconButton
        onClick={onOpen}
        style={{
          height: "70px",
          padding: "5px",
          width: "70px",
          backgroundColor: "rgb(24,132,51)",
          border: "none",
          fontSize: "30px",
          borderRadius: "5px",
          color: "white",
          borderRadius: "10px",
          marginTop: "-30px",
          marginLeft: "20px",
        }}
        aria-label="Add to friends"
        icon={<AddIcon />}
      />
      <Text mt={"10px"} ml={"20px"}>
        {" "}
        Track time
      </Text>

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
                onChange={(e) => setTask(e.target.value)}
                ref={initialRef}
                placeholder="Task"
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                name="title"
                onChange={(e) => setProjectManagement(e.target.value)}
                placeholder="project management"
              />
            </FormControl>
            <Flex>
              {" "}
              <FormControl mt={4}>
                <Input
                  name="title"
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write Notes"
                />
              </FormControl>
              <FormControl mt={4}>
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
              onClick={handleSubmit}
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
  );
}

export default Create;
