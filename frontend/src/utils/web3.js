// src/utils/web3.js
import Web3 from "web3";
import { contractABI } from "../CertificateNFT.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

let web3;
let certificateContract;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
    certificateContract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("Connected account:", accounts[0]);
  });
} else {
  alert("Please install MetaMask to use this app.");
}

export { web3, certificateContract };