import React, { useState } from 'react';

const instructions = [
  'Begin Arm Raises. Hold. Relax.',
  'Begin Leg Lifts. Hold. Relax.',
  'Begin Ankle Pumps. Hold. Relax.'
];

const VoiceGuideToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const [current, setCurrent] = useState(0);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utter);
    }
  };

  const handleToggle = () => {
    setEnabled(!enabled);
    if (!enabled) {
      speak(instructions[current]);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const nextInstruction = () => {
    const next = (current + 1) % instructions.length;
    setCurrent(next);
    if (enabled) speak(instructions[next]);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <label>
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        Voice-Guided Mode
      </label>
      <button onClick={nextInstruction} disabled={!enabled} style={{ marginLeft: 8 }}>
        Next Instruction
      </button>
    </div>
  );
};

export default VoiceGuideToggle; 