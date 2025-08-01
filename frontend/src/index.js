import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './index.css';  // or './styles.css' depending on your file


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <AuthProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);
