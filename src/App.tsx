import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Explorer from "./components/Explorer/Explorer";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function login() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke("login", { }).then((value) => {
      listFiles();
    });
  }

  async function listFiles() {
    setGreetMsg(await invoke("list_files", { }));
  }

  async function logout() {
    invoke("logout", { }).then(() => {
      setGreetMsg('');
    });
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <Explorer structure={[{ name: 'testing_long_name_one_two_three.py', type: 'file'}, { name: 'config.lua', type: 'file'}, { name: '[scripts]', type: 'folder'}]} />

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => login()}>
            Login 
          </button>
          <button type="button" onClick={() => listFiles()}>
            List
          </button>
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
