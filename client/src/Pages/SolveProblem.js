import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Badge,
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
  const [isSolved, setIsSolved] = useState(false); // TODO: Set this to true if the user has solved the problem
  const base_url = process.env.REACT_APP_BASE_URL;

  const { id } = useParams();
  useEffect(() => {
    console.log(user);
    if (user.completed_exercises?.includes(id)) {
      setIsSolved(true);
    }
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
    // console.log(typeof subject);
    if (userInput.toLowerCase() === answer.toLowerCase()) {
      if (!user.completed_exercises?.includes(id)) {
        setIsSolved(true);
        user.subject_scores[subject] =
          (user.subject_scores[subject] || 0) + difficulty; // TODO: Add the difficulty to the user's score for this subject
        user.completed_exercises = [...user.completed_exercises, id]; // TODO: Add the id of the problem to the user's completed_exercises array
        console.log(user);
        axios
          .put(
            `${base_url}/api/auth/updateProfile`,
            {
              id: user.id,
              username: user.username,
              completed_exercises: user.completed_exercises,

              subject_scores: user.subject_scores,
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("You have already solved this problem!");
      }
      alert("Correct Answer!");
    } else {
      alert("Wrong Answer!");
    }
  };

  return (
    <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
      {/* Add Badge component to indicate solved or unsolved */}
      <Badge colorScheme={isSolved ? "green" : "red"} mb={4}>
        {isSolved ? "Solved" : "Unsolved"}
      </Badge>

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
