import React, { useContext, useState } from "react";
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
import { UserContext } from "../Context/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const base_url = process.env.REACT_APP_BASE_URL;
  const Navigate = useNavigate();

  const handleLogin = () => {
    try {
      axios
        .post(
          `${base_url}/api/auth/login`,
          { username, password },
          { withCredentials: true } // cookie is needed to be sent to the server to add the cookie to the response
        )
        .then((res) => {
          // console.log(res.data);
          setUser(res.data);
          Navigate("/");
        })
        .catch((err) => {
          alert(err.response);
        });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const toRegisterPage = () => {
    Navigate("/register");
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
            <Heading mb="4">Login</Heading>
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
            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </Box>
          <Box>
            Don't have an account?
            <Button size="xs" colorScheme="blue" onClick={toRegisterPage}>
              Register
            </Button>
          </Box>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default Login;
