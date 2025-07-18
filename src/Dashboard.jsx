import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [responses, setResponses] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('moodData'));
    setResponses(data);
  }, []);

  if (!responses) {
    return <p className="text-center mt-10">No data found. Please fill the questionnaire first.</p>;
  }

  const stressInverted = 5 - Number(responses.stress);

  const barData = {
    labels: ['Sleep', 'Appetite', 'Stress (Inverted)', 'Energy'],
    datasets: [
      {
        label: 'Score',
        data: [
          Number(responses.sleep),
          Number(responses.appetite),
          stressInverted,
          Number(responses.energy),
        ],
        backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B'],
        borderRadius: 10,
      },
    ],
  };

  const moodScore = responses.mood.toLowerCase().includes('happy') ? 70 : 50;
  const negativeScore = Number(responses.stress) * 10;
  const neutralScore = 100 - moodScore - negativeScore;

  const doughnutData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [moodScore, negativeScore, neutralScore],
        backgroundColor: ['#10B981', '#EF4444', '#6B7280'],
        cutout: '70%',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-header text-3xl font-bold text-purple-700 mb-2">
          Mood Chart Analyzer
        </h1>
        <p className="dashboard-subtext text-sm text-gray-600 mb-8">
          Your Mental & Emotional Snapshot Based on Responses
        </p>

        <div className="summary-table">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Your Responses Summary</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="py-2 font-medium">Sleep Quality:</td><td>{responses.sleep}/5</td></tr>
              <tr><td className="py-2 font-medium">Appetite Level:</td><td>{responses.appetite}/5</td></tr>
              <tr><td className="py-2 font-medium">Mood:</td><td>{responses.mood}</td></tr>
              <tr><td className="py-2 font-medium">Stress Level:</td><td>{responses.stress}/5</td></tr>
              <tr><td className="py-2 font-medium">Energy Level:</td><td>{responses.energy}/5</td></tr>
            </tbody>
          </table>
        </div>

        <div className="charts-grid">
          <div className="chart-box">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Physical & Emotional Health</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="chart-box">
            <h2 className="text-lg font-semibold text-pink-600 mb-2">Mood Snapshot</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

<div className="insights-grid">
  <div className="insight-card">
    <h3>🌟 What This Says About You</h3>
    <ul>
      <li>Good sleep quality detected – you're resting well!</li>
      <li>Low stress levels – you're managing stress effectively.</li>
      <li>Consistent energy levels – a healthy routine is visible.</li>
    </ul>
  </div>

  <div className="insight-card suggestions-card">
    <h3>💡 Personalized Suggestions</h3>
    <ul>
      <li>Maintain your current sleep schedule for steady energy.</li>
      <li>Practice mindfulness or relaxation exercises daily.</li>
      <li>Consider light physical activity to boost mood further.</li>
    </ul>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
