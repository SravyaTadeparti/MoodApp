import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale
);

const Dashboard = () => {
  const [responses, setResponses] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('moodData'));
    const historyData = JSON.parse(localStorage.getItem('moodHistory')) || [];

    if (data) {
      setResponses(data);
      const newHistory = [...historyData, data];
      setHistory(newHistory);
      localStorage.setItem('moodHistory', JSON.stringify(newHistory));
    }
  }, []);

  if (!responses) {
    return <p className="text-center mt-10">No data found. Please fill the questionnaire first.</p>;
  }

  const moodText = responses.mood.toLowerCase();
const moodScore = moodText.includes('amazing') ? 90 :
                moodText.includes('good') ? 80 :
                moodText.includes('happy') ? 80 :
                moodText.includes('neutral') ? 50 :
                moodText.includes('bad') ? 30 :
                moodText.includes('sad') ? 20 :
                moodText.includes('horrible') ? 10 :
                50; 
  const barData = {
    labels: ['Sleep', 'Appetite', 'Stress (Inverted)', 'Energy', 'Mood'],
    datasets: [{
      label: 'Score',
      data: [
        Number(responses.sleep),
        Number(responses.appetite),
        5 - Number(responses.stress),
        Number(responses.energy),
        moodScore / 20,
      ],
      backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'],
      borderRadius: 10,
    }],
  };

  const doughnutData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{
      data: [moodScore, Number(responses.stress) * 10, 100 - moodScore - Number(responses.stress) * 10],
      backgroundColor: ['#10B981', '#EF4444', '#6B7280'],
      cutout: '70%',
    }],
  };

  const moodHistory = history.map(entry => {
    const text = entry.mood.toLowerCase();
    if (text.includes('happy')) return 80;
    if (text.includes('sad')) return 20;
    if (text.includes('good')) return 60;
    if (text.includes('bad')) return 30;
    if (text.includes('amazing')) return 100;
    if (text.includes('horrible')) return 0;

    return 50;
  });

  const lineData = {
    labels: history.map((_, index) => `Entry ${index + 1}`),
    datasets: [{
      label: 'Mood Over Time',
      data: moodHistory,
      fill: false,
      borderColor: '#8B5CF6',
      backgroundColor: '#8B5CF6',
      tension: 0.3,
    }],
  };

  const radarData = {
    labels: ['Stress', 'Energy'],
    datasets: [{
      label: 'Current State',
      data: [Number(responses.stress), Number(responses.energy)],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
      pointBackgroundColor: '#3B82F6',
    }],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-header">Mood Chart Analyzer</h1>
        <p className="dashboard-subtext">Your Mental & Emotional Snapshot Based on Responses</p>

        <div className="summary-table">
          <h2>Your Responses Summary</h2>
          <table>
            <tbody>
              <tr><td>Sleep Quality:</td><td>{responses.sleep}/5</td></tr>
              <tr><td>Appetite Level:</td><td>{responses.appetite}/5</td></tr>
              <tr><td>Mood:</td><td>{responses.mood}</td></tr>
              <tr><td>Stress Level:</td><td>{responses.stress}/5</td></tr>
              <tr><td>Energy Level:</td><td>{responses.energy}/5</td></tr>
            </tbody>
          </table>
        </div>

        <div className="charts-grid">
          <div className="chart-box">
            <h2>Physical & Emotional Health</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="chart-box">
            <h2>Mood Snapshot</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="chart-box">
            <h2>Mood Over Time</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="chart-box">
            <h2>Stress vs Energy</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <Radar data={radarData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="insights-grid" style={{ marginTop: '2rem' }}>
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
              <li>Maintain your current sleep schedule.</li>
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
