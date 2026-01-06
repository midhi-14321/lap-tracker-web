import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null); // clearing the AuthContext user immediately when user is logout and navigate to login

      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
    >
      Logout
    </button>
  );
};

export default Logout;
