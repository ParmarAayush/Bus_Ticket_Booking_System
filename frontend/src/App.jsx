import { Route, Routes } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./pages/Home";
import Otp from "./features/auth/Otp";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      {/* Private routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verify/otp" element={<Otp />} />
    </Routes>
  );
};

export default App;
