import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { GlobalContext } from "#/contexts/GlobalContext";

import "./App.scss";
import logo from "#/assets/images/logo.svg";

function App() {
  const navigate = useNavigate();
  const { logOut } = useContext(GlobalContext);

  return (
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
  );
}

export default App;
