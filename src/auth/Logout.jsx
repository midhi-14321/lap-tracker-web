import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import React from "react";
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login"); // redirect to login after logout
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
    >
      Logout
    </button>
  );
};

export default Logout;
