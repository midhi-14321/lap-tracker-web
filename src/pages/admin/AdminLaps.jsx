// import { useEffect, useState } from "react";
// import api from "../../utils/axiosInstance";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// const AdminLaps = () => {
//   const [laps, setLaps] = useState([]);

//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && user?.role !== "admin") {
//       navigate("/");
//     }
//   }, [user, loading, navigate]);

//   useEffect(() => {
//     const fetchLaps = async () => {
//       const { data } = await api.get("/admin/laps");
//       setLaps(data);
//     };
//     fetchLaps();
//   }, []);
//   if (loading) return null;
//   const deleteLap = async (lapId) => {
//     if (!window.confirm("Delete lap?")) return;

//     await api.delete(`/admin/lap/${lapId}`);
//     setLaps((prev) => prev.filter((l) => l.lapId !== lapId));
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">All Laps (Admin)</h2>

//       {laps.length === 0 && <p className="text-gray-500">No laps found</p>}

//       {laps.map((l) => (
//         <div key={l.lapId} className="bg-white p-4 shadow rounded mb-3">
//           <p>
//             <b>User:</b> {l.userName}
//           </p>
//           <p>
//             <b>Session:</b> {l.sessionId}
//           </p>
//           <p>
//             <b>Duration:</b> {l.duration || "—"}
//           </p>

//           <button
//             onClick={() => deleteLap(l.lapId)}
//             className="mt-2 text-red-500 hover:underline"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminLaps;

// import { useEffect, useState } from "react";
// import api from "../../utils/axiosInstance";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const AdminLaps = () => {
//   const [laps, setLaps] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.role !== "admin") {
//       navigate("/");
//       return;
//     }
//     fetchLaps();
//   }, [user, navigate]);

//   const fetchLaps = async () => {
//     try {
//       const { data } = await api.get("/admin/laps");
//       setLaps(Array.isArray(data) ? data : data.laps || []);
//     } catch (error) {
//       console.error("Error fetching laps:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteLap = async (lapId) => {
//     if (!window.confirm("Delete this lap?")) return;
//     try {
//       await api.delete(`/admin/lap/${lapId}`);
//       setLaps(laps.filter(l => l.lapId !== lapId));
//     } catch (error) {
//       alert("Failed to delete lap");
//     }
//   };

//   if (loading) return <div className="p-6">Loading laps...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Laps</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {laps.map((lap) => (
//           <div key={lap.lapId} className="bg-white p-4 rounded-lg shadow">
//             <p><strong>User:</strong> {lap.userName}</p>
//             <p><strong>Session:</strong> {lap.sessionId}</p>
//             <p><strong>Duration:</strong> {lap.duration || "N/A"}s</p>
//             <p><strong>Time:</strong> {new Date(lap.lapStart).toLocaleString()}</p>
//             <button
//               onClick={() => deleteLap(lap.lapId)}
//               className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminLaps;

// src/pages/admin/AdminLaps.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/axiosInstance";

const AdminLaps = () => {
  const [laps, setLaps] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchLaps = async (pageNo = 1, searchTerm = "") => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/admin/laps?page=${pageNo}&limit=12&search=${searchTerm}`
      );
      setLaps(data.laps);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch laps:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaps(page, search);
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleDelete = async (lapId) => {
    if (!window.confirm("Delete this lap?")) return;

    try {
      await api.delete(`/admin/laps/${lapId}`);
      setLaps((prev) => prev.filter((l) => l.lapId !== lapId));
      alert("Lap deleted successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete lap");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">⏱️ All Laps</h2>

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
        <div className="text-center py-10">Loading laps...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {laps.map((lap) => (
              <div
                key={lap.lapId}
                className="bg-white rounded-xl shadow p-4 border-t-4"
                style={{
                  borderTopColor: lap.lapEnd ? "#8B5CF6" : "#F59E0B",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                    👤 {lap.userName}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      lap.lapEnd
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {lap.lapEnd ? "Done" : "Active"}
                  </span>
                </div>

                <p className="text-xs text-gray-400 font-mono mb-2 truncate">
                  {lap.lapId}
                </p>

                <div className="space-y-1 text-sm">
                  <p>
                    <b>Start:</b> {new Date(lap.lapStart).toLocaleString()}
                  </p>
                  <p>
                    <b>End:</b>{" "}
                    {lap.lapEnd ? new Date(lap.lapEnd).toLocaleString() : "—"}
                  </p>
                  <p className="text-lg font-bold text-purple-600">
                    ⏱️ {lap.duration || "--:--:--"}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(lap.lapId)}
                  className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {laps.length === 0 && (
            <div className="text-center py-10 text-gray-500">No laps found</div>
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

export default AdminLaps;
