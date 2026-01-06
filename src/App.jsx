// // import React from "react";
// // import Login from "./auth/Login";
// // import Dashboard from "./pages/dashboard";
// // import Register from "./auth/Register";
// // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import Logout from "./auth/Logout";
// // import NavBar from "./layout/navBar";
// // import Stats from "./pages/stats";
// // import Laps from "./pages/laps";

// // import { AuthProvider } from "../src/context/AuthContext";
// // import Sessions from "./pages/userSessions";
// // import AdminUsers from "./pages/admin/adminUsers";
// // import AdminLaps from "./pages/admin/AdminLaps";
// // import AdminSessions from "./pages/admin/AdminSessions";
// // import AdminLayout from "./layout/AdminLayout";
// // import UserLayout from "./layout/UserLayout";
// // import ProtectedRoute from "./pages/admin/ProtectedRoute";
// // import AdminRoute from "./pages/admin/AdminRoute";
// // const App = () => {
// //   return (
// //     <AuthProvider>
// //       <BrowserRouter>
// //         <div className="h-screen flex flex-col">
// //           <NavBar />

// //           <Routes>
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/register" element={<Register />} />
// //             <Route path="/" element={<Dashboard />} />
// //             <Route path="/sessions" element={<Sessions />} />
// //             <Route path="/logout" element={<Logout />} />
// //             <Route path="/stats" element={<Stats />} />
// //             <Route path="/laps" element={<Laps />} />

// //             <Route element={<AdminRoute />}>
// //               <Route path="/admin" element={<AdminLayout />}>
// //                 <Route path="users" element={<AdminUsers />} />
// //                 <Route path="sessions" element={<AdminSessions />} />
// //                 <Route path="laps" element={<AdminLaps />} />
// //               </Route>
// //             </Route>
// //           </Routes>

// //           {/* <Routes>
// //             PUBLIC
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/register" element={<Register />} />

// //             USER ROUTES
// //             <Route element={<ProtectedRoute/>}>
// //               <Route element={<UserLayout />}>
// //                 <Route path="/" element={<Dashboard />} />
// //                 <Route path="/sessions" element={<Sessions />} />
// //                 <Route path="/laps" element={<Laps />} />
// //                 <Route path="/stats" element={<Stats />} />
// //               </Route>
// //             </Route>

// //             ADMIN ROUTES
// //             <Route element={<AdminRoute/>}>
// //               <Route path="/admin" element={<AdminLayout />}>
// //                 <Route path="users" element={<AdminUsers />} />
// //                 <Route path="sessions" element={<AdminSessions />} />
// //                 <Route path="laps" element={<AdminLaps />} />
// //               </Route>
// //             </Route>
// //           </Routes> */}
// //         </div>
// //       </BrowserRouter>
// //     </AuthProvider>
// //   );
// // };

// // export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/dashboard";
import Sessions from "./pages/userSessions";
import Laps from "./pages/laps";
import Stats from "./pages/stats";
import AdminPage from "./pages/admin/AdminPage";
// import AdminUsers from './pages/admin/AdminUsers'
// import AdminSessions from "./pages/admin/AdminSessions";
// import AdminLaps from "./pages/admin/AdminLaps";
import Navbar from "./layout/navBar";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <Sessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/laps"
            element={
              <ProtectedRoute>
                <Laps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminPage defaultTab="users" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sessions"
            element={
              <ProtectedRoute adminOnly>
                <AdminPage defaultTab="sessions" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/laps"
            element={
              <ProtectedRoute adminOnly>
                <AdminPage defaultTab="laps" />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
