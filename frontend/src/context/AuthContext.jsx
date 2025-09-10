// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on refresh if token exists
  useEffect(() => {
    // ✅ fetch user profile if cookie exists
    console.log("Use effect will execute");
    
    const fetchUser = async () => {
      console.log("fetch user will execute");

      try {
        const res = await axiosInstance.get("/auth/me", { withCredentials: true });
        console.log("Data From auth Context",res.data);
        
        if (res.data.success) {
          setUser(res.data.userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await axiosInstance.post(
      "/auth/login",
      { email, password },
      { withCredentials: true } // ✅ make sure cookies are stored
    );

    if (res.data.success) {
      setUser(res.data.userData);
    } else {
      setUser(null);
      throw new Error(res.data.message || "Login failed");
    }
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
