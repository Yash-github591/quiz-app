// Navbar.js
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Link as ChakraLink,
  Button,
  ChakraProvider,
  VStack,
  HStack,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // when the user first loads the app, we want to check if they are logged in
    // if they are logged in, we want to redirect them to the login page

    // check if the user is logged in
    axios
      .get(`${base_url}/api/auth/currentUser`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        // if the user is not logged in, redirect them to the login page
        navigate("/login");
      });
  }, []);

  const handleLogout = () => {
    axios
      .get(`${base_url}/api/auth/logout`, { withCredentials: true })
      .then((res) => {
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ChakraProvider>
      <Flex p="4" bg="blue.500" color="white">
        <Box>
          <Link to="/">
            <ChakraLink>Language Learn</ChakraLink>
          </Link>
        </Box>
        <Spacer />
        {user && (
          <Box>
            <Text style={{ display: "inline", marginRight: "12px" }}>
              Hello {user.username}
            </Text>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem style={{ color: "black" }}>Profile</MenuItem>
                <MenuItem style={{ color: "black" }} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
        {!user && (
          <HStack>
            <Box>
              <Link to="/login">
                <ChakraLink>Login</ChakraLink>
              </Link>
            </Box>
            <Box>
              <Link to="/register">
                <ChakraLink>Register</ChakraLink>
              </Link>
            </Box>
          </HStack>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default Navbar;
