const LetterInput = ({ value, onChange, index, feedback, isActive, maxLength }) => {
    const handleChange = (e) => {
        const newValue = e.target.value.toUpperCase();
        if (newValue.length <= 1 && /^[A-Z]*$/.test(newValue)) {
            onChange(index, newValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && !value && index > 0) {
            // Move focus to previous input when backspacing on empty field
            const prevInput = e.target.previousElementSibling;
            if (prevInput) {
                prevInput.focus();
            }
        } else if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key) && value && index < maxLength - 1) {
            // Move focus to next input when typing on filled field
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
            className={`w-12 h-12 text-center text-lg font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${getBackgroundColor()} ${isActive ? 'ring-2 ring-blue-500' : ''
                }`}
            maxLength={1}
            autoFocus={index === 0}
        />
    );
};

export default LetterInput;
