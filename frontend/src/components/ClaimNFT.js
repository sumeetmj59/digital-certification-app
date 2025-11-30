// src/components/ClaimNFT.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import './ClaimNFT.css';
import { contractABI, contractAddress } from '../constants/contract';

const ClaimNFT = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cert } = location.state || {};

  const [minted, setMinted] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => {
    try {
      if (!window.ethereum) {
        alert("🦊 Please install MetaMask to continue.");
        return;
      }

      setLoading(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tokenURI = "https://gateway.pinata.cloud/ipfs/QmbuSY25go2kC9wQFbR4zQKY3XrkzBgxnhYqNU8eWBz2Yt";
      const tx = await contract.mintCertificate(address, tokenURI);

      await tx.wait();
      setTxHash(tx.hash);
      setMinted(true);
    } catch (error) {
      alert("❌ Minting failed: " + (error.reason || error.message));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = cert.image;
    link.download = `${cert.name.replace(/\s/g, '_')}_certificate.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goToWallet = () => {
    navigate('/wallet');
  };

  if (!cert) {
    return (
      <div className="claim-container">
        <h2>❌ No certificate data found</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="claim-container">
      <h2>🎓 {cert.name}</h2>
      <img src={cert.image} alt={cert.name} className="nft-preview" />
      <p><strong>Duration:</strong> {cert.duration}</p>
      <p><strong>Score:</strong> {cert.score}%</p>
      {cert.grade && <p><strong>Grade:</strong> {cert.grade}</p>}
      {cert.description && <p><em>{cert.description}</em></p>}

      {!minted ? (
        <button onClick={mintNFT} className="mint-button" disabled={loading}>
          {loading ? (
            <span className="spinner-text">
              <span className="spinner" /> Minting your NFT...
            </span>
          ) : (
            "Mint NFT"
          )}
        </button>
      ) : (
        <div className="mint-success">
          <p>🎉 Your certificate NFT has been minted successfully!</p>
          <p>💼 It is stored securely in your wallet.</p>
          <p><strong>Tx Hash:</strong> <a href={`https://explorer.chiadochain.net/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash}</a></p>
          <button onClick={downloadImage} className="mint-button">⬇ Download Certificate</button>
          <button onClick={goToWallet} className="mint-button">🔗 View NFT in Wallet</button>
        </div>
      )}

      <br />
      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
};

export default ClaimNFT;