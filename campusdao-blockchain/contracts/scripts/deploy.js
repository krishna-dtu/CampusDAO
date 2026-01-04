const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying ClubFundingDAO...\n");

  const [deployer] = await hre.ethers.getSigners();

  console.log(`📍 Deploying with account: ${deployer.address}`);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`💰 Account balance: ${hre.ethers.formatEther(balance)} ETH\n`);

  // Deploy ClubFundingDAO
  const ClubFundingDAO = await hre.ethers.getContractFactory("ClubFundingDAO");
  const dao = await ClubFundingDAO.deploy();

  await dao.waitForDeployment();
  const contractAddress = await dao.getAddress();

  console.log(`✅ ClubFundingDAO deployed successfully!`);
  console.log(`📝 Contract address: ${contractAddress}\n`);

  // Governance parameters
  const govParams = await dao.getGovernanceParams();
  console.log(`⚙️  Governance Parameters:`);
  console.log(`   • Voting Period: ${govParams[0]} blocks`);
  console.log(`   • Quorum Required: ${govParams[1]}%`);
  console.log(`   • Registered Voters: ${govParams[2]}\n`);

  // Treasury info
  const treasuryInfo = await dao.getTreasuryInfo();
  console.log(`💼 Treasury:`);
  console.log(`   • Available: ${hre.ethers.formatEther(treasuryInfo[0])} ETH`);
  console.log(`   • Allocated: ${hre.ethers.formatEther(treasuryInfo[1])} ETH`);
  console.log(`   • Contract Balance: ${hre.ethers.formatEther(treasuryInfo[2])} ETH\n`);

  console.log(`🎉 Deployment complete! Ready for testing and demo.\n`);

  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
