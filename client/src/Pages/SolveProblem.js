import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

const SolveProblem = () => {
  const [answer, setAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [problem_statement, setProblemStatement] = useState("");
  const { user, setUser } = useContext(UserContext);

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

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the answer
    // onSubmit(answer);
    console.log(user);
    if (userInput.toLowerCase() === answer.toLowerCase()) {
      alert("Correct Answer!");
    } else {
      alert("Wrong Answer!");
    }
  };

  return (
    <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading size="lg" mb={4}>
        {problem_statement}
      </Heading>
      <Text mb={4} fontSize="md" color="gray.600">
        Difficulty: {difficulty} | Marks Allotted: {difficulty}
      </Text>
      <Heading size="sm" mb={2}>
        Your Answer
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="answer" isRequired>
          <FormLabel>Your Answer (One word only):</FormLabel>
          <Input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <Button type="submit" mt={4} colorScheme="teal">
          Submit
        </Button>
      </form>
      <Text mt={2} color="gray.500">
        Disclaimer: Please answer in one word only.
      </Text>
    </Box>
  );
};

export default SolveProblem;
