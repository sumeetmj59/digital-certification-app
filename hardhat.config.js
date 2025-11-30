require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    chiado: {
      url: "https://rpc.chiadochain.net",
      chainId: 10200,
      accounts: ["9da68555b25af9533d8c81cc84e7aedc1f523ba556318b559720c6a04fc117b1"]
    }
  }
};