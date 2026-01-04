import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import WalletModal from './WalletModal';
import { useWeb3 } from '../contexts/Web3Context';

const Header = () => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { account, isConnected, disconnectWallet, isConnecting } = useWeb3();

  const handleWalletConnect = () => {
    setWalletModalOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { path: '/proposals', label: 'Proposals' },
    { path: '/submit', label: 'Submit Proposal' },
    { path: '/treasury', label: 'Treasury' },
    { path: '/governance', label: 'Governance' },
    { path: '/docs', label: 'Documentation' },
  ];

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">CD</span>
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block">CampusDAO</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive(link.path)
                      ? 'text-teal-400 bg-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Wallet Button / Profile */}
            <div className="flex items-center space-x-4">
              {isConnected && account ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="hidden sm:flex items-center space-x-2 bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                    >
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-sm font-medium">{formatAddress(account)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700 w-56">
                    <div className="px-3 py-2">
                      <p className="text-xs text-slate-400">Connected Wallet</p>
                      <p className="text-sm text-white font-mono mt-1">{formatAddress(account)}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem asChild className="text-slate-300 hover:text-white hover:bg-slate-700">
                      <Link to="/dashboard" className="flex items-center cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={disconnectWallet}
                      className="text-red-400 hover:text-red-300 hover:bg-slate-700 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect Wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setWalletModalOpen(true)}
                  disabled={isConnecting}
                  className="hidden sm:flex bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive(link.path)
                      ? 'text-teal-400 bg-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                {isConnected && account ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 bg-slate-700 px-4 py-2 rounded-lg mb-2 text-white"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span className="text-sm">My Dashboard</span>
                    </Link>
                    <div className="flex items-center justify-between bg-slate-700 px-4 py-2 rounded-lg mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span className="text-slate-300 text-sm font-medium">
                          {formatAddress(account)}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        disconnectWallet();
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setWalletModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    disabled={isConnecting}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <WalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </>
  );
};

export default Header;
