import React from 'react';
import { governanceRules } from '../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Vote, Clock, CheckCircle2, XCircle } from 'lucide-react';

const Governance = () => {
  const lifecycle = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: '1. Proposal Submission',
      description:
        'Clubs submit detailed funding requests including description, amount, and intended use. Requires connected wallet and minimum token threshold.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '2. Review Period',
      description:
        'Submitted proposals enter a 48-hour review period where the community can view details and ask questions before voting begins.',
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: '3. Voting Period',
      description:
        '30-day voting window where all eligible wallets can vote For or Against. All votes are immutable and recorded on-chain.',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: '4. Quorum & Execution',
      description:
        'Proposals that reach quorum and majority approval are automatically queued for execution after a 7-day timelock for security.',
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: '5. Rejection',
      description:
        'Proposals that fail to reach quorum or receive majority Against votes are permanently marked as rejected and recorded on-chain.',
    },
  ];

  const votingRules = [
    {
      title: 'Quorum Requirement',
      value: governanceRules.quorum.toLocaleString() + ' votes',
      description: 'Minimum participation required for proposal to be valid',
    },
    {
      title: 'Voting Period',
      value: governanceRules.votingPeriod,
      description: 'Duration from voting start to deadline',
    },
    {
      title: 'Proposal Threshold',
      value: governanceRules.proposalThreshold,
      description: 'Minimum tokens required to submit proposal',
    },
    {
      title: 'Voting Power',
      value: governanceRules.votingPower,
      description: 'Equal voting rights for all participants',
    },
    {
      title: 'Execution Delay',
      value: governanceRules.executionDelay,
      description: 'Security timelock before approved proposals execute',
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Governance Framework</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            CampusDAO operates on transparent, democratic principles. Understanding our governance process
            ensures informed participation in campus funding decisions.
          </p>
        </div>

        {/* Proposal Lifecycle */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Proposal Lifecycle</h2>
          <div className="space-y-6">
            {lifecycle.map((step, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-teal-500 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-900">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voting Rules */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Voting Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {votingRules.map((rule, index) => (
              <Card key={index} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{rule.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-teal-400 mb-2">{rule.value}</p>
                  <p className="text-sm text-slate-400">{rule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Voting Mechanism */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Voting Mechanism: One Wallet, One Vote</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              CampusDAO implements a <strong className="text-white">one-wallet-one-vote</strong> system to
              ensure democratic participation. Each connected wallet address is entitled to cast exactly one
              vote per proposal, regardless of token holdings or student status.
            </p>
            <p>
              This approach prevents wealth concentration from influencing governance outcomes and ensures
              that every student has an equal voice in funding decisions.
            </p>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mt-6">
              <h3 className="text-white font-semibold mb-3">Key Voting Principles:</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>All votes are recorded permanently on the blockchain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>Votes cannot be changed or deleted after submission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>Voting is pseudonymous (wallet addresses are visible, not identities)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>Anyone can verify vote counts independently on-chain</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Smart Contract Role */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Role of Smart Contracts</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            CampusDAO governance is enforced through audited smart contracts deployed on the blockchain.
            These contracts automate the entire governance lifecycle, eliminating human intervention and
            ensuring that rules are applied consistently and transparently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3">What Smart Contracts Handle:</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Proposal submission and validation</li>
                <li>• Vote counting and quorum verification</li>
                <li>• Automatic execution of approved proposals</li>
                <li>• Treasury fund disbursement</li>
                <li>• Timelock enforcement for security</li>
              </ul>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3">Security & Transparency:</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• All contract code is open-source and auditable</li>
                <li>• No single party can modify governance rules</li>
                <li>• Upgrades require community approval</li>
                <li>• Emergency pause functionality for critical bugs</li>
                <li>• Multi-signature safeguards for treasury</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Participation */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How to Participate</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            CampusDAO governance is open to all students. Whether you want to vote on proposals, submit
            funding requests, or simply observe the process, participation requires only a connected wallet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">As a Voter</h3>
              <p className="text-slate-400 text-sm">
                Connect your wallet, review proposals, and cast votes during the voting period.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">As a Club</h3>
              <p className="text-slate-400 text-sm">
                Submit detailed funding proposals with clear budgets and expected outcomes.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">As an Observer</h3>
              <p className="text-slate-400 text-sm">
                Browse proposals, view voting results, and verify all transactions on-chain.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Governance;
