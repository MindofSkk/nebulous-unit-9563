import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Image,
  Img,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

import styles from "./Expenses.module.css";

export const BlankBox = () => {
  return (
    <div>
      <Box className={styles.blanck}>
        <Box className={styles.logos}>
          <Box className={styles.imga}>
            {" "}
            <Image src="https://cache.harvestapp.com/static/illustrations/expense_onboard-AAC9C67E.png" />
          </Box>
          <h1>
            Record those airline tickets, meals, miles, and other expenses in
            Harvest <br />
            so you can more accurately budget projects and invoice clients.
          </h1>
        </Box>
      </Box>
    </div>
  );
};
