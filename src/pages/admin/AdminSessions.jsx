import React, { useState, useEffect } from "react";
import api from "../../utils/axiosInstance";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchSessions = async (pageNo = 1, searchTerm = "") => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/admin/sessions?page=${pageNo}&limit=10&search=${searchTerm}`
      );
      setSessions(data.sessions);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions(page, search);
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleDelete = async (sessionId) => {
    if (!window.confirm("Delete this session and all its laps?")) return;

    try {
      await api.delete(`/admin/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      alert("Session deleted successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete session");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🏁 All Sessions</h2>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading sessions...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl shadow-lg p-5 border-l-4"
                style={{
                  borderLeftColor: session.endTime ? "#10B981" : "#EF4444",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    👤 {session.userName}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.endTime
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {session.endTime ? "Completed" : "🔴 Active"}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-2 font-mono">
                  {session.id}
                </p>

                <div className="space-y-1 text-sm">
                  <p>
                    <b>Start:</b> {new Date(session.startTime).toLocaleString()}
                  </p>
                  <p>
                    <b>End:</b>{" "}
                    {session.endTime
                      ? new Date(session.endTime).toLocaleString()
                      : "—"}
                  </p>
                  <p>
                    <b>Duration:</b> {session.duration || "—"}
                  </p>
                  <p>
                    <b>Laps:</b> {session.lapCount || 0}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(session.id)}
                  className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Session
                </button>
              </div>
            ))}
          </div>

          {sessions.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No sessions found
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSessions;
