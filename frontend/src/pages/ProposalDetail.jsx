import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useContractInteraction from '../hooks/useContractInteraction'
import { formatEther } from 'ethers'
import { useWeb3 } from '../hooks/useWeb3'
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Calendar, DollarSign, Users } from 'lucide-react';

const ProposalDetail = () => {
  const { id } = useParams();
  const { fetchProposal, vote, withdrawFunds, txPending, hasUserVoted } = useContractInteraction()
  const { account } = useWeb3()
  const [proposal, setProposal] = useState(null)
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!id) return
    (async () => {
      try {
        const p = await fetchProposal(id)
        setProposal(p)
        // check if connected user already voted
        if (account) {
          try {
            const voted = await hasUserVoted(p.id, account)
            setHasVoted(Boolean(voted))
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        console.error('fetchProposal', e)
      }
    })()
  }, [id, fetchProposal])

  if (!proposal) {
    return (
      <div className="bg-slate-950 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Proposal Not Found</h1>
          <Link to="/proposals">
            <Button className="bg-teal-500 hover:bg-teal-600 text-slate-900">
              Back to Proposals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const yes = Number(proposal.yesVotes || 0)
  const no = Number(proposal.noVotes || 0)
  const totalVotes = Number(proposal.totalVoters || 0)
  const votePercentage = totalVotes === 0 ? 0 : (yes / totalVotes) * 100
  const quorumPercentage = 0

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

  const statusStr = stateLabel(proposal.state)

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

  const handleVote = async (voteType) => {
    try {
      await vote(proposal.id, voteType === 'for')
      setHasVoted(true)
    } catch (e) {
      console.error('vote error', e)
    }
  }

  const handleWithdraw = async () => {
    try {
      await withdrawFunds(proposal.id)
    } catch (e) {
      console.error('withdraw error', e)
    }
  }

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/proposals"
          className="inline-flex items-center text-slate-400 hover:text-teal-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Proposals
        </Link>

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{proposal.title}</h1>
              <p className="text-lg text-slate-400">{proposal.clubName}</p>
            </div>
            <Badge className={getStatusColor(statusStr)}>
              {statusStr.charAt(0).toUpperCase() + statusStr.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Requested Amount</p>
                <p className="text-xl font-semibold text-white">
                  {proposal.requestedAmount ? `${formatEther(proposal.requestedAmount)} ETH` : '—'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Voting Deadline</p>
                <p className="text-xl font-semibold text-white">
                  Block #{proposal.votingEndBlock}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Votes</p>
                <p className="text-xl font-semibold text-white">{totalVotes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Proposal Description</h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {proposal.description}
          </p>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Submission Block:</span>
                <span className="text-white ml-2">#{proposal.createdAtBlock}</span>
              </div>
              <div>
                <span className="text-slate-400">Club Address:</span>
                <span className="text-white ml-2">{proposal.clubAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        {statusStr === 'active' && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Cast Your Vote</h2>

            {!hasVoted ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => handleVote('for')}
                    disabled={txPending}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium py-6 text-lg"
                  >
                    Vote For
                  </Button>
                  <Button
                    onClick={() => handleVote('against')}
                    disabled={txPending}
                    variant="outline"
                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 py-6 text-lg"
                  >
                    Vote Against
                  </Button>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">
                    <strong className="text-white">Important:</strong> All votes are immutable and
                    permanently recorded on-chain. You cannot change your vote after submission.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-6 text-center">
                <p className="text-teal-400 font-medium">Your vote has been recorded successfully!</p>
                {txPending ? (
                  <p className="text-slate-400 text-sm mt-2">Transaction pending…</p>
                ) : (
                  <p className="text-slate-400 text-sm mt-2">Transaction confirmed</p>
                )}
              </div>
            )}

            {/* Vote Breakdown */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Vote Breakdown</h3>
                <span className="text-sm text-slate-400">Total voters: {proposal.totalVoters ?? 0}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">For</span>
                    <span className="text-white font-medium">
                      {proposal.yesVotes?.toLocaleString ? proposal.yesVotes.toLocaleString() : proposal.yesVotes} ({votePercentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div
                      className="bg-teal-500 h-3 rounded-full transition-all"
                      style={{ width: `${votePercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Against</span>
                    <span className="text-white font-medium">
                      {proposal.noVotes?.toLocaleString ? proposal.noVotes.toLocaleString() : proposal.noVotes} ({(100 - votePercentage).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all"
                      style={{ width: `${100 - votePercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Approved/Rejected Status */}
        {statusStr !== 'active' && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Final Results</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">For</span>
                  <span className="text-white font-medium">
                    {proposal.yesVotes?.toLocaleString ? proposal.yesVotes.toLocaleString() : proposal.yesVotes} ({votePercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-teal-500 h-3 rounded-full"
                    style={{ width: `${votePercentage}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Against</span>
                  <span className="text-white font-medium">
                    {proposal.noVotes?.toLocaleString ? proposal.noVotes.toLocaleString() : proposal.noVotes} ({(100 - votePercentage).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{ width: `${100 - votePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalDetail;
