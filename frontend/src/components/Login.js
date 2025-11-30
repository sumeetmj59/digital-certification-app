import React, { useState } from 'react';
import './Login.css';
import rmitLogo from '../assets/rmit-logo.png';
import rmitCampus from '../assets/rmit-campus.jpg';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.endsWith('@student.rmit.edu.au') || password.length === 0) {
      setError('❌ Please enter a valid RMIT student email and password.');
      return;
    }
    onLogin({ email });
  };

  return (
    <div className="login-container" style={{
      backgroundImage: `url(${rmitCampus})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="login-box" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '350px'
      }}>
        <img src={rmitLogo} alt="RMIT Logo" style={{ width: '140px', display: 'block', margin: '0 auto 20px' }} />
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#a20000' }}>RMIT Certificate Portal</h2>
        <input
          type="email"
          placeholder="RMIT Email (e.g. s4072286@student.rmit.edu.au)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Student ID (e.g. s4072286)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleLogin} style={buttonStyle}>Login</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '14px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#a20000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default Login;