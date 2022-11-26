import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Explorer from "./components/Explorer/Explorer";
import Header from "./components/Header/Header";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./reducer";

function App() {
  const dispatch = useDispatch();
  const nodes = useSelector((state: AppState) => state.nodes);
  
  const [loggedIn, setLoggedIn] = useState(false);

  async function login() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke("login", { }).then((value) => {
      setLoggedIn(true);
      listNodeNames();
    });
  }

  async function listNodeNames() {
    invoke("list_nodes", { }).then((v: any) => { 
			dispatch({ type: 'setNodes', payload: v});
    });
  }

  async function logout() {
    invoke("logout", { }).then(() => {
      setLoggedIn(false);
			dispatch({ type: 'setNodes', payload: []});
    });
  }

  return (
    <div>
      <Explorer structure={nodes} />
      { !loggedIn && <Button onClick={login}>Zaloguj</Button> }
      { loggedIn && <Button onClick={logout}>Wyloguj</Button> }
    </div>
  );
}

export default App;
