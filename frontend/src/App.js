import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClaimNFT from './components/ClaimNFT';
import Wallet from './components/Wallet'; // ✅ assuming you have Wallet.js

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="*" element={<Login onLogin={setUser} />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/claim" element={<ClaimNFT user={user} />} />
            <Route path="/wallet" element={<Wallet user={user} />} /> {/* ✅ Wallet route */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;