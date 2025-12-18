import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import SessionCard from "./sessionCard";
import React from "react";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSessions = async (pageNo = 1) => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/user/sessions?page=${pageNo}&limit=6`);
      console.log(data);

      setSessions(data.sessions);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };
  // DELETE session handler
  const deleteSession = async (sessionId) => {
    try {
      await api.delete(`/session/delete/${sessionId}`);
      // Remove the deleted session from state
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      alert("Session deleted successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete session");
    }
  };

  // DELETE all sessions
  const clearAllSessions = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all sessions?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete("/session/delete-all");
      setSessions([]); // clear all sessions
      setPage(1);
      setTotalPages(1);
      alert("All sessions deleted successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete sessions");
    }
  };

  useEffect(() => {
    fetchSessions(page);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6">Your Sessions</h1>
          {sessions.length > 0 && (
            <button
              onClick={clearAllSessions}
              className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All Sessions
            </button>
          )}
        </div>

        {loading && <p className="text-center">Loading sessions...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && sessions.length === 0 && (
          <p className="text-center text-gray-500">No sessions found</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onDelete={deleteSession}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => fetchSessions(page - 1)}
            className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchSessions(page + 1)}
            className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
