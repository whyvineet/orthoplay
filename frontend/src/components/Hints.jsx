import React, { useState, useEffect, useContext } from "react";
import { Lightbulb } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

function Hints({ hints, numberOfHints, setNumberOfHints, trackHintUsage }) {
  const [hint, setHint] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (numberOfHints === 0) {
      setHint(null); // No hint to display when numberOfHints is 0
    } else {
      setHint(hints[`hint${numberOfHints}`]);
    }
    console.log(hints);
    console.log(hint);
  }, [numberOfHints, setNumberOfHints, hints, hint]);

  return (
    <div className={`rounded-3xl shadow-lg p-8 ${
      darkMode 
        ? "bg-gray-800 border border-gray-700" 
        : "bg-white border border-gray-100"
    }`}>
      <h3 className={`text-xl font-bold mb-4 flex items-center ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}>
        <Lightbulb className={`h-5 w-5 mr-2 ${
          darkMode ? "text-yellow-400" : "text-yellow-500"
        }`} />
        {numberOfHints === 0 ? "Need Some Hint ?" : `Hint: ${numberOfHints}`}
      </h3>
      
      {hint && (
        <p className={`text-lg leading-relaxed ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          {hint}
        </p>
      )}

      {numberOfHints < 3 ? (
        <button
          onClick={() => {
            setNumberOfHints((prev) => {
              const newCount = prev + 1;
              // Track hint usage in backend
              if (trackHintUsage) {
                trackHintUsage();
              }
              return newCount;
            });
          }}
          className={`px-6 py-3 mt-4 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
            darkMode 
              ? "bg-blue-700 hover:bg-blue-600" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Hint
        </button>
      ) : (
        <p className={`mt-4 text-base leading-relaxed ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          All hints used
        </p>
      )}
    </div>
  );
}

export default Hints;