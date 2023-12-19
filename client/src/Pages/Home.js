import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LanguageContext } from "../Context/LanguageContext";
import ProblemCard from "../Components/ProblemCard";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { language, setLanguage } = useContext(LanguageContext);
  const [problems, setProblems] = useState([]); // array of objects of problems
  const [allProfiles, setAllProfiles] = useState([]); // array of objects of profiles
  const btnRef = React.useRef();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    axios
      .get(`${base_url}/api/problems`)
      .then((res) => {
        // console.log(res.data);
        setProblems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${base_url}/api/auth/allProfiles`)
      .then((res) => {
        console.log(res.data);
        setAllProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log(problems);
  // }, [problems]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1%",
        }}
      >
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Select Language ({language == "" ? "Not Selected" : language})
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setLanguage("");
              }}
            >
              Select Language
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLanguage("Hindi");
              }}
            >
              Hindi
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLanguage("English");
              }}
            >
              English
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLanguage("French");
              }}
            >
              French
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLanguage("Japanese");
              }}
            >
              Japanese
            </MenuItem>
          </MenuList>

          {language != "" && (
            <>
              <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                View Leaderboard ({language})
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Top Performers in {language}</DrawerHeader>

                  <DrawerBody></DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Menu>
      </div>
      {language != "" && (
        <Box>
          <Text fontSize="3xl">{language} Problems:-</Text>
          <Box>
            {problems
              .filter((problem) => problem.subject == language)
              .map((problem, idx) => {
                return <ProblemCard problem={problem} />;
              })}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Home;
