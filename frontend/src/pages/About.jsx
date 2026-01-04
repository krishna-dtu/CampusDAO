import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Target, Users, Shield, TrendingUp } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Transparency',
      description: 'Every decision, vote, and transaction is publicly verifiable on the blockchain.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Inclusivity',
      description: 'Every student has an equal voice in funding decisions through democratic voting.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Accountability',
      description: 'Immutable records ensure all stakeholders can verify how funds are allocated and spent.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Leveraging blockchain technology to solve real institutional governance challenges.',
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About CampusDAO</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            A decentralized governance platform designed to transform campus funding through transparency,
            accountability, and student participation.
          </p>
        </div>

        {/* Mission */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            CampusDAO exists to solve a fundamental problem in campus governance: centralized funding
            systems that operate without transparency, accountability, or meaningful student participation.
          </p>
          <p className="text-slate-300 leading-relaxed">
            By leveraging blockchain technology and decentralized autonomous organization (DAO) principles,
            we enable universities and student bodies to implement fair, transparent, and verifiable funding
            processes that put decision-making power where it belongs—in the hands of the entire student
            community.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            We envision a future where campus governance operates with the same level of transparency and
            accountability as modern decentralized organizations. Where every student can verify funding
            decisions, where administrative bias is eliminated through immutable voting records, and where
            clubs and societies compete for resources based on merit rather than political connections.
          </p>
          <p className="text-slate-300 leading-relaxed">
            CampusDAO is not just a platform—it's a movement toward institutional-grade Web3 governance
            that universities can adopt to serve their communities better.
          </p>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-teal-500 transition-colors"
              >
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4 text-slate-900">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Who CampusDAO Serves</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Students</h3>
              <p className="text-slate-400 leading-relaxed">
                Gain direct voting power over how activity fees are allocated. Participate in transparent
                governance and ensure your voice is heard in funding decisions that affect campus life.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Student Clubs & Societies</h3>
              <p className="text-slate-400 leading-relaxed">
                Submit funding proposals with confidence that decisions will be made fairly based on merit.
                Access transparent processes that replace subjective administrative approval with community
                consensus.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">University Administration</h3>
              <p className="text-slate-400 leading-relaxed">
                Demonstrate institutional commitment to transparency and student empowerment. Reduce
                administrative burden while increasing accountability through automated, on-chain governance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Student Governments</h3>
              <p className="text-slate-400 leading-relaxed">
                Implement modern governance infrastructure that provides verifiable accountability to
                constituents. Replace manual processes with blockchain-based systems that ensure fair
                representation.
              </p>
            </div>
          </div>
        </section>

        {/* Why Decentralized Governance */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Decentralized Governance for Campuses?
          </h2>
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              Traditional campus funding systems suffer from three critical flaws:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-white">Opacity:</strong> Students cannot see how decisions are
                  made or who influences outcomes.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-white">Centralization:</strong> A small group controls all funding
                  decisions, creating potential for bias and favoritism.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-white">No Audit Trail:</strong> Once decisions are made, there's no
                  verifiable record of the process or spending.
                </span>
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed pt-4">
              CampusDAO solves these problems by recording every proposal, vote, and transaction on the
              blockchain—creating an immutable, publicly verifiable record that ensures accountability and
              fair representation.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-slate-900 border border-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-6">
            Learn how CampusDAO works or start participating in campus governance today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/governance">
              <Button className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium px-8 py-6">
                Governance Framework
              </Button>
            </Link>
            <Link to="/proposals">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6"
              >
                View Proposals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
