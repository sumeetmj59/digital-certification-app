import React, { useEffect, useState, useCallback } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { contractABI, contractAddress } from '../constants/contract';
import certificateBG from '../assets/certificate_bg.jpg'; // ✅ import dummy certificate

const Wallet = () => {
  const [account, setAccount] = useState(null);
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  const fetchNFTs = useCallback(async () => {
    if (!window.ethereum || !account) return;

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const balance = await contract.balanceOf(account);
      const fetchedNFTs = [];

      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const tokenURI = await contract.tokenURI(tokenId);

        const response = await fetch(tokenURI);
        const metadata = await response.json();

        fetchedNFTs.push({
          tokenId: tokenId.toString(),
          uri: tokenURI,
          image: metadata.image || certificateBG, // fallback
          name: metadata.name || "RMIT Certificate",
          description: metadata.description || "Blockchain-verified certificate"
        });
      }

      setNFTs(fetchedNFTs);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (account) fetchNFTs();
  }, [fetchNFTs, account]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🦊 Wallet</h2>
      {account ? (
        <>
          <p><strong>Connected Wallet:</strong><br />{account}</p>
          {loading ? (
            <p>Fetching NFTs...</p>
          ) : (
            <>
              {nfts.length === 0 ? (
                <div>
                  <h3>Your Certificates (Dummy Preview)</h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                      <img src={certificateBG} alt="Dummy Certificate" style={{ width: '100%', maxWidth: '400px' }} />
                      <h4>RMIT Sample Certificate</h4>
                      <p>This is a placeholder NFT shown until your real certificate loads.</p>
                      <a href={certificateBG} target="_blank" rel="noopener noreferrer">View Image</a>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>Your Certificates (NFTs):</h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {nfts.map(nft => (
                      <div key={nft.tokenId} style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                        <img src={nft.image || certificateBG} alt={nft.name} style={{ width: '100%', maxWidth: '200px' }} />
                        <h4>{nft.name}</h4>
                        <p>{nft.description}</p>
                        <a href={nft.uri} target="_blank" rel="noopener noreferrer">View JSON</a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;