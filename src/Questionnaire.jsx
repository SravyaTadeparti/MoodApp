import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';


const QuestionnairePage = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({
    sleep: '',
    appetite: '',
    mood: '',
    stress: '',
    energy: '',
  });

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    localStorage.setItem('moodData', JSON.stringify(responses));
    navigate('/dashboard');
  };

  
  const handleClose = () => {
    navigate('/dashboard');
  };


  return (
    <div className = "questionnaire-page">
        <div className="questionnaire-container">

              <div className="close-button-container">
                <button className="close-button" onClick={handleClose}>×</button>
            </div>


            <h2>How do you feel today?</h2>

            <label>1. How did you sleep last night?</label><br />
            <input name="sleep" value={responses.sleep} onChange={handleChange} /><br /><br />

            <label>2. How is your appetite today?</label><br />
            <input name="appetite" value={responses.appetite} onChange={handleChange} /><br /><br />

            <label>3. How would you describe your mood?</label><br />
            <input name="mood" value={responses.mood} onChange={handleChange} /><br /><br />

            <label>4. How stressed do you feel (1-5)?</label><br />
            <input name="stress" value={responses.stress} onChange={handleChange} /><br /><br />

            <label>5. How energetic are you (1-5)?</label><br />
            <input name="energy" value={responses.energy} onChange={handleChange} /><br /><br />

            <button className = "submit-button"onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
};

export default QuestionnairePage;