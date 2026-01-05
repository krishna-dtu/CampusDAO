# CampusDAO

CampusDAO is a lightweight on-chain governance and funding platform for college clubs. It demonstrates a Hardhat Solidity contract (`ClubFundingDAO`) integrated with a React frontend, using ethers.js for wallet/connectivity and local Hardhat development.

## Features

- Create and manage funding proposals
- On-chain voting with simple yes/no votes
- Treasury management and fund withdrawals
- Event-driven UI updates (contract events refresh data)
- Local development with Hardhat and MetaMask

## Tech Stack

- Smart Contracts: Solidity (Hardhat)
- Frontend: React
- Web3 library: ethers.js (v6)
- Local chain: Hardhat (chainId: 31337)

## Prerequisites

- Node.js >= 18
- npm or yarn
- MetaMask (configured to point to the local Hardhat RPC)

## Repository Layout

- `campusdao-blockchain/` — Hardhat project, contracts, deploy scripts, tests
- `frontend/` — React app (web UI, hooks, components)
- `README.md` — this file

## Quick Start (local development)

1) Start a Hardhat node (local chain):

```bash
cd campusdao-blockchain
npx hardhat node
```

2) Deploy the contract to the running local node (in a new terminal):

```bash
cd campusdao-blockchain
npx hardhat run --network localhost contracts/scripts/deploy.js
```

Copy the deployed contract address printed by the deploy script.

Note: When deploying to a local network the deploy script will attempt to detect your React frontend and write `REACT_APP_CONTRACT_ADDRESS` into its `.env` file automatically. The script logs the path it wrote to. If it cannot find a frontend directory it will print a warning and you can run the `seed` script or manually set the `REACT_APP_CONTRACT_ADDRESS` in your frontend `.env`.

3) Configure the frontend environment:

Create a `.env` file inside the `frontend/` directory with the following contents:

```
REACT_APP_CONTRACT_ADDRESS=0xYourDeployedContractAddressHere
```

Also ensure MetaMask is connected to `http://127.0.0.1:8545` (the Hardhat node) and using an account that matches one of the Hardhat accounts.

4) Install and start the frontend:

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser, connect MetaMask via the Wallet modal, then create proposals and vote.

5) (Recommended) Seed local demo data (fund treasury, register voters, create a demo proposal):

```bash
# from the project root (or adjust path)
cd campusdao-blockchain
npx hardhat run --network localhost contracts/scripts/seed.js
```

## Environment variables

- `REACT_APP_CONTRACT_ADDRESS` — deployed `ClubFundingDAO` address used by the frontend.

If this is not set the frontend will fail to instantiate the contract.

## Contracts & ABI

The frontend imports a local ABI file at `frontend/src/lib/ClubFundingDAO.abi.json`. For production or canonical artifacts you can replace that file with the ABI from Hardhat's artifacts (the JSON `abi` field from `artifacts/contracts/ClubFundingDAO.sol/ClubFundingDAO.json`).

## Common Developer Tasks

- Run unit tests (Hardhat):

```bash
cd campusdao-blockchain
npm install
npx hardhat test
```

- Lint and format (frontend):

```bash
cd frontend
npm run lint
npm run format
```

## Notes / Troubleshooting

- Chain/network: The frontend expects the local chain (Hardhat) on RPC `http://127.0.0.1:8545` and chainId `31337`. If MetaMask is on a different network the Web3 context attempts a network switch, but switching to custom local networks may require manual configuration.
- Contract address: Make sure `REACT_APP_CONTRACT_ADDRESS` points to the deployed contract. If you redeploy, update the `.env` and restart the frontend.
- Voter registration: Depending on contract access controls, some actions (voting, proposing) may require registered club accounts — use the Hardhat deploy script or console to set up initial state.

## Deployment

For production deployments use a public network (e.g., Goerli/Mainnet) and real RPC provider (Alchemy/Infura). Steps:

1. Update Hardhat config with a network configuration and private key.
2. Deploy with `npx hardhat run --network <network> scripts/deploy.js`.
3. Update `REACT_APP_CONTRACT_ADDRESS` in the production frontend environment.

## Contributing

Contributions welcome. Please open issues or PRs for bug reports, feature requests, and improvements.

## License

This project is provided as-is for demonstration and educational use.

