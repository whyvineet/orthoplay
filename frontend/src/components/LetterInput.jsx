const LetterInput = ({ value, onChange, index, feedback, isActive, maxLength }) => {
    const handleChange = (e) => {
        const newValue = e.target.value.toUpperCase();
        if (newValue.length <= 1 && /^[A-Z]*$/.test(newValue)) {
            onChange(index, newValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && !value && index > 0) {
            const prevInput = e.target.previousElementSibling;
            if (prevInput) {
                prevInput.focus();
            }
        } else if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key) && value && index < maxLength - 1) {
            const nextInput = e.target.nextElementSibling;
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const getBackgroundColor = () => {
        if (!feedback) return 'bg-white';
        switch (feedback) {
            case 'correct':
                return 'bg-green-100 border-green-500';
            case 'partial':
                return 'bg-yellow-100 border-yellow-500';
            case 'incorrect':
                return 'bg-gray-100 border-gray-400';
            default:
                return 'bg-white';
        }
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg text-center font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${getBackgroundColor()} ${isActive ? 'ring-2 ring-blue-500' : ''}`}
            maxLength={1}
            autoFocus={index === 0}
        />
    );
};

export default LetterInput;
