import React, { useState } from 'react';
import exerciseLibrary from '../data/exercise_library.json';

const plans = {
  'ACL Surgery': ['Quad Sets', 'Heel Slides', 'Straight Leg Raise', 'Ankle Pumps', 'Seated Knee Flexion'],
  'Frozen Shoulder': ['Pendulum', 'Towel Stretch', 'Finger Walk', 'Cross-Body Reach', 'Armpit Stretch'],
};

const PlanGenerator = () => {
  const [goal, setGoal] = useState('ACL Surgery');
  const [plan, setPlan] = useState([]);

  const generatePlan = () => {
    const exercises = plans[goal] || Object.keys(exerciseLibrary);
    setPlan(exercises.map(name => exerciseLibrary[name]));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h3>Personalized Exercise Plan Generator</h3>
      <label>
        Select Recovery Goal:
        <select value={goal} onChange={e => setGoal(e.target.value)}>
          <option value="ACL Surgery">Post ACL Surgery Rehab</option>
          <option value="Frozen Shoulder">Frozen Shoulder Recovery</option>
        </select>
      </label>
      <button onClick={generatePlan} style={{ marginLeft: 8 }}>Generate Plan</button>
      {plan.length > 0 && (
        <ul>
          {plan.map((ex, idx) => (
            <li key={idx}><b>{ex.name}</b>: {ex.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlanGenerator; 