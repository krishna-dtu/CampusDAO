import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { proposals as mockProposals } from '../mock';
import useContractInteraction from '../hooks/useContractInteraction'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { User, Vote, FileText, TrendingUp, Copy, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const { account, isConnected, chainId } = useWeb3();
  const navigate = useNavigate();
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Redirect if not connected
  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  // derive default tab from query ?tab=proposals
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const defaultTabFromQuery = searchParams.get('tab') || 'votes'

  const { fetchAllProposals, hasUserVoted, refreshCounter } = useContractInteraction()
  const [myVotes, setMyVotes] = React.useState([])
  const [loadingVotes, setLoadingVotes] = React.useState(true)
  const [allProposals, setAllProposals] = React.useState([])

  React.useEffect(() => {
    let mounted = true
    if (!isConnected || !account) {
      // when not connected, clear votes
      setMyVotes([])
      setLoadingVotes(false)
      return
    }

    setLoadingVotes(true)
    ;(async () => {
      try {
        const items = await fetchAllProposals()
        if (mounted) setAllProposals(items || [])
        // Check which proposals this account has voted on
        const checks = await Promise.all(
          items.map(async (p) => {
            try {
              const voted = await hasUserVoted(p.id, account)
              return voted ? p : null
            } catch (e) {
              return null
            }
          })
        )
        const votedProposals = checks.filter(Boolean).map((p) => ({
          proposalId: p.id,
          proposalTitle: p.title,
          club: p.clubName,
          voteType: 'for',
          timestamp: new Date().toISOString(),
          amount: p.requestedAmount,
        }))
        if (mounted) {
          // fallback to mock if none found
          if (votedProposals.length === 0) {
            setMyVotes([])
          } else {
            setMyVotes(votedProposals)
          }
        }
      } catch (e) {
        console.error('Error loading votes', e)
        if (mounted) setMyVotes([])
      } finally {
        if (mounted) setLoadingVotes(false)
      }
    })()

    return () => { mounted = false }
  }, [isConnected, account, fetchAllProposals, hasUserVoted, refreshCounter])

  const myProposals = [
    // Would be populated if user is a club that submitted proposals
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

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

  if (!isConnected) {
    return null;
  }

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Dashboard</h1>
          <p className="text-lg text-slate-400">
            View your voting history, proposals, and governance participation.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Connected Wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-400 font-mono">
                    {account?.slice(0, 10)}...{account?.slice(-8)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Chain ID: {chainId || 'Unknown'}</p>
                </div>
                <button
                  onClick={copyAddress}
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  {copiedAddress ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Total Votes Cast</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{myVotes.length}</p>
              <p className="text-sm text-slate-500 mt-1">Across all proposals</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Proposals Submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{myProposals.length}</p>
              <p className="text-sm text-slate-500 mt-1">Total submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400">Voting Power</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-teal-400">1</p>
              <p className="text-sm text-slate-500 mt-1">One wallet, one vote</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={defaultTabFromQuery} className="w-full">
          <TabsList className="bg-slate-900 border border-slate-800">
            <TabsTrigger
              value="votes"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-slate-900"
            >
              <Vote className="w-4 h-4 mr-2" />
              My Votes
            </TabsTrigger>
            <TabsTrigger
              value="proposals"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-slate-900"
            >
              <FileText className="w-4 h-4 mr-2" />
              My Proposals
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-slate-900"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* My Votes */}
          <TabsContent value="votes" className="mt-6">
            <div className="space-y-4">
              {loadingVotes ? (
                <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
                  <p className="text-slate-400">Loading your votes…</p>
                </div>
              ) : myVotes.length > 0 ? (
                myVotes.map((vote) => {
                  const proposal = allProposals.find((p) => p.id === vote.proposalId) || mockProposals.find((p) => p.id === vote.proposalId);
                  const statusStr = proposal ? (proposal.status ? proposal.status : (proposal.state !== undefined ? stateLabel(proposal.state) : 'unknown')) : 'unknown'
                  return (
                    <div
                      key={vote.proposalId}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {vote.proposalTitle}
                              </h3>
                              <p className="text-sm text-slate-400">{vote.club}</p>
                            </div>
                            {proposal && (
                              <Badge className={getStatusColor(statusStr)}>
                                {statusStr.charAt(0).toUpperCase() + statusStr.slice(1)}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                            <div>
                              <span className="text-slate-500">Your Vote:</span>
                              <span
                                className={`ml-2 font-semibold ${
                                  vote.voteType === 'for' ? 'text-teal-400' : 'text-red-400'
                                }`}
                              >
                                {vote.voteType === 'for' ? 'For' : 'Against'}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">Amount:</span>
                              <span className="text-white font-semibold ml-2">
                                ${vote.amount.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">Voted On:</span>
                              <span className="text-white ml-2">
                                {new Date(vote.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate(`/proposals/${vote.proposalId}`)}
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          View Proposal
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
                  <Vote className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg mb-2">No votes cast yet</p>
                  <p className="text-slate-500 text-sm mb-6">
                    Start participating in governance by voting on active proposals.
                  </p>
                  <Button
                    onClick={() => navigate('/proposals')}
                    className="bg-teal-500 hover:bg-teal-600 text-slate-900"
                  >
                    Browse Proposals
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Proposals */}
          <TabsContent value="proposals" className="mt-6">
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">No proposals submitted</p>
              <p className="text-slate-500 text-sm mb-6">
                Submit a funding proposal on behalf of your club or organization.
              </p>
              <Button
                onClick={() => navigate('/submit')}
                className="bg-teal-500 hover:bg-teal-600 text-slate-900"
              >
                Submit Proposal
              </Button>
            </div>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity" className="mt-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {myVotes.map((vote, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 pb-4 border-b border-slate-800 last:border-0"
                  >
                    <div className="w-10 h-10 bg-teal-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Vote className="w-5 h-5 text-teal-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        Voted <span className="font-semibold text-teal-400">{vote.voteType}</span> on
                        proposal
                      </p>
                      <p className="text-slate-400 text-sm mt-1">{vote.proposalTitle}</p>
                      <p className="text-slate-500 text-xs mt-2">
                        {new Date(vote.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
