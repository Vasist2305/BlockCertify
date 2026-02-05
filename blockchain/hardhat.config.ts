import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable, defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
require('dotenv').config();

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: process.env.INFURA_API_KEY 
        ? `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
        : configVariable("SEPOLIA_RPC_URL"),
      accounts: process.env.PRIVATE_KEY 
        ? [process.env.PRIVATE_KEY]
        : [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
});
