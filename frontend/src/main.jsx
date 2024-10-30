// src/index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Routes1 from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes1 />
    </Router>
  </StrictMode>
);
