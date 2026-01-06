import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

const Laps = () => {
  const [laps, setLaps] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLaps = async (pageNo = 1) => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/laps/user?page=${pageNo}&limit=6`);
      console.log(data);

      setLaps(data.laps);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load laps");
    } finally {
      setLoading(false);
    }
  };

  // DELETE lap
  const deleteLap = async (lapId) => {
    if (!window.confirm("Delete this lap?")) return;

    try {
      await api.delete(`/lap/delete/${lapId}`);
      setLaps((prev) => prev.filter((lap) => lap.lapId !== lapId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete lap");
    }
  };

  // DELETE all laps
  const clearAllLaps = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all laps?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete("/lap/delete-all");
      setLaps([]);
      setPage(1);
      setTotalPages(1);
      alert("All laps deleted successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete laps");
    }
  };

  useEffect(() => {
    fetchLaps(page);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Laps</h1>

          {laps.length > 0 && (
            <button
              onClick={clearAllLaps}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All Laps
            </button>
          )}
        </div>

        {loading && <p className="text-center">Loading laps...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && laps.length === 0 && (
          <p className="text-center text-gray-500">No laps found</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {laps.map((lap) => (
            <div key={lap.lapId} className="bg-white rounded-xl shadow p-4">
              <p className="text-sm text-gray-500">Lap ID</p>
              <p className="font-mono text-xs break-all mb-2">{lap.lapId}</p>

              <p>
                <b>Session:</b> {lap.sessionId}
              </p>
              <p>
                <b>Start:</b> {new Date(lap.lapStart).toLocaleString()}
              </p>
              <p>
                <b>End:</b>{" "}
                {lap.lapEnd ? new Date(lap.lapEnd).toLocaleString() : "Active"}
              </p>
              <p>
                <b>Duration:</b> {lap.duration || "--"}
              </p>

              <button
                onClick={() => deleteLap(lap.lapId)}
                className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => fetchLaps(page - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchLaps(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Laps;
