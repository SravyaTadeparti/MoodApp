import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';   // Create this component
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuestionnairePage from './Questionnaire';
import LandingPage from './LandingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/landingpage" element={<LandingPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
