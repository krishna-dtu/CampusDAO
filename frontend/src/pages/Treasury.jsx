import React from 'react';
import { treasuryData, expenseLedger } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { DollarSign, TrendingUp, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';

const Treasury = () => {
  const [copiedHash, setCopiedHash] = React.useState(null);

  const copyToClipboard = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const formatHash = (hash) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Treasury & Transparency</h1>
          <p className="text-lg text-slate-400">
            Complete visibility into campus funding allocation and spending. All transactions are
            permanently recorded on-chain for public verification.
          </p>
        </div>

        {/* Treasury Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardDescription className="text-slate-400">Total Funds</CardDescription>
              <CardTitle className="text-3xl font-bold text-white flex items-center">
                <DollarSign className="w-8 h-8 mr-2 text-teal-500" />
                ${treasuryData.totalFunds.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Total funding available for campus initiatives
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardDescription className="text-slate-400">Allocated Funds</CardDescription>
              <CardTitle className="text-3xl font-bold text-white flex items-center">
                <TrendingUp className="w-8 h-8 mr-2 text-teal-500" />
                ${treasuryData.allocatedFunds.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Funds committed to approved proposals
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardDescription className="text-slate-400">Remaining Balance</CardDescription>
              <CardTitle className="text-3xl font-bold text-white flex items-center">
                <DollarSign className="w-8 h-8 mr-2 text-teal-500" />
                ${treasuryData.remainingBalance.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Available for future proposals
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transparency Notice */}
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-6 mb-12 flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-teal-400 font-semibold mb-2">Immutable Audit Trail</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every transaction in the expense ledger below is permanently recorded on the blockchain.
              Anyone can independently verify these transactions using the provided transaction hashes.
              This ensures complete accountability and prevents retroactive alterations to financial
              records.
            </p>
          </div>
        </div>

        {/* Expense Ledger */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-2">Expense Ledger</h2>
            <p className="text-slate-400">
              Complete history of approved funding disbursements with verifiable transaction hashes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300 font-semibold">Date</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Club</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Purpose</TableHead>
                  <TableHead className="text-slate-300 font-semibold text-right">Amount</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Transaction Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseLedger.map((expense) => (
                  <TableRow key={expense.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="text-slate-300">
                      {new Date(expense.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-white font-medium">{expense.club}</TableCell>
                    <TableCell className="text-slate-400 max-w-xs">
                      <div className="truncate">{expense.purpose}</div>
                    </TableCell>
                    <TableCell className="text-white font-semibold text-right">
                      ${expense.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="text-teal-400 text-xs">{formatHash(expense.txHash)}</code>
                        <button
                          onClick={() => copyToClipboard(expense.txHash)}
                          className="text-slate-400 hover:text-teal-400 transition-colors"
                        >
                          {copiedHash === expense.txHash ? (
                            <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Verification Section */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Public Verification</h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            All transaction hashes above can be independently verified on the blockchain explorer. Click
            the copy icon next to any hash to copy it to your clipboard, then paste it into a blockchain
            explorer to view the complete transaction details, including timestamp, block number, and
            contract interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              View on Block Explorer
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Download Ledger Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
