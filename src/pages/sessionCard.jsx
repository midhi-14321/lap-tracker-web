import React from "react";
import { useState } from "react";
const SessionCard = ({ session, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;
    setDeleting(true);
    await onDelete(session.id);
    setDeleting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">Session ID</p>
      <p className="font-mono text-xs break-all mb-2">{session.id}</p>

      <p>
        <b>Start:</b> {new Date(session.startTime).toLocaleString()}
      </p>

      <p>
        <b>End:</b>{" "}
        {session.endTime
          ? new Date(session.endTime).toLocaleString()
          : "Active"}
      </p>

      <p>
        <b>Duration:</b> {session.duration || "--"}
      </p>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default SessionCard;
