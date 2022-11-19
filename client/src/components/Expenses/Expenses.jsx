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
import React, { useEffect, useState } from "react";
import { Form } from "./Form";
import styles from "./Expenses.module.css";
import { Table } from "./Table";
import { BlankBox } from "./BlankBox";
import { Spinner } from "@chakra-ui/react";

export const Expenses = () => {
  const [div, SetDiv] = useState(false);
  const [projectname, SetProject] = useState("");
  const [expensee, Setpu] = useState("");
  const [notes, SetNotes] = useState("");
  const [date, Setdate] = useState("");
  const [amount, Setamount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tabledata, setTabledata] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      projectname,
      expensee,
      notes,
      amount,
      date,
    };
    console.log(payload);
    await fetch("http://localhost:8080/expenses", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("post", res);
        getdata();
      })
      .catch((err) => console.log(err));

    SetDiv(false);
  };

  const getdata = async() => {
    setLoading(true);

    fetch("http://localhost:8080/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("getdata", res);
        setTabledata(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    
   
  };

  useEffect(() => {
    getdata();
  }, []);

  if (loading) {
    return <Spinner m="auto"  />;
  }
  return (
    <div>
      <Box w="100%" p={4}>
        <Box className={styles.main}>
          <h1>Expenses</h1>

          <Button onClick={() => SetDiv(true)} bg="green">
            + Expenses
          </Button>
        </Box>
        {div ? (
          <Box className={styles.res}>
            <Box className={styles.abc}>
              <Box className={styles.dleft}>
                <h1>Date</h1>

                <Input
                  type="date"
                  value={date}
                  onChange={(e) => Setdate(e.target.value)}
                />
              </Box>
              <Box spacing={3}>
                <h1>Project / Category</h1>
                <form action="" onSubmit={handleSubmit}>
                  <Select
                    className={styles.sel}
                    onChange={(e) => SetProject(e.target.value)}
                  >
                    <option value="Example Search">Example Search</option>
                    <option value="New Project">New Project</option>
                    <option value="Example Project">Example Project </option>
                  </Select>

                  <Select
                    className={styles.sel}
                    onChange={(e) => Setpu(e.target.value)}
                  >
                    <option value="Chosses a category">
                      Chosses a category
                    </option>
                    <option value="Entrainment">Entrainment</option>
                    <option value="Lodging">Lodging</option>
                    <option value="Mileage">Mileage</option>
                    <option value="Others">Others</option>
                    <option value="Transportion">Transportion</option>
                  </Select>
                  <Input
                    onChange={(e) => SetNotes(e.target.value)}
                    value={notes}
                    type="text"
                    placeholder="Notes (Optional)"
                    className={styles.sel}
                  />
                  <Input type="file" />
                  <Checkbox
                    className={styles.sel}
                    size="sm"
                    colorScheme="orange"
                    defaultChecked
                  >
                    This expense is billable
                  </Checkbox>
                  <br />
                  <Button type="submit" bg="green" color="white">
                    Save expenses
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="black"
                    variant="outline"
                    className={styles.bcancel}
                  >
                    cancel
                  </Button>
                </form>
              </Box>
              <Box className={styles.rpay}>
                <h1>Amount</h1>
                <Input
                  type="text"
                  color="black"
                  value={amount}
                  placeholder="$"
                  onChange={(e) => Setamount(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        ) : null}
        <Box></Box>
      </Box>

      {tabledata.length ? <Table tdata={tabledata} /> : <BlankBox />}
    </div>
  );
};
