import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Edit from "../Time/EditTimer";
import Create from "../Time/CreateTimer";
import Timecounter from "../Time/TimeCounter";

function Products() {
  const [products, setProducts] = useState([]);

  let today = new Date().toISOString().slice(0, 10);

  console.log(today);
  useEffect(() => {
    fetch("http://localhost:8080/time")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const del = (id) => {
    fetch(`http://localhost:8080/time/${id}`, {
      method: "DELETE",
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <Box style={{ marginLeft: "10px" }}>
      <Heading ml="145px" mt="20px" as="h4" size="lg" fontWeight="500">
        {" "}
        Saturday : {today}
      </Heading>
      <Box
        style={{
          display: "flex",
          gap: "20px",
          marginLeft: "140px",
          marginTop: "20px",
        }}
      >
        {" "}
        <Box>
          <Button>Monday</Button>
        </Box>
        <Box>
          <Button>Tuesday</Button>
        </Box>
        <Box>
          <Button>Tuesday</Button>
        </Box>
        <Box>
          <Button>WednesDay</Button>
        </Box>
        <Box>
          <Button>Friday</Button>
        </Box>
        <Box>
          <Button>Saturday</Button>
        </Box>
        <Box>
          <Button>Sunday</Button>
        </Box>
      </Box>

      <Box style={{ marginLeft: "10px", display: "flex" }}>
        <Flex>
          <Create style={{ width: "10%" }} />

          <Box>
            <TableContainer mt="30px" ml="30px" bg={"rgb(255,248,240)"}>
              <Table variant="striped" colorScheme="rgb(255,213,188)">
                <TableCaption>
                  “All we have to decide is what to do with the time that is
                  given us.” – Gandalf
                </TableCaption>

                {products.map((p) => {
                  return (
                    <>
                      <Tbody w="700px" style={{ marhinLeft: "40px" }}>
                        <Tr>
                          <Td>
                            {" "}
                            <Heading as="h4" size="md">
                              {" "}
                              {p.tasks}
                              {p.notes}
                            </Heading>{" "}
                            <br /> {p.projectManagement}
                          </Td>
                          <Td></Td>
                          <Td> </Td>
                          <Td> </Td>
                          <Td> </Td>
                          <Td> </Td>
                          <Td> </Td>
                          <Td> </Td>
                          <Td> </Td>
                          <Td> </Td>
                          <Td>
                            <Timecounter props={p} />{" "}
                          </Td>
                          <Td>
                            {" "}
                            <Edit
                              key={p.id}
                              id={p.id}
                              time={p.time}
                              props={p}
                            />
                          </Td>
                          <Td>
                            {" "}
                            <Button onClick={() => del(p._id)}>Delete</Button>
                          </Td>
                        </Tr>
                      </Tbody>
                      <hr />
                    </>
                  );
                })}
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Products;
