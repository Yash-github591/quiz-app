import React, { useContext } from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProblemCard = ({ problem }) => {
  const { _id, contributor, problem_statement, difficulty } = problem;
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;

  const handleSolve = () => {
    // Implement solve functionality here
    navigate(`/solveProblem/${_id}`);
    // console.log("Solving problem:", problem);
  };

  const handleUpdate = () => {
    // Implement update functionality here
    navigate(`/update/${_id}`);
  };

  const handleDelete = () => {
    // Implement delete functionality here
    axios
      .delete(`${base_url}/api/problems/${_id}`, { withCredentials: true })
      .then((res) => {
        alert("Problem deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("Deleting problem:", problem);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="4">
      <Heading mb="2" fontSize="xl">
        Problem Statement
      </Heading>
      <Text mb="2">{problem_statement}</Text>
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" fontSize="lg">
          Difficulty: {difficulty}
        </Text>
        <Flex>
          {contributor != user.id && (
            <Button colorScheme="blue" mr="2" onClick={handleSolve}>
              Solve
            </Button>
          )}
          {contributor == user.id && (
            <>
              <Button colorScheme="green" mr="2" onClick={handleUpdate}>
                Update
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProblemCard;
