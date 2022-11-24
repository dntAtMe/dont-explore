import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Explorer from "./components/Explorer/Explorer";
import Header from "./components/Header/Header";
import { Button } from "react-bootstrap";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [nodes, setNodes] = useState([]);

  async function login() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke("login", { }).then((value) => {
      setLoggedIn(true);
      listNodeNames();
    });
  }

  async function onNodeClick(nodeName: string) {
    invoke("change_path", {  path: nodeName}).then((v: any) => { 
			console.log('Success');
      setNodes(v);
    }).catch((e) => { 
			console.log(e)
		});
  }

  async function listNodeNames() {
    invoke("list_nodes", { }).then((v: any) => { 
      setNodes(v)
    });
  }

  async function logout() {
    invoke("logout", { }).then(() => {
      setLoggedIn(false);
      setNodes([]);
    });
  }

  return (
    <div>
      <Header />
      <Explorer structure={nodes} onNodeClick={onNodeClick} />
      { !loggedIn && <Button onClick={login}>Zaloguj</Button> }
      { loggedIn && <Button onClick={logout}>Wyloguj</Button> }
    </div>
  );
}

export default App;
