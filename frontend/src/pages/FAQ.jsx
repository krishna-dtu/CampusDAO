import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const FAQ = () => {
  const faqs = [
    {
      question: 'Who can submit proposals?',
      answer:
        'Any registered student club or society can submit funding proposals. Submitters must have a connected wallet and hold the minimum token threshold (currently 100 tokens) to prevent spam. Individual students cannot submit proposals—only recognized campus organizations.',
    },
    {
      question: 'Who can vote on proposals?',
      answer:
        'All students with connected wallets can vote on active proposals. CampusDAO uses a one-wallet-one-vote system, ensuring equal voting power regardless of token holdings. You can vote For or Against any proposal during the 30-day voting period.',
    },
    {
      question: 'Is voting anonymous?',
      answer:
        'Voting is pseudonymous, not anonymous. Your wallet address is visible on-chain, but your personal identity is not linked to your wallet unless you voluntarily disclose it. Anyone can see that a specific wallet address voted For or Against, but not who controls that wallet.',
    },
    {
      question: 'Can I change my vote after submitting?',
      answer:
        'No. All votes are immutably recorded on the blockchain and cannot be changed, withdrawn, or deleted after submission. This ensures the integrity of the voting process and prevents manipulation. Review proposals carefully before voting.',
    },
    {
      question: 'What happens if a proposal doesn\'t reach quorum?',
      answer:
        'If a proposal does not receive the minimum required votes (2,000 total votes) by the voting deadline, it is automatically rejected and marked as such on-chain. Clubs can resubmit revised proposals in future funding cycles.',
    },
    {
      question: 'Can proposals be edited after submission?',
      answer:
        'No. Once a proposal is submitted and recorded on-chain, it cannot be modified or deleted. This ensures transparency and prevents clubs from changing details after votes have been cast. If errors are discovered, the proposal must be withdrawn and resubmitted in a future cycle.',
    },
    {
      question: 'How are approved funds disbursed?',
      answer:
        'After a proposal passes (reaches quorum + majority approval), it enters a 7-day security timelock. Once this period expires, the smart contract automatically transfers the approved amount from the DAO treasury to the club\'s designated wallet address. All disbursements are recorded in the public expense ledger.',
    },
    {
      question: 'What happens to unused funds from approved proposals?',
      answer:
        'CampusDAO does not currently enforce post-disbursement spending restrictions. Clubs are trusted to use funds as described in their proposals. However, all original transactions are permanently visible on-chain. If significant unused funds remain, clubs are encouraged to return them to the treasury or submit transparency reports to maintain community trust.',
    },
    {
      question: 'Can I vote on multiple proposals simultaneously?',
      answer:
        'Yes. There is no restriction on how many proposals you can vote on. You can cast one vote (For or Against) on each active proposal during its voting period. Voting on one proposal does not affect your ability to vote on others.',
    },
    {
      question: 'How do I know my vote was recorded correctly?',
      answer:
        'When you vote, the transaction is recorded on the blockchain and generates a unique transaction hash (txHash). You can copy this hash and verify it on a blockchain explorer to confirm your vote was recorded exactly as submitted. The vote count on CampusDAO updates in real-time based on on-chain data.',
    },
    {
      question: 'What is the role of smart contracts in CampusDAO?',
      answer:
        'Smart contracts automate the entire governance process: proposal submission, vote counting, quorum verification, fund disbursement, and enforcement of timelocks. They ensure that rules are applied consistently without human intervention or bias. All contract code is open-source and auditable.',
    },
    {
      question: 'Can administrators or moderators override votes?',
      answer:
        'No. CampusDAO operates as a decentralized autonomous organization (DAO), meaning no individual or group can override community votes, modify proposals, or alter governance rules. The only exception is emergency pause functionality in case of critical security vulnerabilities, which requires multi-signature approval.',
    },
    {
      question: 'How is the treasury funded?',
      answer:
        'The CampusDAO treasury is funded through student activity fees, university allocations, or external grants—depending on institutional agreements. Treasury balance and all transactions are publicly visible on the Treasury page.',
    },
    {
      question: 'What happens if I lose access to my wallet?',
      answer:
        'If you lose access to your wallet (private keys or seed phrase), you will not be able to vote or interact with CampusDAO using that wallet. CampusDAO cannot recover lost wallets or transfer voting rights. Always securely back up your wallet credentials.',
    },
    {
      question: 'Can proposals request any amount of funding?',
      answer:
        'Yes, but proposals requesting amounts exceeding the remaining treasury balance are impractical and unlikely to receive community support. Clubs should review the Treasury page before submitting to ensure their request is feasible.',
    },
    {
      question: 'Are there penalties for submitting frivolous proposals?',
      answer:
        'CampusDAO does not enforce explicit penalties, but submitting low-quality or spam proposals damages a club\'s reputation within the community. The minimum token threshold for submission serves as an anti-spam mechanism.',
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Common questions about participating in CampusDAO governance, voting, and proposals.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-slate-400 mb-6">
            Review our comprehensive documentation or explore the governance framework for more details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs">
              <Button className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium px-8 py-6">
                View Documentation
              </Button>
            </Link>
            <Link to="/governance">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6"
              >
                Governance Framework
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
