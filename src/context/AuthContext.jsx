import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import React from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const isAdmin = user?.role === "admin" || user?.role === "super-admin";

  return (
    <AuthContext.Provider value={{ user, setUser, loading ,isAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
