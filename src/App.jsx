import React from "react";
import Login from "./auth/Login";
import Dashboard from "./pages/dashboard";
import Register from "./auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./auth/Logout";
import NavBar from "./layout/navBar";
import Stats from "./pages/stats";
import Laps from './pages/laps'
// import Sidebar from "./layout/sideBar";
import Sessions from "./pages/userSessions";
const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <NavBar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/laps" element={<Laps />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
