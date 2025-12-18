import React from "react";
import Logout from "../auth/Logout";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-15  bg-white shadow flex items-center px-6 justify-between">
      <h1 className="text-lg font-semibold">Session Tracker</h1>
      <button
        className="text-m text-blue-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Dashboard
      </button>
      <button
        className="text-m text-blue-500 cursor-pointer"
        onClick={() => navigate("/sessions")}
      >
        Sessions
      </button>
      <button
        className="text-m text-blue-500 cursor-pointer"
        onClick={() => navigate("/laps")}
      >
        Laps
      </button>
      <button
        className="text-m text-blue-500 cursor-pointer"
        onClick={() => navigate("/stats")}
      >
        Stats
      </button>

      <Logout />
    </div>
  );
};

export default Navbar;
