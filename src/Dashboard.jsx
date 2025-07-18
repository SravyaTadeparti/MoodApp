import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Example: Fetch from backend API
    fetch('https://your-backend.com/api/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error('Failed to fetch analytics:', err));
  }, []);

  if (!analytics) {
    return <p>Loading analytics...</p>;
  }

  const sleepData = {
    labels: analytics.dates,          // e.g., ['Day 1', 'Day 2', ...]
    datasets: [
      {
        label: 'Sleep Quality',
        data: analytics.sleepScores,  // e.g., [3, 4, 5, 2, 4]
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const moodData = {
    labels: analytics.dates,
    datasets: [
      {
        label: 'Mood Levels',
        data: analytics.moodScores,
        backgroundColor: 'purple',
      },
    ],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Mood Analytics</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Sleep Quality Over Time</h3>
        <Line data={sleepData} />
      </div>

      <div>
        <h3>Mood Levels Over Time</h3>
        <Bar data={moodData} />
      </div>
    </div>
  );
};

export default Dashboard;
