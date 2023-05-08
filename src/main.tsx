import React from "react";
import ReactDOM from "react-dom/client";

import './main.css'
import Calcul from "./components/Calcul";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Calcul />
  </React.StrictMode>
);
