import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { parseEther } from 'ethers'
import useContractInteraction from '../hooks/useContractInteraction'
import { useWeb3 } from '../hooks/useWeb3'

const SubmitProposal = () => {
  const [formData, setFormData] = useState({
    clubName: '',
    title: '',
    description: '',
    requestedAmount: '',
    intendedUse: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { createProposal, isLoading, txPending, lastError } = useContractInteraction()
  const { isConnected, account } = useWeb3()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clubName.trim()) {
      newErrors.clubName = 'Club name is required';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Proposal title is required';
    }

    if (!formData.description.trim() || formData.description.length < 100) {
      newErrors.description = 'Description must be at least 100 characters';
    }

    if (!formData.requestedAmount || parseFloat(formData.requestedAmount) <= 0) {
      newErrors.requestedAmount = 'Valid amount is required';
    }

    if (!formData.intendedUse.trim() || formData.intendedUse.length < 50) {
      newErrors.intendedUse = 'Intended use must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (!isConnected) {
        setErrors({ general: 'Connect your wallet to submit a proposal' })
        return
      }

      (async () => {
        try {
          const requestedAmountWei = parseEther(String(formData.requestedAmount || '0'))
          await createProposal({
            clubName: formData.clubName,
            title: formData.title,
            description: `${formData.description}\n\nIntended use: ${formData.intendedUse}`,
            requestedAmount: requestedAmountWei,
            clubAddress: account || null,
          })
          setSubmitted(true)
        } catch (err) {
          console.error('submit error', err)
        }
      })()
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-950 min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Proposal Submitted Successfully!</h2>
            <p className="text-slate-400 mb-6">
              Your funding proposal has been recorded on-chain and is now pending review. The voting
              period will begin within 48 hours.
            </p>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-400">
                <strong className="text-white">Transaction Hash:</strong>
                <br />
                0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Submit Another Proposal
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-slate-900">
                View My Proposals
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Submit Funding Proposal</h1>
          <p className="text-lg text-slate-400">
            Request funding for your club's initiatives. All proposals are publicly visible and subject
            to community voting.
          </p>
        </div>

        {/* Wallet Required Notice */}
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 mb-8 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-teal-400 font-medium mb-1">Wallet Connection Required</p>
            <p className="text-slate-400 text-sm">
              You must connect a wallet to submit proposals. All submissions are recorded on-chain with
              your wallet address.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <div className="space-y-6">
            {/* Club Name */}
            <div>
              <Label htmlFor="clubName" className="text-white font-medium">
                Club Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="clubName"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                className="mt-2 bg-slate-800 border-slate-700 text-white"
                placeholder="e.g., Computer Science Society"
              />
              {errors.clubName && (
                <p className="text-red-500 text-sm mt-1">{errors.clubName}</p>
              )}
            </div>

            {/* Proposal Title */}
            <div>
              <Label htmlFor="title" className="text-white font-medium">
                Proposal Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 bg-slate-800 border-slate-700 text-white"
                placeholder="e.g., Annual Hackathon Infrastructure & Prizes"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Requested Amount */}
            <div>
              <Label htmlFor="requestedAmount" className="text-white font-medium">
                Requested Amount ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="requestedAmount"
                name="requestedAmount"
                type="number"
                value={formData.requestedAmount}
                onChange={handleChange}
                className="mt-2 bg-slate-800 border-slate-700 text-white"
                placeholder="e.g., 5000"
              />
              {errors.requestedAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.requestedAmount}</p>
              )}
            </div>

            {/* Detailed Description */}
            <div>
              <Label htmlFor="description" className="text-white font-medium">
                Detailed Description <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-slate-400 mt-1 mb-2">
                Provide a comprehensive explanation of your proposal. Include event details, expected
                outcomes, and community impact. Minimum 100 characters.
              </p>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-2 bg-slate-800 border-slate-700 text-white min-h-[150px]"
                placeholder="Describe your proposal in detail..."
              />
              <div className="flex justify-between mt-1">
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
                <p className="text-slate-500 text-sm ml-auto">
                  {formData.description.length} characters
                </p>
              </div>
            </div>

            {/* Intended Use of Funds */}
            <div>
              <Label htmlFor="intendedUse" className="text-white font-medium">
                Intended Use of Funds <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-slate-400 mt-1 mb-2">
                Provide a detailed breakdown of how funds will be allocated. Minimum 50 characters.
              </p>
              <Textarea
                id="intendedUse"
                name="intendedUse"
                value={formData.intendedUse}
                onChange={handleChange}
                className="mt-2 bg-slate-800 border-slate-700 text-white min-h-[120px]"
                placeholder="e.g., Cloud infrastructure: $2000, Prizes: $3500, Food & beverages: $1500..."
              />
              <div className="flex justify-between mt-1">
                {errors.intendedUse && (
                  <p className="text-red-500 text-sm">{errors.intendedUse}</p>
                )}
                <p className="text-slate-500 text-sm ml-auto">
                  {formData.intendedUse.length} characters
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <Button
              type="submit"
              disabled={isLoading || txPending}
              className="w-full bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium py-6 text-lg"
            >
              {isLoading || txPending ? 'Submitting...' : 'Submit Proposal for Voting'}
            </Button>
            <p className="text-slate-500 text-sm text-center mt-4">
              By submitting, you acknowledge that this proposal will be publicly visible and permanently
              recorded on-chain.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProposal;
