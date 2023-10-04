import { useState } from "react";
import Chat from "./Chat";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatbot App</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App;
