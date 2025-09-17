import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = ({ children }) => {
  console.log("Whenever Try to access protected route PrivateRoute execute");
  
  const { user, loading } = useAuth();
  console.log(user);
  
  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
