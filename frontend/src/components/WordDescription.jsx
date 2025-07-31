import { Info } from "lucide-react";

const WordDescription = ({ description }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Info className="h-5 w-5 mr-2" />
        Word Description
      </h3>
      <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
    </div>
  );
};

export default WordDescription;
