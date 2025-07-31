import React, { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";

function Hints({ hints, numberOfHints, setNumberOfHints }) {
  const [hint, setHint] = useState(null);

  useEffect(() => {
    setHint(hints[`hint${numberOfHints}`]);
    console.log(hints);
    console.log(hint);
  }, [numberOfHints, setNumberOfHints, hints]);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Lightbulb className="h-5 w-5 mr-2" />
        {numberOfHints === 0 ? "Need Some Hint ?" : `Hint: ${numberOfHints}`}
      </h3>
      {hint && <p className="text-gray-700 text-lg leading-relaxed">{hint}</p>}

      {numberOfHints < 3 ? (
        <button
          onClick={() => {
            setNumberOfHints((prev) => {
              return prev + 1;
            });
          }}
          className="px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Hint
        </button>
      ) : (
        <p
          className="mt-4 text-gray-500 text-base
         leading-relaxed"
        >
          All hints used
        </p>
      )}
    </div>
  );
}

export default Hints;
