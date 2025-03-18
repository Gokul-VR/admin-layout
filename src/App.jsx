import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Kanban } from "./kanban";
import AnimatedTabs from "./components/animatedTabs";

function App() {
  return (
    <>
      <div>
        <Kanban />
      </div>
    </>
  );
}

export default App;
