import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Proposals from './pages/Proposals';
import ProposalDetail from './pages/ProposalDetail';
import SubmitProposal from './pages/SubmitProposal';
import Treasury from './pages/Treasury';
import About from './pages/About';
import Governance from './pages/Governance';
import Documentation from './pages/Documentation';
import FAQ from './pages/FAQ';
import Disclaimer from './pages/Disclaimer';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-950">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/proposals/:id" element={<ProposalDetail />} />
              <Route path="/submit" element={<SubmitProposal />} />
              <Route path="/treasury" element={<Treasury />} />
              <Route path="/about" element={<About />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Web3Provider>
  );
}

export default App;
