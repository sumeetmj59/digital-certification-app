import React from 'react';
import './Dashboard.css';

import cert1 from '../assets/blockchain.jpg';
import cert2 from '../assets/ai_certificate.jpg';
import cert3 from '../assets/data_science.jpg';
import cert4 from '../assets/cloud_computing.jpg';
import cert5 from '../assets/web3.jpg';
import rmitLogo from '../assets/rmit-logo.png';

const Dashboard = ({ user }) => {
  const studentId = user?.email?.split('@')[0] || 'Student';

  const certificates = [
    {
      id: 1,
      name: 'Blockchain Fundamentals',
      duration: '4 weeks',
      completed: true,
      image: cert1,
    },
    {
      id: 2,
      name: 'Introduction to AI',
      duration: '6 weeks',
      completed: false,
      image: cert2,
    },
    {
      id: 3,
      name: 'Data Science Essentials',
      duration: '5 weeks',
      completed: true,
      image: cert3,
    },
    {
      id: 4,
      name: 'Cloud Computing Basics',
      duration: '3 weeks',
      completed: false,
      image: cert4,
    },
    {
      id: 5,
      name: 'Web3',
      duration: '5 weeks',
      completed: false,
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
          <span className="welcome">Welcome, {studentId}</span>

          <div className="dropdown">
            <button>Profile ⬇</button>
            <div className="dropdown-content">
              <p>Account Details</p>
              <p>Edit Profile</p>
              <p>Student ID: {studentId}</p>
            </div>
          </div>

          <div className="dropdown">
            <button onClick={() => window.open("https://www.rmit.edu.au/students/support-services/student-connect", "_blank")}>
              Help ⬇
            </button>
            <div className="dropdown-content">
              <p>Student Connect</p>
              <p>Contact Support</p>
              <p>Guide</p>
            </div>
          </div>

          <div className="dropdown">
            <button>Wallet ⬇</button>
            <div className="dropdown-content">
              <p>Your NFTs</p>
              <p>Connect Wallet</p>
            </div>
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
              <button className="mint-btn">
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