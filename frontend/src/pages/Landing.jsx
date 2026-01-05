import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useWeb3 } from '../contexts/Web3Context';
import { ArrowRight, Shield, Vote, Eye, TrendingUp } from 'lucide-react';

const Landing = () => {
  const { connectWallet, isConnected, isConnecting, isMetaMaskInstalled } = useWeb3();
  const problems = [
    {
      title: 'Centralized Decision-Making',
      description: 'A small administrative body controls all funding decisions without meaningful student input or oversight.',
    },
    {
      title: 'Lack of Accountability',
      description: 'No transparent record of how decisions are made, who votes, or why proposals are approved or rejected.',
    },
    {
      title: 'Limited Student Participation',
      description: 'Students have no voice in how their activity fees are allocated, despite funding the entire system.',
    },
    {
      title: 'Opaque Fund Tracking',
      description: 'Once funds are allocated, there is no public audit trail showing how money is actually spent.',
    },
  ];

  const solutions = [
    {
      icon: <Vote className="w-6 h-6" />,
      title: 'Decentralized Governance',
      description: 'Every student with a wallet can participate in funding decisions through transparent voting.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'On-Chain Voting',
      description: 'All votes are recorded immutably on the blockchain, preventing manipulation or retroactive changes.',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Immutable Records',
      description: 'Complete transparency: every proposal, vote, and transaction is permanently verifiable.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Student Participation',
      description: 'Direct democracy where the entire student body decides funding priorities collectively.',
    },
  ];

  const features = [
    {
      title: 'Proposal-Based Funding',
      description: 'Clubs submit detailed funding requests with clear budgets, timelines, and expected outcomes.',
    },
    {
      title: 'DAO-Style Voting',
      description: 'Token-weighted or one-wallet-one-vote systems ensure fair and transparent decision-making.',
    },
    {
      title: 'Transparent Treasury',
      description: 'Real-time visibility into total funds, allocations, and remaining balance for complete accountability.',
    },
    {
      title: 'On-Chain Expense Ledger',
      description: 'Every disbursement is recorded with transaction hashes, enabling independent verification by anyone.',
    },
  ];

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Decentralizing Club Funding on Campus
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
              Campus funding systems are centralized, opaque, and prone to bias. CampusDAO replaces
              closed-door decisions with transparent, on-chain governance where every student has a voice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!isConnected && (
                isMetaMaskInstalled ? (
                  <Button
                    onClick={() => connectWallet()}
                    disabled={isConnecting}
                    className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium px-8 py-6 text-lg"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => window.open('https://metamask.io/download/', '_blank')}
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg"
                  >
                    Install MetaMask
                  </Button>
                )
              )}
              <Link to="/proposals">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg"
                >
                  View Proposals <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Problem with Traditional Campus Funding
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Current funding systems operate behind closed doors, leaving students without visibility,
              accountability, or meaningful participation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
                <p className="text-slate-400 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              CampusDAO's Decentralized Solution
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              We replace centralized control with transparent, blockchain-based governance that gives
              every student a verifiable voice in funding decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-teal-500 transition-colors"
              >
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4 text-slate-900">
                  {solution.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{solution.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              CampusDAO provides institutional-grade governance tools designed specifically for transparent
              campus funding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Campus Governance?
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Connect your wallet to participate in transparent, decentralized funding decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isConnected && (
              isMetaMaskInstalled ? (
                <Button
                  onClick={() => connectWallet()}
                  disabled={isConnecting}
                  className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium px-8 py-6 text-lg"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              ) : (
                <Button
                  onClick={() => window.open('https://metamask.io/download/', '_blank')}
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg"
                >
                  Install MetaMask
                </Button>
              )
            )}
            <Link to="/about">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
