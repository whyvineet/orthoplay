import React from "react";

const DifficultyPopup = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs text-center relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Select Difficulty</h2>
        <div className="flex flex-col gap-4 mb-4  ">
          <button
            className="px-6 py-3 bg-green-500 ring-2  text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
            onClick={() => onSelect("easy")}
          >
            Easy
          </button>
          <button
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-all"
            onClick={() => onSelect("medium")}
          >
            Medium
          </button>
          <button
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
            onClick={() => onSelect("hard")}
          >
            Hard
          </button>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DifficultyPopup;
