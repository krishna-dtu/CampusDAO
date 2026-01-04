import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/proposals"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Proposals
                </Link>
              </li>
              <li>
                <Link
                  to="/submit"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Submit Proposal
                </Link>
              </li>
              <li>
                <Link
                  to="/treasury"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Treasury
                </Link>
              </li>
              <li>
                <Link
                  to="/governance"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/docs"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/governance"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Governance Framework
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Organization
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  About CampusDAO
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@campusdao.org"
                  className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">CD</span>
              </div>
              <span className="text-slate-400 text-sm">
                © 2025 CampusDAO. Decentralized governance for transparent campus funding.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
