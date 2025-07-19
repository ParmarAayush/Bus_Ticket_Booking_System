import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Otp from "./features/auth/Otp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify/otp" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
