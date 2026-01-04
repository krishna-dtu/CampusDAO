import { useCallback, useEffect, useMemo, useState } from 'react'
import { JsonRpcProvider } from 'ethers'
import { getContract } from '../lib/contract'
import { useWeb3 } from './useWeb3'
import { useToast } from './use-toast'


function parseProposal(raw) {
  return {
    id: Number(raw.id.toString()),
    clubName: raw.clubName,
    title: raw.title,
    description: raw.description,
    requestedAmount: raw.requestedAmount,
    clubAddress: raw.clubAddress,
    createdAtBlock: Number(raw.createdAtBlock.toString()),
    votingStartBlock: Number(raw.votingStartBlock.toString()),
    votingEndBlock: Number(raw.votingEndBlock.toString()),
    yesVotes: Number(raw.yesVotes.toString()),
    noVotes: Number(raw.noVotes.toString()),
    totalVoters: Number(raw.totalVoters.toString()),
    state: Number(raw.state),
    fundsReleased: raw.fundsReleased,
  }
}


export function useContractInteraction() {
  const { provider, signer, account } = useWeb3()
  const { toast } = useToast()


  const [isLoading, setIsLoading] = useState(false)
  const [txPending, setTxPending] = useState(false)
  const [lastError, setLastError] = useState(null)
  const [events, setEvents] = useState([])
  const [refreshCounter, setRefreshCounter] = useState(0)


  // Separate read/write contracts to ensure we use provider for reads and signer for writes
  const readContract = useMemo(() => {
    try {
      return getContract(provider || new JsonRpcProvider('http://127.0.0.1:8545'))
    } catch (e) {
      console.error('get read contract error', e)
      return null
    }
  }, [provider])


  const writeContract = useMemo(() => {
    if (!signer) return null
    try {
      return getContract(signer)
    } catch (e) {
      console.error('get write contract error', e)
      return null
    }
  }, [signer])


  const notifyError = useCallback((err, label) => {
    const message = err && err.message ? err.message : String(err)
    setLastError(message)
    toast({ title: label || 'Transaction error', description: message })
  }, [toast])


  const createProposal = useCallback(async ({ clubName, title, description, requestedAmount, clubAddress }) => {
    if (!writeContract || !signer) throw new Error('Wallet not connected')
    setIsLoading(true)
    setLastError(null)
    try {
      const tx = await writeContract.createProposal(clubName, title, description, requestedAmount, clubAddress)
      setTxPending(true)
      toast({ title: 'Proposal submitted', description: 'Waiting for confirmation...' })
      const receipt = await tx.wait()
      setTxPending(false)
      setRefreshCounter(c => c + 1)
      toast({ title: 'Proposal created', description: `Tx: ${receipt.transactionHash}` })
      return receipt
    } catch (err) {
      notifyError(err, 'Create proposal failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [writeContract, signer, notifyError, toast])


  const vote = useCallback(async (proposalID, choice) => {
    if (!writeContract || !signer) throw new Error('Wallet not connected')
    setIsLoading(true)
    setLastError(null)
    try {
      const tx = await writeContract.vote(proposalID, choice)
      setTxPending(true)
      toast({ title: 'Vote submitted', description: 'Waiting for confirmation...' })
      const receipt = await tx.wait()
      setTxPending(false)
      setRefreshCounter(c => c + 1)
      toast({ title: 'Vote recorded', description: `Tx: ${receipt.transactionHash}` })
      return receipt
    } catch (err) {
      notifyError(err, 'Vote failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [writeContract, signer, notifyError, toast])


  const finalizeProposal = useCallback(async (proposalID) => {
    if (!writeContract || !signer) throw new Error('Wallet not connected')
    setIsLoading(true)
    setLastError(null)
    try {
      const tx = await writeContract.finalizeProposal(proposalID)
      setTxPending(true)
      toast({ title: 'Finalizing proposal', description: 'Waiting for confirmation...' })
      const receipt = await tx.wait()
      setTxPending(false)
      setRefreshCounter(c => c + 1)
      toast({ title: 'Proposal finalized', description: `Tx: ${receipt.transactionHash}` })
      return receipt
    } catch (err) {
      notifyError(err, 'Finalize failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [writeContract, signer, notifyError, toast])


  const withdrawFunds = useCallback(async (proposalID) => {
    if (!writeContract || !signer) throw new Error('Wallet not connected')
    setIsLoading(true)
    setLastError(null)
    try {
      const tx = await writeContract.withdrawFunds(proposalID)
      setTxPending(true)
      toast({ title: 'Withdrawing funds', description: 'Waiting for confirmation...' })
      const receipt = await tx.wait()
      setTxPending(false)
      setRefreshCounter(c => c + 1)
      toast({ title: 'Funds released', description: `Tx: ${receipt.transactionHash}` })
      return receipt
    } catch (err) {
      notifyError(err, 'Withdraw failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [writeContract, signer, notifyError, toast])


  const fetchProposal = useCallback(async (id) => {
    if (!readContract) throw new Error('Contract not available')
    const raw = await readContract.getProposal(id)
    return parseProposal(raw)
  }, [readContract])


  const fetchAllProposals = useCallback(async () => {
    if (!readContract) throw new Error('Contract not available')
    const countBn = await readContract.proposalCount()
    const count = Number(countBn.toString())
    const items = []
    for (let i = 0; i < count; i++) {
      try {
        const p = await fetchProposal(i)
        items.push(p)
      } catch (e) {
        // ignore missing
      }
    }
    return items
  }, [readContract, fetchProposal])


  // Events
  useEffect(() => {
    if (!readContract) return


    const onProposalCreated = (proposalID, clubName, title, requestedAmount, clubAddress, votingEndBlock) => {
      setEvents(prev => [{ type: 'ProposalCreated', proposalID: Number(proposalID.toString()), clubName, title, requestedAmount, clubAddress, votingEndBlock: Number(votingEndBlock.toString()), ts: Date.now() }, ...prev])
      setRefreshCounter(c => c + 1)
    }


    const onVoteCast = (proposalID, voter, choice, currentYesVotes, currentNoVotes) => {
      setEvents(prev => [{ type: 'VoteCast', proposalID: Number(proposalID.toString()), voter, choice, yes: Number(currentYesVotes.toString()), no: Number(currentNoVotes.toString()), ts: Date.now() }, ...prev])
      setRefreshCounter(c => c + 1)
    }


    const onProposalApproved = (proposalID, clubName, requestedAmount, yesVotes, noVotes) => {
      setEvents(prev => [{ type: 'ProposalApproved', proposalID: Number(proposalID.toString()), clubName, requestedAmount, yes: Number(yesVotes.toString()), no: Number(noVotes.toString()), ts: Date.now() }, ...prev])
      setRefreshCounter(c => c + 1)
    }


    const onProposalRejected = (proposalID, clubName, yesVotes, noVotes, reason) => {
      setEvents(prev => [{ type: 'ProposalRejected', proposalID: Number(proposalID.toString()), clubName, yes: Number(yesVotes.toString()), no: Number(noVotes.toString()), reason, ts: Date.now() }, ...prev])
      setRefreshCounter(c => c + 1)
    }


    const onFundsReleased = (proposalID, clubAddress, amount, clubName) => {
      setEvents(prev => [{ type: 'FundsReleased', proposalID: Number(proposalID.toString()), clubAddress, amount, clubName, ts: Date.now() }, ...prev])
      setRefreshCounter(c => c + 1)
    }


    readContract.on('ProposalCreated', onProposalCreated)
    readContract.on('VoteCast', onVoteCast)
    readContract.on('ProposalApproved', onProposalApproved)
    readContract.on('ProposalRejected', onProposalRejected)
    readContract.on('FundsReleased', onFundsReleased)


    return () => {
      try {
        readContract.off('ProposalCreated', onProposalCreated)
        readContract.off('VoteCast', onVoteCast)
        readContract.off('ProposalApproved', onProposalApproved)
        readContract.off('ProposalRejected', onProposalRejected)
        readContract.off('FundsReleased', onFundsReleased)
      } catch (e) {
        // ignore
      }
    }
  }, [readContract])


  // Additional read helpers
  const proposalCount = useCallback(async () => {
    if (!readContract) throw new Error('Contract not available')
    const bn = await readContract.proposalCount()
    return Number(bn.toString())
  }, [readContract])


  const getVoteCounts = useCallback(async (proposalID) => {
    if (!readContract) throw new Error('Contract not available')
    const res = await readContract.getVoteCounts(proposalID)
    return { yes: Number(res[0].toString()), no: Number(res[1].toString()), totalVoters: Number(res[2].toString()) }
  }, [readContract])


  const hasUserVoted = useCallback(async (proposalID, userAddress) => {
    if (!readContract) throw new Error('Contract not available')
    return await readContract.hasUserVoted(proposalID, userAddress)
  }, [readContract])


  const getTreasuryInfo = useCallback(async () => {
    if (!readContract) throw new Error('Contract not available')
    const res = await readContract.getTreasuryInfo()
    return { available: res[0], allocated: res[1], totalBalance: res[2] }
  }, [readContract])


  const fundTreasury = useCallback(async (value) => {
    if (!writeContract || !signer) throw new Error('Wallet not connected')
    setIsLoading(true)
    setLastError(null)
    try {
      const tx = await writeContract.fundTreasury({ value })
      setTxPending(true)
      toast({ title: 'Funding treasury', description: 'Waiting for confirmation...' })
      const receipt = await tx.wait()
      setTxPending(false)
      setRefreshCounter(c => c + 1)
      toast({ title: 'Treasury funded', description: `Tx: ${receipt.transactionHash}` })
      return receipt
    } catch (err) {
      notifyError(err, 'Funding failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [writeContract, signer, notifyError, toast])


  return {
    readContract,
    writeContract,
    isLoading,
    txPending,
    lastError,
    events,
    refreshCounter,
    createProposal,
    vote,
    finalizeProposal,
    withdrawFunds,
    fundTreasury,
    fetchProposal,
    fetchAllProposals,
    proposalCount,
    getVoteCounts,
    hasUserVoted,
    getTreasuryInfo,
  }
}


export default useContractInteraction
