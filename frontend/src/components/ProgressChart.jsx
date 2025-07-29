import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProgressChart = ({ progressData }) => {
  // progressData: [{ date: '2024-06-01', completed: 3 }, ...]
  const data = {
    labels: progressData.map(item => item.date),
    datasets: [
      {
        label: 'Exercises Completed',
        data: progressData.map(item => item.completed),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, stepSize: 1 },
    },
  };
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h3>Weekly Progress</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart; 