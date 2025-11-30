// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import rmitLogo from '../assets/rmit-logo.png';
import backgroundCert from '../assets/certificate_bg.jpg';
import cert1 from '../assets/blockchain.jpg';
import cert2 from '../assets/ai_certificate.jpg';
import cert3 from '../assets/data_science.jpg';
import cert4 from '../assets/cloud_computing.jpg';
import cert5 from '../assets/web3.jpg';

import Wallet from './Wallet';
import { generateCertificateImage } from '../utils/generateCertificate';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleHelpClick = () => {
    window.open('https://www.rmit.edu.au/students/support', '_blank');
  };

  const handleClaimClick = async (cert) => {
    if (cert.score < 65) {
      alert(`❌ Not eligible for NFT.\nYour score: ${cert.score}%\n Please Re-Attempt the course `);
      return;
    }

    let grade = '';
    if (cert.score >= 85) grade = 'ACE Student';
    else if (cert.score >= 65) grade = 'Distinction';

    const capabilities = cert.score >= 85
      ? ['Innovative problem-solving', 'Leadership & teamwork', 'Critical thinking']
      : ['Analytical skills', 'Communication', 'Digital literacy'];

    const studentName = user?.email?.split('@')[0]?.toUpperCase() || 'STUDENT';

    const certImage = await generateCertificateImage({
      name: studentName,
      grade,
      capabilities,
      backgroundImage: backgroundCert,
    });

    const updatedCert = {
      ...cert,
      grade,
      image: certImage,
      description: `Completed the course and secured ${grade} with a score of ${cert.score}%.`,
    };

    navigate('/claim', { state: { cert: updatedCert } });
  };

  const getUserName = () => {
    const email = user?.email || '';
    return email.startsWith('s') ? email.split('@')[0].toUpperCase() : 'STUDENT';
  };

  const certificates = [
    {
      id: 1,
      name: 'Blockchain Fundamentals',
      duration: '4 weeks',
      completed: true,
      score: 88,
      image: cert1,
    },
    {
      id: 2,
      name: 'Introduction to AI',
      duration: '6 weeks',
      completed: true,
      score: 59,
      image: cert2,
    },
    {
      id: 3,
      name: 'Data Science Essentials',
      duration: '5 weeks',
      completed: true,
      score: 74,
      image: cert3,
    },
    {
      id: 4,
      name: 'Cloud Computing Basics',
      duration: '3 weeks',
      completed: false,
      score: 0,
      image: cert4,
    },
    {
      id: 5,
      name: 'Web3',
      duration: '5 weeks',
      completed: true,
      score: 92,
      image: cert5,
    },
  ];

  return (
    <div className="dashboard">
      <header className="header">
        <img src={rmitLogo} alt="RMIT Logo" className="rmit-logo" />
        <div className="search-bar">
          <input type="text" placeholder="Search certificates..." />
        </div>
        <div className="user-menu">
          <span className="welcome">Welcome, {getUserName()}</span>

          <div className="dropdown">
            <button onClick={() => toggleDropdown('profile')}>Profile ⬇</button>
            {activeDropdown === 'profile' && (
              <div className="dropdown-content">
                <p onClick={() => navigate('/profile')}>Account Details</p>
                <p onClick={() => navigate('/profile/edit')}>Edit Profile</p>
                <p>Student ID: {user?.id || 'N/A'}</p>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button onClick={handleHelpClick}>Help</button>
          </div>

          <div className="dropdown">
            <button onClick={() => toggleDropdown('wallet')}>Wallet ⬇</button>
            {activeDropdown === 'wallet' && (
              <div className="dropdown-content" style={{ padding: '1rem' }}>
                <Wallet />
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="certificates">
        <h2>Certificates</h2>
        <div className="cert-grid">
          {certificates.map(cert => (
            <div className="cert-card" key={cert.id}>
              <img src={cert.image} alt={cert.name} />
              <h3>{cert.name}</h3>
              <p>Duration: {cert.duration}</p>
              <p>Status: {cert.completed ? '✅ Completed' : '🕒 In Progress'}</p>
              <p>Score: {cert.completed ? `${cert.score}%` : 'N/A'}</p>
              <button
                className="mint-btn"
                onClick={() => cert.completed && handleClaimClick(cert)}
                disabled={!cert.completed}
              >
                {cert.completed ? 'Claim NFT' : 'Complete First'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
