import { Contract, JsonRpcProvider } from 'ethers'
import ABI from './ClubFundingDAO.abi.json'

export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
  // Fail early in development — front-end cannot operate without a deployed contract
  // eslint-disable-next-line no-console
  console.error('REACT_APP_CONTRACT_ADDRESS is not set or is the zero address')
}

export function getContract(providerOrSigner) {
  if (!providerOrSigner) {
    throw new Error('Provider or signer is required to get contract instance')
  }
  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
    throw new Error('Contract address is not configured. Set REACT_APP_CONTRACT_ADDRESS')
  }

  return new Contract(CONTRACT_ADDRESS, ABI, providerOrSigner)
}

// Helpers for clarity: read vs write contract
export function getReadContract(provider) {
  // If no wallet/provider is available (visitor not connected), fall back to a local
  // JSON-RPC provider so the UI can show on-chain data in read-only mode.
  const usedProvider = provider || new JsonRpcProvider('http://127.0.0.1:8545')
  return getContract(usedProvider)
}

export function getWriteContract(signer) {
  if (!signer) throw new Error('Signer is required for write contract')
  return getContract(signer)
}
