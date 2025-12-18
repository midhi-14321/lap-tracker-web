
import React from 'react'

const StatusCard = ({ title, active, startTime }) => (
  <div
    className={`rounded-xl p-4 border${
      active ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"
    }`}
  >
    <h3 className="font-semibold text-lg mb-1">{title}</h3>
    <p className="text-sm">
      Status:{" "}
      <span className={active ? "text-green-600" : "text-gray-500"}>
        {active ? "Active" : "Inactive"}
      </span>
    </p>
    {active && (
      <p className="text-xs mt-1 text-gray-600">
        Started at: {new Date(startTime).toLocaleString()}
      </p>
    )}
  </div>
);

export default StatusCard;
