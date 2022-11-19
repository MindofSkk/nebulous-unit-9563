import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditExpence from "./EditExpence";
import styles from "./Expenses.module.css";



export const Table = ({tdata}) => {


  const [Tab, SetTab] = useState(false);

  return (
    <div className={styles.testa}>
      <Box className={styles.header}>
        <hr />
        <h2>28-Aug 2022</h2>
        <hr />
      </Box>

      {/* //map */}

      <Box> {Tab ? <EditExpence /> : null}</Box>

      {tdata.map((item, index) => (
        <Box key={index}>
          <Box className={styles.tables}>
            <Box className={styles.tab1}>
              <Box>
                {" "}
                <h1>{item.date}</h1>{" "}
              </Box>
              <Box>
                {" "}
                <b className={styles.tabe}>
                  {item.projectname} ( {item.expensee} )
                </b>
                <br />
              </Box>
            </Box>
            <Box className={styles.tab1}>
              <Box>
                {" "}
                <h1>${item.amount}</h1>{" "}
              </Box>
              <Box>
                {" "}
                <Button
                  className={styles.tabea}
                  colorScheme="black"
                  variant="outline"
                  onClick={() => SetTab(true)}
                >
                  <Link to={`/expenses/${item._id}`}>Edit</Link>
                  {/* <Link to={`/expenses`} >Edit</Link> */}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </div>
  );
};
