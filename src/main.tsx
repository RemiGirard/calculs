import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import Calcul from "./components/Calcul";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Calcul env="prod" />
  </React.StrictMode>
);
