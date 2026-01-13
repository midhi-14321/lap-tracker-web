// import { useState } from "react";
// import api from "../utils/axiosInstance";
// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { setUser } = useAuth();
//   const navigate = useNavigate();
//   const handleLogin = async (e) => {
//     e.preventDefault(); // stop browser's default behaviour

//     try {
//       const { data } = await api.post("/auth/login", {
//         email,
//         password,
//       });
//       setUser(data.user);

//       //  Check if user is admin and redirect accordingly
//       if (data.user?.role === "admin") {
//         // Redirect to admin dashboard
//         navigate("/admin");
//       } else {
//         // Redirect to normal user dashboard
//         navigate("/");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
//           <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

//           {error && (
//             <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
//           )}

//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 rounded-lg border"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 rounded-lg border"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 cursor-pointer"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-center mt-4">
//             Don't have an account?{" "}
//             <a className="text-blue-600" href="/register">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useState } from "react";
import api from "../utils/axiosInstance";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // stop browser's default behaviour
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      setUser(data.user);

      //  Check if user is admin and redirect accordingly
      if (data.user?.role === "admin") {
        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        // Redirect to normal user dashboard
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      {/*animated background elements*/}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 z-10 border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:text-blue-800 transition duration-200"
          >
            Create Account
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
