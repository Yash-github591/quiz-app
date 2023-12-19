import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Center,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;
  const Navigate = useNavigate();

  const handleRegister = () => {
    try {
      axios
        .post(
          `${base_url}/api/auth/register`,
          { username, password },
          { withCredentials: true } // cookie is needed to be sent to the server to add the cookie to the response
        )
        .then((res) => {
          console.log(res);
          Navigate("/");
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    } catch (error) {
      alert(error);
    }
  };

  const toRegisterPage = () => {
    Navigate("/login");
  };

  return (
    <ChakraProvider>
      <Center height="100vh">
        <VStack>
          <Box
            width="400px"
            padding="8"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
          >
            <Heading mb="4">Register</Heading>
            <FormControl mb="4">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleRegister}>
              Register
            </Button>
          </Box>
          <Box>
            Already have an account?
            <Button size="xs" colorScheme="blue" onClick={toRegisterPage}>
              Login
            </Button>
          </Box>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default Register;
