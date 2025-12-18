import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import React from "react";
const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/user/stats");
        setStats(data);
      } catch {
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading stats...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">My Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="My Sessions" value={stats.totalSessions} />
        <StatCard label="My Laps" value={stats.totalLaps} />
        <StatCard
          label="Avg Lap Duration"
          value={
            stats.avgLapDuration
              ? `${stats.avgLapDuration.toFixed(2)} sec`
              : "—"
          }
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white shadow rounded-xl p-6">
    <p className="text-gray-500 text-sm">{label}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2> 
  </div>
);

export default Stats;
