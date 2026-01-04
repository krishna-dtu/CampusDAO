# CampusDAO - Implementation Contracts

## Current Status: Frontend-Only MVP with Mock Data ✅

### Completed Pages (10/10)
1. **Landing Page** (`/`) - Problem statement, solution overview, key features
2. **Proposals Dashboard** (`/proposals`) - Browse, search, filter, and sort proposals
3. **Proposal Detail** (`/proposals/:id`) - Vote on proposals, view voting breakdown
4. **Submit Proposal** (`/submit`) - Form to submit funding requests
5. **Treasury & Transparency** (`/treasury`) - Treasury overview and expense ledger
6. **About CampusDAO** (`/about`) - Mission, vision, values
7. **Governance Framework** (`/governance`) - Proposal lifecycle, voting rules
8. **Documentation** (`/docs`) - How proposals, voting, and verification work
9. **FAQ** (`/faq`) - 16 comprehensive FAQs
10. **Disclaimer** (`/disclaimer`) - Legal notices and terms

### Design Implementation
- **Color Palette**: Deep navy (slate-900/950), slate grays, teal accents (#14b8a6)
- **Typography**: Inter font family (weights 300-800)
- **Aesthetic**: Institutional fintech × academic portal (Snapshot.org inspired)
- **Animations**: Minimal, subtle transitions only (0.15s ease)
- **No gradients, no playful UI elements**

### Mock Data Structure (`/app/frontend/src/mock.js`)
```javascript
- proposals[] - 12 realistic campus funding proposals
  - Active, Approved, Rejected statuses
  - Voting data, quorum, descriptions
  
- treasuryData{} - Total/allocated/remaining funds
  
- expenseLedger[] - 10 historical transactions with tx hashes
  
- governanceRules{} - Quorum, voting periods, thresholds
```

### Components
- **Header** - Navigation, wallet connect button, mobile responsive
- **Footer** - 3-column institutional layout
- **WalletModal** - MetaMask, WalletConnect, Coinbase Wallet (UI only)

### Interactive Features (Frontend-Only)
- ✅ Wallet connection simulation
- ✅ Search and filter proposals
- ✅ Vote casting (simulated with state management)
- ✅ Proposal submission form with validation
- ✅ Copy transaction hashes to clipboard
- ✅ Responsive mobile/tablet/desktop

### What's Currently Mocked (Frontend Only)
- Wallet connection (simulates connected state)
- Vote casting (updates local state, shows success message)
- Proposal submission (validates and shows success)
- Transaction hashes (placeholder blockchain hashes)
- All data in mock.js (proposals, treasury, expenses)

## Next Phase: Backend Integration (If Requested)

### Backend Requirements
1. **Database Models**
   - Proposal (club_name, title, description, amount, status, votes_for, votes_against)
   - Vote (wallet_address, proposal_id, vote_type, timestamp)
   - Transaction (club, amount, purpose, tx_hash, date)
   - Treasury (total_funds, allocated_funds, remaining_balance)

2. **API Endpoints**
   - GET /api/proposals - List all proposals with filters
   - GET /api/proposals/:id - Get single proposal
   - POST /api/proposals - Submit new proposal
   - POST /api/proposals/:id/vote - Cast vote
   - GET /api/treasury - Get treasury data
   - GET /api/treasury/ledger - Get expense ledger

3. **Frontend Integration**
   - Replace mock.js imports with API calls
   - Use axios for HTTP requests (already installed)
   - Add loading states and error handling
   - Implement real-time vote updates

### Notes
- All pages are functional with mock data
- Design follows institutional Web3 governance standards
- No hackathon references or demo language
- Platform is production-ready for backend integration
