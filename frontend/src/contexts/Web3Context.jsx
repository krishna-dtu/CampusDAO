// Web3 Context and Hooks for CampusDAO
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BrowserProvider } from 'ethers';


// Create Web3 Context
const Web3Context = createContext(null);


export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};


// Web3 Provider Component
export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);


  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };


  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError('Please install MetaMask to use CampusDAO');
      return;
    }


    setIsConnecting(true);
    setError(null);


    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });


      // Create provider and signer
      const web3Provider = new BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();


      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(accounts[0]?.toLowerCase() || null);
      // normalize chainId to number
      const normalizedChainId = typeof network.chainId === 'string' ? Number(network.chainId) : network.chainId
      setChainId(normalizedChainId);


      // If not connected to localhost Hardhat, surface an error
      if (normalizedChainId !== 31337) {
        setError('Please switch MetaMask network to localhost (chainId 31337)')
        try {
          // Try to request a network switch (may fail if chain not configured)
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }], // 31337 in hex
          })
          // If switch succeeds, try to refresh
          window.location.reload()
        } catch (switchErr) {
          // Don't block — user can switch manually
          console.warn('Network switch request failed', switchErr)
        }
      }


      // Store connection state
      localStorage.setItem('walletConnected', 'true');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);


  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    localStorage.removeItem('walletConnected');
  }, []);


  // Handle account changes
  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  }, [account, disconnectWallet]);


  // Handle chain changes
  const handleChainChanged = useCallback((chainId) => {
    try {
      const id = typeof chainId === 'string' && chainId.startsWith('0x') ? parseInt(chainId, 16) : Number(chainId)
      setChainId(id)
      // Only reload if switching AWAY from localhost
      if (id !== 31337) {
        window.location.reload();
      }
    } catch (e) {
      setChainId(chainId)
    }
  }, []);


  // Setup event listeners
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);


      // Cleanup
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);


  // Auto-connect on page load if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected === 'true' && isMetaMaskInstalled()) {
      connectWallet();
    }
  }, [connectWallet]);


  const value = {
    account,
    provider,
    signer,
    chainId,
    isCorrectNetwork: chainId === 31337,
    isConnecting,
    error,
    isConnected: !!account,
    connectWallet,
    disconnectWallet,
    isMetaMaskInstalled: isMetaMaskInstalled(),
  };


  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
