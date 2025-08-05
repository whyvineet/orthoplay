import { Info } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const WordDescription = ({ description }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`rounded-3xl shadow-lg p-8 ${
      darkMode 
        ? "bg-gray-800 border border-gray-700" 
        : "bg-white border border-gray-100"
    }`}>
      <h3 className={`text-xl font-bold mb-4 flex items-center ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}>
        <Info className={`h-5 w-5 mr-2 ${
          darkMode ? "text-indigo-400" : "text-indigo-600"
        }`} />
        Word Description
      </h3>
      <p className={`text-lg leading-relaxed ${
        darkMode ? "text-gray-300" : "text-gray-700"
      }`}>
        {description}
      </p>
    </div>
  );
};

export default WordDescription;