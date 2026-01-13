import { useState } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import React from "react";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // stops the browser's default behaviour
    setError("");

    try {
      const res = await api.post("/auth/register", {
        userName,
        email,
        password,
      });

      console.log("Register success:", res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-emerald-300">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 text-sm mt-1">Join our community</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-medium transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-medium hover:text-green-800"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
export default Register;
