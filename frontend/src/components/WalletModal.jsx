import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useWeb3 } from '../contexts/Web3Context';
import { AlertCircle } from 'lucide-react';

const WalletModal = ({ open, onClose, onConnect }) => {
  const { connectWallet, isConnecting, error, isMetaMaskInstalled, isConnected } = useWeb3();

  const wallets = [
    {
      name: 'MetaMask',
      description: 'Connect using browser extension',
      icon: '🦊',
      available: isMetaMaskInstalled,
    },
    {
      name: 'WalletConnect',
      description: 'Scan with mobile wallet',
      icon: '📱',
      available: false,
      comingSoon: true,
    },
    {
      name: 'Coinbase Wallet',
      description: 'Connect with Coinbase',
      icon: '🔵',
      available: false,
      comingSoon: true,
    },
  ];

  const handleWalletClick = async (wallet) => {
    if (!wallet.available) return;

    if (wallet.name === 'MetaMask') {
      await connectWallet();
    }
  };

  // Close modal after successful connection
  useEffect(() => {
    if (isConnected && open) {
      onConnect();
      onClose();
    }
  }, [isConnected, open, onConnect, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Connect Wallet</DialogTitle>
          <DialogDescription className="text-slate-400">
            Choose your preferred wallet to connect to CampusDAO governance platform.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-3 mt-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletClick(wallet)}
              disabled={!wallet.available || isConnecting}
              className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${
                wallet.available
                  ? 'bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-teal-500'
                  : 'bg-slate-800 border border-slate-700 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-3xl">{wallet.icon}</span>
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2">
                  <h4 className="text-white font-medium">{wallet.name}</h4>
                  {wallet.comingSoon && (
                    <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">{wallet.description}</p>
                {!wallet.available && wallet.name === 'MetaMask' && (
                  <p className="text-red-400 text-xs mt-1">Please install MetaMask extension</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {!isMetaMaskInstalled && (
          <div className="mt-4">
            <Button
              onClick={() => window.open('https://metamask.io/download/', '_blank')}
              variant="outline"
              className="w-full border-teal-500 text-teal-400 hover:bg-teal-500/10"
            >
              Install MetaMask
            </Button>
          </div>
        )}

        <div className="mt-6 p-4 bg-slate-900 border border-slate-700 rounded-lg">
          <p className="text-slate-400 text-xs text-center">
            By connecting a wallet, you agree to CampusDAO's governance rules and acknowledge that
            all votes are immutable and recorded on-chain.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
