import React from 'react';
import { AlertCircle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Disclaimer & Legal Notice</h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Important information regarding the use of CampusDAO governance platform.
          </p>
        </div>

        {/* Notice */}
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-6 mb-12 flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-teal-400 font-semibold mb-2">Platform Purpose</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              CampusDAO is a decentralized governance platform designed for transparent campus funding
              decisions. By using this platform, you acknowledge and agree to the terms outlined below.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Non-Custodial */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Non-Custodial Platform</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>
                CampusDAO is a non-custodial platform. We do not control, store, or have access to your
                wallet, private keys, or funds. You are solely responsible for:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Securing your wallet and private keys</li>
                <li>• Managing your wallet access credentials</li>
                <li>• Protecting your seed phrases and recovery information</li>
                <li>• All transactions initiated from your wallet</li>
              </ul>
              <p className="pt-2">
                Loss of wallet access results in permanent loss of voting rights and any associated tokens.
                CampusDAO cannot recover, restore, or transfer wallets under any circumstances.
              </p>
            </div>
          </section>

          {/* Governance Responsibility */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Governance Responsibility</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>
                Participation in CampusDAO governance carries responsibility. All participants are expected
                to:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Review proposals carefully before voting</li>
                <li>• Understand that all votes are immutable and permanent</li>
                <li>• Accept that voting outcomes are final and binding</li>
                <li>• Acknowledge that no party can override community decisions</li>
              </ul>
              <p className="pt-2">
                CampusDAO does not guarantee any specific outcome from governance decisions. The community
                collectively determines funding allocations through transparent voting.
              </p>
            </div>
          </section>

          {/* Smart Contract Risks */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Smart Contract Risks</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>
                CampusDAO operates through smart contracts deployed on blockchain infrastructure. While our
                contracts are audited, users acknowledge:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Smart contracts may contain undiscovered vulnerabilities</li>
                <li>• Blockchain networks can experience outages or congestion</li>
                <li>• Transaction fees (gas costs) fluctuate based on network conditions</li>
                <li>• Once executed, blockchain transactions are irreversible</li>
              </ul>
              <p className="pt-2">
                CampusDAO is not liable for losses resulting from smart contract bugs, blockchain network
                issues, or transaction errors. Users interact with smart contracts at their own risk.
              </p>
            </div>
          </section>

          {/* No Financial Advice */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. No Financial Advice</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>
                CampusDAO does not provide financial, investment, legal, or tax advice. Information presented
                on this platform is for educational and governance purposes only. Users should:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Conduct independent research before participating</li>
                <li>• Consult qualified professionals for financial or legal guidance</li>
                <li>• Understand local regulations regarding blockchain participation</li>
                <li>• Assess their own risk tolerance before voting or submitting proposals</li>
              </ul>
            </div>
          </section>

          {/* Platform Usage Scope */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Platform Usage Scope</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>CampusDAO is designed exclusively for campus governance and funding decisions. Users agree:</p>
              <ul className="space-y-2 ml-6">
                <li>• Not to use the platform for illegal activities</li>
                <li>• Not to submit fraudulent or misleading proposals</li>
                <li>• Not to attempt to manipulate voting through multiple wallets or coordination</li>
                <li>• To comply with applicable university policies and local laws</li>
              </ul>
              <p className="pt-2">
                CampusDAO reserves the right to implement anti-manipulation measures and cooperate with
                institutional authorities if fraudulent activity is detected.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>
                To the maximum extent permitted by law, CampusDAO and its contributors are not liable for:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Loss of funds due to wallet mismanagement or theft</li>
                <li>• Damages resulting from smart contract vulnerabilities</li>
                <li>• Losses from governance decisions or proposal outcomes</li>
                <li>• Service interruptions or blockchain network issues</li>
                <li>• Any indirect, consequential, or incidental damages</li>
              </ul>
              <p className="pt-2">
                Users participate in CampusDAO governance at their own risk and accept full responsibility for
                their actions on the platform.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>
                The CampusDAO platform interface and documentation are provided under open-source licenses.
                Smart contract code is publicly auditable. However:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• The CampusDAO name and branding are protected</li>
                <li>• User-submitted proposals remain the intellectual property of submitters</li>
                <li>• Platform usage does not grant rights to CampusDAO trademarks</li>
              </ul>
            </div>
          </section>

          {/* Modifications */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. Modifications to Terms</h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              <p>
                CampusDAO reserves the right to modify these terms and platform functionality. Material
                changes will be announced through the platform interface. Continued use after modifications
                constitutes acceptance of updated terms.
              </p>
              <p>
                For governance rule changes (quorum, voting periods, etc.), modifications require community
                approval through the standard proposal process.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact & Inquiries</h2>
            <div className="text-slate-300 leading-relaxed">
              <p className="mb-3">
                For questions about CampusDAO, governance procedures, or technical issues, contact:
              </p>
              <p className="text-teal-400">
                <a href="mailto:contact@campusdao.org" className="hover:underline">
                  contact@campusdao.org
                </a>
              </p>
              <p className="text-slate-400 text-sm mt-4">Last updated: February 2025</p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-8">
            <h2 className="text-xl font-bold text-teal-400 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By connecting your wallet and interacting with CampusDAO, you acknowledge that you have read,
              understood, and agree to be bound by this disclaimer and all associated terms. If you do not
              agree, do not use the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
