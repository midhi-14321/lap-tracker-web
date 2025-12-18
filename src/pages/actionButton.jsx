import React from "react";

const ActionButton = ({ label, color, disabled, onClick }) => {
  const colors = {
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    blue: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3 rounded-xl text-white font-semibold transition cursor-pointer
        ${colors[color]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {label}
    </button>
  );
};

export default ActionButton;
