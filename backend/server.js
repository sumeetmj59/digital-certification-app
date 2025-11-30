// Load dependencies
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

console.log("🚀 Starting server..."); // Debug line

const app = express();
app.use(cors());
app.use(express.json());

// Load ABI
let abi;
try {
  const fullContractJson = JSON.parse(fs.readFileSync('./CertificateNFT.json'));
  abi = fullContractJson.abi; // ← use `abi = ...` instead of `const abi = ...`
} catch (err) {
  console.error("❌ Failed to read ABI:", err.message);
  process.exit(1);
}

// Setup blockchain connection
let contract;
try {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);;
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);
} catch (err) {
  console.error("❌ Failed to connect to blockchain:", err.message);
  process.exit(1);
}

// Mint endpoint
app.post("/mint", async (req, res) => {
  const { recipient, tokenURI } = req.body;
  try {
    const tx = await contract.mintCertificate(recipient, tokenURI);
    await tx.wait();
    res.send({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});