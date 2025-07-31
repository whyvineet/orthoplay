import React from "react";

const MedalPopup = ({ medal, onClose }) => {
  const medalImages = {
    bronze: "/Bronze.png",
    silver: "/Sliver.png",
    gold: "/Golden.png",
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative max-w-xs w-full border border-black-400">
        <img
          src={medalImages[medal]}
          alt={`${medal} medal`}
          className="w-35 h-35 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">🎉 Congratulations! 🎉</h2>
        <p className="text-gray-600 mt-2">You earned a <span className="font-bold capitalize">{medal}</span> medal</p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"> Thank You!
        </button>
      </div>
    </div>
  );
};

export default MedalPopup;
