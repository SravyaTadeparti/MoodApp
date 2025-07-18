import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // State for login/signup form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login
  const handleLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/questionnaire');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/questionnaire');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google sign-in
  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/questionnaire');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to MoodMate 🌈</h1>
      <p>Track your emotions & understand yourself better!</p>
      <div>
        <span style={{ fontSize: '2rem' }}>😊 😢 😡 😍 😴</span>
      </div>
      <br />

      <div style={{ maxWidth: '400px', margin: 'auto', background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Login / Signup</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Sign Up
        </button>

        <button
          onClick={handleGoogleLogin}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Sign In with Google
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default LandingPage;