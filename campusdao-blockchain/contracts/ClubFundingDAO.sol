// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ClubFundingDAO
 * @dev Decentralized College Club Funding & Governance Platform
 * 
 * This contract enables:
 * - Clubs to submit funding proposals
 * - Students to vote on proposals (one wallet = one vote)
 * - Automatic fund distribution based on voting outcomes
 * - Full transparency via on-chain events and public data
 * 
 * No ERC-20 tokens, no complex governance — just essential DAO logic.
 * Built for hackathon demonstration and college campus use.
 */

contract ClubFundingDAO {
    // ========== ENUMS & TYPES ==========
    
    enum ProposalState {
        ACTIVE,      // Voting in progress
        APPROVED,    // Voting ended, majority YES
        REJECTED,    // Voting ended, majority NO or quorum not met
        EXECUTED     // Funds withdrawn by club
    }
    
    struct Proposal {
        uint256 id;                    // Unique proposal ID
        string clubName;               // Name of the club requesting funds
        string title;                  // Proposal title (e.g., "Event Budget")
        string description;            // Detailed proposal description
        uint256 requestedAmount;       // Amount in wei (e.g., 1 ether = 10^18 wei)
        address clubAddress;           // Club wallet address for fund withdrawal
        
        uint256 createdAtBlock;        // Block number when proposal was created
        uint256 votingStartBlock;      // Block when voting begins
        uint256 votingEndBlock;        // Block when voting ends
        
        uint256 yesVotes;              // Count of YES votes
        uint256 noVotes;               // Count of NO votes
        uint256 totalVoters;           // Total unique voters for this proposal
        
        ProposalState state;           // Current state of proposal
        bool fundsReleased;            // Prevent double withdrawal
    }
    
    // ========== STATE VARIABLES ==========
    
    address public admin;              // Contract deployer (no special post-deployment powers)
    
    uint256 public proposalCount = 0;  // Total proposals created (auto-incrementing ID)
    mapping(uint256 => Proposal) public proposals;  // proposalID => Proposal data
    
    // Voting tracking: proposalID => (voter address => hasVoted)
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    // Governance parameters
    uint256 public constant VOTING_PERIOD_BLOCKS = 50400;  // ~7 days on Ethereum (12s blocks)
    uint256 public constant QUORUM_PERCENTAGE = 30;         // 30% of registered voters must participate
    
    // Registered students (eligible voters)
    mapping(address => bool) public registeredVoters;
    uint256 public totalRegisteredVoters = 0;
    
    // Treasury tracking
    uint256 public totalFundsAvailable = 0;
    uint256 public totalFundsAllocated = 0;
    
    // ========== EVENTS ==========
    
    event ProposalCreated(
        uint256 indexed proposalID,
        string clubName,
        string title,
        uint256 requestedAmount,
        address indexed clubAddress,
        uint256 votingEndBlock
    );
    
    event VoteCast(
        uint256 indexed proposalID,
        address indexed voter,
        bool choice,  // true = YES, false = NO
        uint256 currentYesVotes,
        uint256 currentNoVotes
    );
    
    event ProposalApproved(
        uint256 indexed proposalID,
        string clubName,
        uint256 requestedAmount,
        uint256 yesVotes,
        uint256 noVotes
    );
    
    event ProposalRejected(
        uint256 indexed proposalID,
        string clubName,
        uint256 yesVotes,
        uint256 noVotes,
        string reason  // "Not enough votes" or "Majority NO"
    );
    
    event FundsReleased(
        uint256 indexed proposalID,
        address indexed clubAddress,
        uint256 amount,
        string clubName
    );
    
    event VoterRegistered(address indexed voter);
    event VoterUnregistered(address indexed voter);
    event TreasuryFunded(uint256 amount);
    
    // ========== MODIFIERS ==========
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyRegisteredVoter() {
        require(registeredVoters[msg.sender], "Not a registered voter");
        _;
    }
    
    modifier proposalExists(uint256 _proposalID) {
        require(_proposalID < proposalCount, "Proposal does not exist");
        _;
    }
    
    // ========== CONSTRUCTOR ==========
    
    constructor() {
        admin = msg.sender;
    }
    
    // ========== VOTER REGISTRATION (Admin-controlled for hackathon) ==========
    
    /**
     * @dev Register a student wallet as an eligible voter
     * In a real deployment, this could be connected to college ID verification
     */
    function registerVoter(address _voter) external onlyAdmin {
        require(_voter != address(0), "Invalid address");
        require(!registeredVoters[_voter], "Already registered");
        
        registeredVoters[_voter] = true;
        totalRegisteredVoters++;
        
        emit VoterRegistered(_voter);
    }
    
    /**
     * @dev Register multiple voters in batch (gas efficient for setup)
     */
    function registerVotersBatch(address[] calldata _voters) external onlyAdmin {
        for (uint256 i = 0; i < _voters.length; i++) {
            address voter = _voters[i];
            if (!registeredVoters[voter]) {
                registeredVoters[voter] = true;
                totalRegisteredVoters++;
                emit VoterRegistered(voter);
            }
        }
    }
    
    /**
     * @dev Unregister a voter (e.g., graduated student)
     */
    function unregisterVoter(address _voter) external onlyAdmin {
        require(registeredVoters[_voter], "Not registered");
        
        registeredVoters[_voter] = false;
        totalRegisteredVoters--;
        
        emit VoterUnregistered(_voter);
    }
    
    // ========== PROPOSAL CREATION ==========
    
    /**
     * @dev Submit a funding proposal
     * @param _clubName Name of the club (string)
     * @param _title Short title of the proposal
     * @param _description Detailed description of funding use
     * @param _requestedAmount Amount in wei (e.g., 1 ether = 10^18 wei)
     * @param _clubAddress Wallet address where funds will be sent if approved
     */
    function createProposal(
        string memory _clubName,
        string memory _title,
        string memory _description,
        uint256 _requestedAmount,
        address _clubAddress
    ) external {
        // Validation
        require(_requestedAmount > 0, "Amount must be greater than 0");
        require(_clubAddress != address(0), "Invalid club address");
        require(bytes(_clubName).length > 0, "Club name required");
        require(bytes(_title).length > 0, "Title required");
        require(_requestedAmount <= totalFundsAvailable, "Insufficient treasury funds");
        
        // Create new proposal
        uint256 newProposalID = proposalCount;
        uint256 votingEndBlock = block.number + VOTING_PERIOD_BLOCKS;
        
        proposals[newProposalID] = Proposal({
            id: newProposalID,
            clubName: _clubName,
            title: _title,
            description: _description,
            requestedAmount: _requestedAmount,
            clubAddress: _clubAddress,
            createdAtBlock: block.number,
            votingStartBlock: block.number,
            votingEndBlock: votingEndBlock,
            yesVotes: 0,
            noVotes: 0,
            totalVoters: 0,
            state: ProposalState.ACTIVE,
            fundsReleased: false
        });
        
        // Allocate funds immediately (hold in escrow)
        totalFundsAllocated += _requestedAmount;
        
        // Increment counter
        proposalCount++;
        
        // Emit event
        emit ProposalCreated(
            newProposalID,
            _clubName,
            _title,
            _requestedAmount,
            _clubAddress,
            votingEndBlock
        );
    }
    
    // ========== VOTING MECHANISM ==========
    
    /**
     * @dev Cast a vote on a proposal
     * @param _proposalID ID of the proposal to vote on
     * @param _choice true for YES, false for NO
     */
    function vote(uint256 _proposalID, bool _choice)
        external
        proposalExists(_proposalID)
        onlyRegisteredVoter
    {
        Proposal storage proposal = proposals[_proposalID];
        
        // Validation
        require(proposal.state == ProposalState.ACTIVE, "Proposal not in voting period");
        require(block.number <= proposal.votingEndBlock, "Voting period has ended");
        require(!hasVoted[_proposalID][msg.sender], "Already voted on this proposal");
        
        // Record vote
        hasVoted[_proposalID][msg.sender] = true;
        
        if (_choice) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }
        proposal.totalVoters++;
        
        // Emit event
        emit VoteCast(
            _proposalID,
            msg.sender,
            _choice,
            proposal.yesVotes,
            proposal.noVotes
        );
    }
    
    // ========== PROPOSAL RESOLUTION ==========
    
    /**
     * @dev Finalize voting and determine outcome
     * Anyone can call this after the voting period ends (transparent resolution)
     */
    function finalizeProposal(uint256 _proposalID)
        external
        proposalExists(_proposalID)
    {
        Proposal storage proposal = proposals[_proposalID];
        
        // Check if voting period has ended
        require(block.number > proposal.votingEndBlock, "Voting period not ended");
        require(proposal.state == ProposalState.ACTIVE, "Proposal already finalized");
        
        // Calculate quorum requirement
        uint256 quorumRequired = (totalRegisteredVoters * QUORUM_PERCENTAGE) / 100;
        
        // Determine outcome
        if (proposal.totalVoters < quorumRequired) {
            // Quorum not met → REJECTED
            proposal.state = ProposalState.REJECTED;
            totalFundsAllocated -= proposal.requestedAmount;  // Release escrow
            
            emit ProposalRejected(
                _proposalID,
                proposal.clubName,
                proposal.yesVotes,
                proposal.noVotes,
                "Quorum not met"
            );
        } else if (proposal.yesVotes > proposal.noVotes) {
            // Majority YES → APPROVED
            proposal.state = ProposalState.APPROVED;
            
            emit ProposalApproved(
                _proposalID,
                proposal.clubName,
                proposal.requestedAmount,
                proposal.yesVotes,
                proposal.noVotes
            );
        } else {
            // Majority NO or tie → REJECTED
            proposal.state = ProposalState.REJECTED;
            totalFundsAllocated -= proposal.requestedAmount;  // Release escrow
            
            emit ProposalRejected(
                _proposalID,
                proposal.clubName,
                proposal.yesVotes,
                proposal.noVotes,
                "Majority voted NO"
            );
        }
    }
    
    // ========== FUND RELEASE & EXECUTION ==========
    
    /**
     * @dev Release approved funds to the club
     * Can only be called by the club address itself
     */
    function withdrawFunds(uint256 _proposalID)
        external
        proposalExists(_proposalID)
    {
        Proposal storage proposal = proposals[_proposalID];
        
        // Validation
        require(proposal.state == ProposalState.APPROVED, "Proposal not approved");
        require(msg.sender == proposal.clubAddress, "Only club can withdraw funds");
        require(!proposal.fundsReleased, "Funds already released");
        require(address(this).balance >= proposal.requestedAmount, "Insufficient contract balance");
        
        // Mark as released (prevent re-entrancy)
        proposal.fundsReleased = true;
        proposal.state = ProposalState.EXECUTED;
        totalFundsAllocated -= proposal.requestedAmount;
        
        // Transfer funds
        (bool success, ) = payable(proposal.clubAddress).call{
            value: proposal.requestedAmount
        }("");
        require(success, "Transfer failed");
        
        // Emit event
        emit FundsReleased(
            _proposalID,
            proposal.clubAddress,
            proposal.requestedAmount,
            proposal.clubName
        );
    }
    
    // ========== TREASURY MANAGEMENT ==========
    
    /**
     * @dev Fallback function to receive ETH donations to the treasury
     */
    receive() external payable {
        totalFundsAvailable += msg.value;
        emit TreasuryFunded(msg.value);
    }
    
    /**
     * @dev Explicit function to fund the treasury
     */
    function fundTreasury() external payable {
        require(msg.value > 0, "Must send ETH");
        totalFundsAvailable += msg.value;
        emit TreasuryFunded(msg.value);
    }
    
    // ========== PUBLIC GETTER FUNCTIONS (TRANSPARENCY) ==========
    
    /**
     * @dev Get all proposal details
     */
    function getProposal(uint256 _proposalID)
        external
        view
        proposalExists(_proposalID)
        returns (Proposal memory)
    {
        return proposals[_proposalID];
    }
    
    /**
     * @dev Get current proposal state
     */
    function getProposalState(uint256 _proposalID)
        external
        view
        proposalExists(_proposalID)
        returns (string memory)
    {
        ProposalState state = proposals[_proposalID].state;
        if (state == ProposalState.ACTIVE) return "ACTIVE";
        if (state == ProposalState.APPROVED) return "APPROVED";
        if (state == ProposalState.REJECTED) return "REJECTED";
        return "EXECUTED";
    }
    
    /**
     * @dev Get vote counts for a proposal
     */
    function getVoteCounts(uint256 _proposalID)
        external
        view
        proposalExists(_proposalID)
        returns (uint256 yes, uint256 no, uint256 totalVoters)
    {
        Proposal storage proposal = proposals[_proposalID];
        return (proposal.yesVotes, proposal.noVotes, proposal.totalVoters);
    }
    
    /**
     * @dev Check if a wallet has voted on a proposal
     */
    function hasUserVoted(uint256 _proposalID, address _voter)
        external
        view
        proposalExists(_proposalID)
        returns (bool)
    {
        return hasVoted[_proposalID][_voter];
    }
    
    /**
     * @dev Get treasury balance information
     */
    function getTreasuryInfo()
        external
        view
        returns (uint256 available, uint256 allocated, uint256 totalBalance)
    {
        return (
            totalFundsAvailable,
            totalFundsAllocated,
            address(this).balance
        );
    }
    
    /**
     * @dev Get governance parameters
     */
    function getGovernanceParams()
        external
        view
        returns (uint256 votingPeriodBlocks, uint256 quorumPercentage, uint256 totalVoters)
    {
        return (VOTING_PERIOD_BLOCKS, QUORUM_PERCENTAGE, totalRegisteredVoters);
    }
}
