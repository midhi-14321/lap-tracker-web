import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../auth/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="h-15 bg-white shadow flex items-center px-6 justify-between">
      <h1 className="text-lg font-semibold">Session Tracker</h1>

      <div className="flex gap-6 items-center">
        <button onClick={() => navigate("/")} className="text-blue-500">
          Dashboard
        </button>
        <button onClick={() => navigate("/sessions")} className="text-blue-500">
          Sessions
        </button>
        <button onClick={() => navigate("/laps")} className="text-blue-500">
          Laps
        </button>
        <button onClick={() => navigate("/stats")} className="text-blue-500">
          Stats
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="text-red-600 font-semibold bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100"
          >
            Admin Panel
          </button>
        )}

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
          >
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
              {user ? user.userName[0].toUpperCase() : "?"}
            </div>

            {user && (
              <span className="text-sm font-medium">{user.userName}</span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded-md overflow-hidden">
              {!user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Login
                </button>
              ) : (
                <div className="px-2 py-2">
                  <Logout />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
