import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useContractInteraction from '../hooks/useContractInteraction'
import { useWeb3 } from '../contexts/Web3Context'
import { useToast } from '../hooks/use-toast'
import { formatEther } from 'ethers'
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search } from 'lucide-react';

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [proposals, setProposals] = useState([])
  const { fetchAllProposals, refreshCounter } = useContractInteraction()
  const { account } = useWeb3()
  const { toast } = useToast()

  const hiddenKeyFor = (acct) => `hiddenProposals:${acct?.toLowerCase()}`
  const isHidden = (id) => {
    try {
      if (!account) return false
      const list = JSON.parse(localStorage.getItem(hiddenKeyFor(account)) || '[]')
      return list.includes(id)
    } catch (e) {
      return false
    }
  }

  const hideProposal = (id) => {
    if (!account) return
    try {
      const key = hiddenKeyFor(account)
      const list = JSON.parse(localStorage.getItem(key) || '[]')
      if (!list.includes(id)) {
        list.push(id)
        localStorage.setItem(key, JSON.stringify(list))
      }
      setProposals((prev) => prev.filter((p) => p.id !== id))
      toast({ title: 'Removed', description: 'Proposal removed from your view' })
    } catch (e) {
      console.warn('hideProposal', e)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const items = await fetchAllProposals()
        // filter out any proposals hidden by this account
        const filtered = (items || []).filter((p) => !isHidden(p.id))
        setProposals(filtered)
      } catch (e) {
        console.error('fetchAllProposals', e)
      }
    })()
  }, [fetchAllProposals, refreshCounter])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-teal-500/10 text-teal-500 border-teal-500/20';
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const stateLabel = (s) => {
    switch (s) {
      case 0:
        return 'active'
      case 1:
        return 'approved'
      case 2:
        return 'rejected'
      case 3:
        return 'executed'
      default:
        return 'unknown'
    }
  }

  const filteredProposals = proposals
    .filter((proposal) => {
      const matchesSearch =
        proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.clubName.toLowerCase().includes(searchTerm.toLowerCase());
      const statusStr = stateLabel(proposal.state)
      const matchesStatus = statusFilter === 'all' || statusStr === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.createdAtBlock || 0) - (a.createdAtBlock || 0);
        case 'amount':
          return Number(b.requestedAmount || 0) - Number(a.requestedAmount || 0);
        case 'votes':
          return (b.totalVoters || 0) - (a.totalVoters || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Funding Proposals</h1>
          <p className="text-lg text-slate-400">
            Browse and evaluate campus club funding requests. All proposals are transparently recorded
            on-chain.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search proposals or clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="amount">Highest Amount</SelectItem>
                <SelectItem value="votes">Most Votes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProposals.map((proposal) => {
            const yes = Number(proposal.yesVotes || 0)
            const no = Number(proposal.noVotes || 0)
            const total = Number(proposal.totalVoters || 0)
            const votePercentage = total === 0 ? 0 : (yes / total) * 100
            const quorumPercentage = 0
            const statusStr = stateLabel(proposal.state)

            return (
              <div
                key={proposal.id}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {proposal.title}
                        </h3>
                        <p className="text-sm text-slate-400">{proposal.clubName}</p>
                      </div>
                      <Badge className={getStatusColor(statusStr)}>
                        {getStatusLabel(statusStr)}
                      </Badge>
                    </div>

                    <p className="text-slate-400 mb-4 line-clamp-2">
                      {proposal.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div>
                          <span className="text-slate-500">Requested:</span>
                          <span className="text-white font-semibold ml-2">
                            {proposal.requestedAmount ? `${formatEther(proposal.requestedAmount)} ETH` : '—'}
                          </span>
                        </div>
                      <div>
                        <span className="text-slate-500">Votes:</span>
                        <span className="text-white font-semibold ml-2">
                          {(proposal.totalVoters || 0).toLocaleString()}
                        </span>
                      </div>
                      {statusStr === 'active' && (
                        <div>
                          <span className="text-slate-500">Quorum:</span>
                          <span className="text-white font-semibold ml-2">
                            {Math.round(quorumPercentage)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Vote Progress */}
                    {statusStr === 'active' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>For: {votePercentage.toFixed(1)}%</span>
                          <span>Against: {(100 - votePercentage).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full transition-all"
                            style={{ width: `${votePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Link to={`/proposals/${proposal.id}`}>
                      <Button className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium">
                        View Details
                      </Button>
                    </Link>
                    {proposal.clubAddress && account && proposal.clubAddress.toLowerCase() === account.toLowerCase() && (
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500/10 mt-2"
                        onClick={() => hideProposal(proposal.id)}
                      >
                        Remove (hide)
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No proposals found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;
