import { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";

import { GlobalContext } from "#/contexts/GlobalContext";

import "./App.scss";
import logo from "#/assets/images/logo.svg";

function App() {
  const navigate = useNavigate();
  const { conversationId, logOut } = useContext(GlobalContext);

  return (
    <>
      {!conversationId ? (
        <Box height="100%" display="flex">
          <Text fontSize="2xl" fontWeight="600" margin="auto">
            Select or start conversation
          </Text>
        </Box>
      ) : (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Button
              onClick={() => {
                logOut();
                return navigate("/login");
              }}
            >
              Log out
            </Button>
          </header>
        </div>
      )}
    </>
  );
}

export default memo(App);
