import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Select,
  Button,
  Text,
  Stack,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Textarea,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const UpdateProblem = () => {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [problem_statement, setProblemStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { id } = useParams();
  useEffect(() => {
    const base_url = process.env.REACT_APP_BASE_URL;
    axios
      .get(`${base_url}/api/problems/${id}`)
      .then((res) => {
        // console.log(res.data);
        setSubject(res.data.subject);
        setDifficulty(res.data.difficulty);
        setProblemStatement(res.data.problem_statement);
        setAnswer(res.data.answer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser behavior of refreshing the page on form submission

    // TODO: Send the problem data to your backend API for adding to the database.
    axios
      .put(
        `${base_url}/api/problems/${id}`,
        {
          subject,
          difficulty,
          problem_statement,
          answer,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        navigate("/");
        alert("Problem Updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    // Reset the form after successful submission
    setSubject("");
    setDifficulty(1);
    setProblemStatement("");
    setAnswer("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Heading as="h2" size="lg">
          Update the Problem
        </Heading>
        <FormControl flexDir="column">
          <FormLabel>Difficulty (1-5)</FormLabel>
          <NumberInput
            size="md"
            maxW={24}
            defaultValue={1}
            min={1}
            max={5}
            onChange={(value) => {
              setDifficulty(value);
            }}
            value={difficulty}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl flexDir="column">
          <FormLabel>Language</FormLabel>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {subject == "" && <>Select Language</>}
              {subject != "" && <>{subject}</>}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setSubject("Hindi");
                }}
              >
                Hindi
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSubject("English");
                }}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSubject("Japanese");
                }}
              >
                Japanese
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSubject("French");
                }}
              >
                French
              </MenuItem>
            </MenuList>
          </Menu>
        </FormControl>
        <FormControl flexDir="column">
          <FormLabel>Problem Statement</FormLabel>
          <Textarea
            placeholder="Enter the problem here"
            onChange={(e) => {
              setProblemStatement(e.target.value);
            }}
            value={problem_statement}
          />
        </FormControl>
        <FormControl flexDir="column">
          <FormLabel>Answer</FormLabel>
          <Input
            name="answer"
            type="text"
            placeholder="Enter the answer"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            value={answer}
            required
            bg="gray.100"
            borderRadius="md"
            _hover={{ bg: "gray.200" }}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Update Problem
        </Button>
      </Stack>
    </Box>
  );
};

export default UpdateProblem;
