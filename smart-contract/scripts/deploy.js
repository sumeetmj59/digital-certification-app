const hre = require("hardhat");

async function main() {
  const CertificateNFT = await hre.ethers.getContractFactory("CertificateNFT");
  const contract = await CertificateNFT.deploy();

  // Fix: wait for deployment to complete
  await contract.waitForDeployment();

  console.log("✅ Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});