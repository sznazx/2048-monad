require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.28",
      },
    ],
  },
  networks: {
    monadTestnet: {
      url: process.env.MONAD_TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
