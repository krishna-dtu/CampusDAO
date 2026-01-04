const hre = require('hardhat')
const { getFrontendEnvPath } = require('./utils')
const fs = require('fs')

async function main() {
  console.log('🧪 Running local seed script for CampusDAO...')

  // Determine contract address: prefer CONTRACT_ADDRESS env, then frontend .env
  let contractAddress = process.env.CONTRACT_ADDRESS
  try {
    const envPath = getFrontendEnvPath()
    if (!contractAddress && envPath && fs.existsSync(envPath)) {
      const env = fs.readFileSync(envPath, 'utf8')
      const match = env.match(/REACT_APP_CONTRACT_ADDRESS=(.*)/)
      if (match) contractAddress = match[1].trim()
    }
  } catch (e) {
    // ignore
  }

  if (!contractAddress) {
    throw new Error('Contract address not provided. Set CONTRACT_ADDRESS or ensure frontend .env contains REACT_APP_CONTRACT_ADDRESS')
  }

  // Ensure running against a local network
  const networkName = hre.network?.name || ''
  const isLocal = networkName === 'localhost' || networkName === 'hardhat' || (hre.network.config && String(hre.network.config.url || '').includes('127.0.0.1'))
  if (!isLocal) {
    console.warn('⚠️  Seed script should only be run on a local network. Aborting.')
    return
  }

  const [deployer, alice, bob, charlie] = await hre.ethers.getSigners()
  console.log('Using deployer:', deployer.address)

  const dao = await hre.ethers.getContractAt('ClubFundingDAO', contractAddress)

  // Fund the treasury with 10 ETH from deployer
  const fundAmount = hre.ethers.parseEther('10')
  console.log(`Funding contract ${contractAddress} with ${hre.ethers.formatEther(fundAmount)} ETH...`)
  const txFund = await dao.connect(deployer).fundTreasury({ value: fundAmount })
  await txFund.wait()
  console.log('Treasury funded.')

  // Register a few demo voters (admin-only)
  const voters = [alice.address, bob.address, charlie.address]
  console.log('Registering demo voters:', voters)
  try {
    const tx = await dao.connect(deployer).registerVotersBatch(voters)
    await tx.wait()
    console.log('Voters registered.')
  } catch (e) {
    console.warn('Register voters failed (maybe already registered):', e.message)
  }

  // Create a demo proposal (created by deployer for simplicity)
  const demoAmount = hre.ethers.parseEther('1')
  const longDesc = 'Demo proposal: Buy supplies and run a campus event. '.repeat(8)
  console.log('Creating demo proposal...')
  try {
    const tx = await dao.connect(deployer).createProposal(
      'Demo Club',
      'Welcome Event Funding',
      longDesc,
      demoAmount,
      alice.address
    )
    await tx.wait()
    console.log('Demo proposal created.')
  } catch (e) {
    console.error('Failed to create demo proposal:', e.message)
  }

  // Print treasury info
  const treasury = await dao.getTreasuryInfo()
  console.log(`Treasury available: ${hre.ethers.formatEther(treasury[0])} ETH, allocated: ${hre.ethers.formatEther(treasury[1])} ETH`)

  console.log('✅ Seed complete.')
}

main().catch((err) => {
  console.error('Seed script failed:', err)
  process.exit(1)
})
