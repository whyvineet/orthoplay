import React, { useEffect, useState } from "react";
import MedalPopup from "./MedalPopup"; 

const GameScore = ({ score, onScoreReset }) => {
  const medals = [
    { score: 100, img: "/bronze-logo.png", alt: "Bronze Medal" },
    { score: 150, img: "/silver-logo.png", alt: "Silver Medal" },
    { score: 200, img: "/golden-logo.png", alt: "Gold Medal" },
  ];

  const progressPercent = Math.min((score / 200) * 100, 100);
  const [showPopup, setShowPopup] = useState(false);
  const [shownMedals, setShownMedals] = useState([]);
  const [currentMedal, setCurrentMedal] = useState(null);


 useEffect(() => {
  const medalToShow = medals.find(
    (medal) =>
      score >= medal.score && score < medal.score + 10 && !shownMedals.includes(medal.score)
  );

  if (medalToShow) {
    setShowPopup(true);
    setShownMedals((prev) => [...prev, medalToShow.score]);
    setCurrentMedal(medalToShow.alt.toLowerCase().split(" ")[0]); // bronze, silver, or gold
  }
}, [score, medals, shownMedals]);



  const handlePopupClose = () => {
    setShowPopup(false);
    if (score >= 200 && onScoreReset) {
      onScoreReset(); // Trigger parent to reset score to 0
    }
  };

  return (
    <div className="mb-6 text-center">
      <div className="relative w-full max-w-md mx-auto mt-4">
        <div className="relative h-6 bg-gray-200 rounded-full flex items-center px-2">
          <div
            className="absolute left-0 top-0 h-6 bg-green-400 rounded-full z-0 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>

          <div
            className="absolute z-10 w-5 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center shadow-md transition-all duration-500 ease-out"
            style={{ left: `calc(${progressPercent}% - 12px)` }}
          >
           <span className="text-white font-bold">✓</span>
          </div>

          {medals.map((medal, index) => {
            const left = (medal.score / 200) * 100;
            return (
              <img
                key={index}
                src={medal.img}
                alt={medal.alt}
                className={`absolute w-8 h-8 z-10 transition-all duration-300 ${
                  score >= medal.score
                    ? "opacity-100"
                    : "opacity-50 grayscale contrast-75"
                }`}
                style={{
                  left: `calc(${left}% - 16px${index === medals.length - 1 ? " - 6px" : ""})`,
                }}
              />
            );
          })}
        </div>
      </div>

      {showPopup && currentMedal && (
    <MedalPopup medal={currentMedal} onClose={handlePopupClose} />
    )}
    </div>
  );
};

export default GameScore;