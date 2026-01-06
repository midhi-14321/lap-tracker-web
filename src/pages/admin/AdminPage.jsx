// src/pages/admin/AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/axiosInstance";
import AdminUsers from "./AdminUsers";
import AdminSessions from "./AdminSessions";
import AdminLaps from "./AdminLaps";

const AdminPage = ({ defaultTab = "stats" }) => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL or prop
  const getTabFromPath = () => {
    if (location.pathname === "/admin/users") return "users";
    if (location.pathname === "/admin/sessions") return "sessions";
    if (location.pathname === "/admin/laps") return "laps";
    return defaultTab;
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "stats") {
      navigate("/admin");
    } else {
      navigate(`/admin/${tabId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: "stats", label: "📊 Dashboard" },
    { id: "users", label: "👥 Users" },
    { id: "sessions", label: "🏁 Sessions" },
    { id: "laps", label: "⏱️ Laps" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">🛡️ Admin Panel</h1>
          <p className="text-red-100 mt-1">
            Manage users, sessions, and laps across the platform
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "stats" && (
          <AdminStats stats={stats} loading={statsLoading} />
        )}
        {activeTab === "users" && <AdminUsers />}
        {activeTab === "sessions" && <AdminSessions />}
        {activeTab === "laps" && <AdminLaps />}
      </div>
    </div>
  );
};

// Stats Dashboard 
const AdminStats = ({ stats, loading }) => {
  if (loading) {
    return <div className="text-center py-10">Loading statistics...</div>;
  }

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      label: "Total Sessions",
      value: stats?.totalSessions || 0,
      icon: "🏁",
      color: "bg-green-500",
    },
    {
      label: "Total Laps",
      value: stats?.totalLaps || 0,
      icon: "⏱️",
      color: "bg-purple-500",
    },
    {
      label: "Active Sessions",
      value: stats?.activeSessions || 0,
      icon: "🔴",
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Platform Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div
                className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center text-2xl text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
