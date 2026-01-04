import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Vote, Eye, TrendingUp, HelpCircle } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Documentation</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides on how CampusDAO works. Learn about proposals, voting, treasury
            management, and on-chain verification.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Link to="/governance">
            <Card className="bg-slate-900 border-slate-800 hover:border-teal-500 transition-colors h-full">
              <CardHeader>
                <FileText className="w-8 h-8 text-teal-500 mb-2" />
                <CardTitle className="text-white">Governance Framework</CardTitle>
                <CardDescription className="text-slate-400">
                  Complete overview of CampusDAO governance structure and rules
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/faq">
            <Card className="bg-slate-900 border-slate-800 hover:border-teal-500 transition-colors h-full">
              <CardHeader>
                <HelpCircle className="w-8 h-8 text-teal-500 mb-2" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-slate-400">
                  Common questions about participation, voting, and proposals
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* How Proposals Work */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">How Proposals Work</h2>
              <p className="text-slate-400">
                Understanding the proposal system is essential for effective participation in CampusDAO.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">1. Creating a Proposal</h3>
              <p className="text-slate-400">
                To submit a funding proposal, clubs must connect a wallet and provide:
              </p>
              <ul className="mt-2 space-y-1 ml-6 text-slate-400">
                <li>• Club name and contact information</li>
                <li>• Proposal title (clear and descriptive)</li>
                <li>• Detailed description (minimum 100 characters)</li>
                <li>• Requested funding amount</li>
                <li>• Intended use of funds (itemized breakdown recommended)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">2. Submission Requirements</h3>
              <p className="text-slate-400">
                Proposals require a minimum token threshold (currently 100 tokens) to prevent spam. Once
                submitted, proposals are recorded on-chain and cannot be edited or deleted.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">3. Review Period</h3>
              <p className="text-slate-400">
                After submission, proposals enter a 48-hour review period where the community can read
                details and prepare informed votes. Voting begins automatically after this period.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">4. Voting Phase</h3>
              <p className="text-slate-400">
                During the 30-day voting window, any wallet holder can vote For or Against. Proposals need
                to reach quorum (2,000 votes) and receive majority support to pass.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">5. Outcome</h3>
              <p className="text-slate-400">
                Approved proposals are queued for execution after a 7-day security timelock. Rejected
                proposals are permanently marked as such on-chain. Both outcomes are immutable.
              </p>
            </div>
          </div>
        </section>

        {/* How Voting Works */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Vote className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">How Voting Works</h2>
              <p className="text-slate-400">
                CampusDAO uses a transparent, on-chain voting system where every vote is permanent and
                verifiable.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">Casting a Vote</h3>
              <p className="text-slate-400 mb-2">To vote on a proposal:</p>
              <ol className="space-y-2 ml-6 text-slate-400">
                <li>1. Connect your wallet to CampusDAO</li>
                <li>2. Navigate to the Proposals page and select a proposal</li>
                <li>3. Review the proposal details, amount, and description</li>
                <li>4. Click "Vote For" or "Vote Against"</li>
                <li>5. Confirm the transaction in your wallet</li>
              </ol>
              <p className="text-slate-400 mt-4">
                Once submitted, votes are immediately recorded on the blockchain and cannot be changed or
                withdrawn.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Voting Power</h3>
              <p className="text-slate-400">
                CampusDAO uses a <strong className="text-white">one-wallet-one-vote</strong> system. Each
                wallet address can cast exactly one vote per proposal, ensuring equal representation
                regardless of token holdings.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Vote Privacy</h3>
              <p className="text-slate-400">
                Voting is pseudonymous. Wallet addresses are visible on-chain, but personal identities are
                not linked to addresses unless voluntarily disclosed. Anyone can view vote counts and verify
                results.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Quorum Requirements</h3>
              <p className="text-slate-400">
                For a proposal to be valid, it must receive at least 2,000 total votes (quorum). If quorum
                is not reached by the voting deadline, the proposal is automatically rejected.
              </p>
            </div>
          </div>
        </section>

        {/* Treasury Disbursement */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">How Treasury Disbursement Works</h2>
              <p className="text-slate-400">
                Approved proposals trigger automatic fund transfers from the DAO treasury to recipient
                wallets.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">Execution Process</h3>
              <p className="text-slate-400">
                When a proposal passes (reaches quorum + majority approval), it enters a 7-day timelock
                period. After this security delay, the smart contract automatically transfers the approved
                amount to the club's designated wallet address.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Transparency</h3>
              <p className="text-slate-400">
                Every disbursement is recorded in the public expense ledger with:
              </p>
              <ul className="mt-2 space-y-1 ml-6 text-slate-400">
                <li>• Transaction date and timestamp</li>
                <li>• Recipient club name</li>
                <li>• Amount transferred</li>
                <li>• Purpose of funds</li>
                <li>• Verifiable transaction hash</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Accountability</h3>
              <p className="text-slate-400">
                While CampusDAO does not enforce how approved funds are spent post-disbursement, all
                transactions are permanently visible on-chain. Clubs are expected to use funds as described
                in their proposals to maintain community trust.
              </p>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">How to Verify On-Chain Data</h2>
              <p className="text-slate-400">
                All CampusDAO activity is publicly verifiable on the blockchain. Anyone can independently
                audit proposals, votes, and transactions.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">Using Transaction Hashes</h3>
              <p className="text-slate-400">
                Every action in CampusDAO generates a unique transaction hash (txHash). To verify:
              </p>
              <ol className="mt-2 space-y-2 ml-6 text-slate-400">
                <li>1. Copy the transaction hash from the expense ledger or proposal page</li>
                <li>2. Visit a blockchain explorer (e.g., Etherscan)</li>
                <li>3. Paste the hash into the search bar</li>
                <li>4. View complete transaction details including timestamp, block number, and data</li>
              </ol>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Verifying Vote Counts</h3>
              <p className="text-slate-400">
                Vote tallies displayed on CampusDAO are read directly from smart contract state. Advanced
                users can query the contract directly using blockchain explorers or Web3 libraries to
                independently verify vote counts.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Smart Contract Audit</h3>
              <p className="text-slate-400">
                CampusDAO smart contracts are open-source and publicly auditable. The contract code,
                deployment addresses, and audit reports are available in the project repository for technical
                review.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
