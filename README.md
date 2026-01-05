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

# CampusDAO — Technical README

This file provides developer-focused documentation for CampusDAO: architecture, contract surface, local dev flows, debugging tips, and integration notes for running and extending the prototype.

## TL;DR

- Project: CampusDAO — on-chain governance and funding for campus clubs
- Smart contract: `ClubFundingDAO` (Solidity, Hardhat)
- Frontend: React + ethers.js v6 (uses `BrowserProvider`); ABI at `frontend/src/lib/ClubFundingDAO.abi.json`
- Local dev: Hardhat node at `http://127.0.0.1:8545` (chainId `31337`)

## Architecture

- Smart contract layer: `campusdao-blockchain/contracts/ClubFundingDAO.sol` — single contract managing proposals, voting, and treasury operations. Main primitives:
	- `struct Proposal { id, clubName, title, description, requestedAmount, clubAddress, createdAtBlock, votingStartBlock, votingEndBlock, yesVotes, noVotes, totalVoters, state, fundsReleased }`
	- `createProposal`, `vote`, `finalizeProposal`, `withdrawFunds`, `fundTreasury`, `getProposal`, `proposalCount`, `getVoteCounts`, `hasUserVoted` (see ABI for full signatures and event definitions)

- Frontend: React app under `frontend/` that uses a `Web3Context` for provider/signers and a `useContractInteraction` hook to encapsulate contract calls and event handling. UI pages of interest: `Landing`, `Proposals`, `ProposalDetail`, `SubmitProposal`, `Dashboard`.

## Contract Surface (quick reference)

- View functions (read-only): `getProposal(uint256)`, `proposalCount()`, `getVoteCounts(uint256)`, `hasUserVoted(uint256,address)`, `getTreasuryInfo()`
- Transactions (write): `createProposal(string,string,string,uint256,address)`, `vote(uint256,bool)`, `finalizeProposal(uint256)`, `withdrawFunds(uint256)`, `fundTreasury()`
- Events: `ProposalCreated`, `VoteCast`, `ProposalApproved`, `ProposalRejected`, `FundsReleased`, `TreasuryFunded`

Consult `frontend/src/lib/ClubFundingDAO.abi.json` for exact ABI shapes and `campusdao-blockchain/artifacts/contracts/ClubFundingDAO.sol/ClubFundingDAO.json` for artifact metadata.

## Local Development (step-by-step, reproducible)

1) Install dependencies

```bash
# from repo root
cd campusdao-blockchain
npm install
cd ../frontend
npm install
```

2) Run a Hardhat local node (terminal A)

```bash
cd campusdao-blockchain
npx hardhat node
```

This prints funded accounts with private keys. Keep it running.

3) Deploy contracts to the running local node (terminal B)

```bash
cd campusdao-blockchain
npx hardhat run --network localhost contracts/scripts/deploy.js
```

The deploy script prints the deployed address and attempts to write `REACT_APP_CONTRACT_ADDRESS` into the frontend `.env`. If it cannot locate the frontend directory, the script logs a warning and prints the address for manual copying.

4) Wire frontend and start (terminal C)

```bash
cd frontend
# create .env with the deployed address if the deploy script didn't write it
echo "REACT_APP_CONTRACT_ADDRESS=0x<DEPLOYED_ADDRESS>" > .env
npm start
```

Open `http://localhost:3000` and connect MetaMask to RPC `http://127.0.0.1:8545` (chainId 31337). Use one of the Hardhat accounts.

## Running Tests & CI

- Run the Solidity unit tests

```bash
cd campusdao-blockchain
npx hardhat test
```

- Build/compile contracts

```bash
npx hardhat compile
```

## Frontend Developer Notes

- Web3 context: `frontend/src/contexts/Web3Context.jsx` manages provider vs signer, account normalization, chain handling, and auto-connect. Key exported hook: `useWeb3()`.
- Contract interaction: `frontend/src/hooks/useContractInteraction.js` exposes `readContract` (provider-backed), `writeContract` (signer-backed) and high-level helpers: `createProposal()`, `vote()`, `finalizeProposal()`, `withdrawFunds()`, `fetchProposal()`, `fetchAllProposals()`, `hasUserVoted()`.
- ABI & helpers: Keep `frontend/src/lib/ClubFundingDAO.abi.json` in sync with compiled artifacts; `frontend/src/lib/contract.js` wraps `getContract(providerOrSigner)`.

Ethers v6 specifics used by this project:
- `BrowserProvider(window.ethereum)` returns an Ethers v6 provider. `getSigner()` is async and returns a signer instance for writes.
- Formatting helpers like `formatEther` are imported from `ethers` namespace where applicable.

## Debugging Guide

- "Contract not available": confirm `REACT_APP_CONTRACT_ADDRESS` is set and Hardhat node is running.
- MetaMask chain mismatch: the code requests `wallet_switchEthereumChain`; for local chains you may need to add the network manually with chainId `0x7A69` (hex 31337).
- Event subscriptions: `useContractInteraction` subscribes to on-chain events; if you see duplicate events, ensure you're not instantiating multiple readContract instances or mounting hooks multiple times.
- Common runtime crash: calling `.charAt()` on undefined when `status` is missing — map numeric `state` → string before using string helpers (the UI includes a `stateLabel` mapping in `ProposalDetail` / `Dashboard`).

## Limitations & Security

- No on-chain 'deleteProposal' exists in the current ABI; UI-level hide/remove is implemented client-side only (localStorage). Deleting proposals on-chain would require a contract change + governance for removal.
- This repository is a demo; a production release should include:
	- formal audits
	- off-chain indexing (The Graph) for performant querying
	- rate-limits and anti-spam governance (proposal thresholds)
	- proper error handling and user feedback around failed transactions

## Extensibility Ideas

- Token-weighted voting (ERC-20), delegation, or quadratic voting
- Indexing with The Graph for scalable UI queries
- Multi-sig treasury or timelocks for proposals executed on-chain

## Useful Commands Summary

```bash
# Start local node
npx hardhat node

# Deploy locally
npx hardhat run --network localhost contracts/scripts/deploy.js

# Run tests
npx hardhat test

# Start frontend
cd frontend
npm start
```

## References (file pointers)

- `frontend/src/contexts/Web3Context.jsx` — provider & account handling: [frontend/src/contexts/Web3Context.jsx](frontend/src/contexts/Web3Context.jsx#L1)
- `frontend/src/hooks/useContractInteraction.js` — contract helpers: [frontend/src/hooks/useContractInteraction.js](frontend/src/hooks/useContractInteraction.js#L1)
- ABI used by frontend: [frontend/src/lib/ClubFundingDAO.abi.json](frontend/src/lib/ClubFundingDAO.abi.json#L1)
- Solidity source: [campusdao-blockchain/contracts/ClubFundingDAO.sol](campusdao-blockchain/contracts/ClubFundingDAO.sol#L1)

---

If you want, I can also add a `Makefile` or npm script that starts the node, deploys, and launches the frontend in parallel for an easier demo workflow. Would you like that?

