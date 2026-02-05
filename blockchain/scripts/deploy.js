const hre = require("hardhat");

async function main() {
  console.log("Deploying BlockCertify contract...");

  // Get the contract factory
  const BlockCertify = await hre.ethers.getContractFactory("BlockCertify");
  
  // Deploy the contract
  const blockCertify = await BlockCertify.deploy();
  
  await blockCertify.waitForDeployment();
  
  const address = await blockCertify.getAddress();
  
  console.log("BlockCertify deployed to:", address);
  console.log("\nUpdate your backend/.env file with:");
  console.log(`CONTRACT_ADDRESS=${address}`);
  
  console.log("\nVerify contract on Etherscan:");
  console.log(`npx hardhat verify --network sepolia ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
