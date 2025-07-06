import { Lightbulb } from 'lucide-react';

const WordDescription = ({ description }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-4 py-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Word Description
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{description}</p>
        </div>
    );
};

export default WordDescription;
