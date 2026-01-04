const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClubFundingDAO", function () {
  let dao;
  let admin;
  let voter1;
  let voter2;
  let voter3;
  let clubAddress1;
  let clubAddress2;

  beforeEach(async function () {
    // Get signers
    [admin, voter1, voter2, voter3, clubAddress1, clubAddress2] = await ethers.getSigners();

    // Deploy contract
    const ClubFundingDAO = await ethers.getContractFactory("ClubFundingDAO");
    dao = await ClubFundingDAO.deploy();
    await dao.deployed();

    // Register voters
    await dao.registerVotersBatch([voter1.address, voter2.address, voter3.address]);

    // Fund the treasury with 10 ETH
    await dao.fundTreasury({ value: ethers.utils.parseEther("10") });
  });

  // ========== DEPLOYMENT TESTS ==========

  describe("Deployment", function () {
    it("should deploy successfully", async function () {
      expect(dao.address).to.properAddress;
    });

    it("should set the admin to deployer", async function () {
      expect(await dao.admin()).to.equal(admin.address);
    });

    it("should initialize proposal count to 0", async function () {
      expect(await dao.proposalCount()).to.equal(0);
    });

    it("should set governance parameters correctly", async function () {
      const params = await dao.getGovernanceParams();
      expect(params[0]).to.equal(50400); // VOTING_PERIOD_BLOCKS
      expect(params[1]).to.equal(30);    // QUORUM_PERCENTAGE
    });
  });

  // ========== VOTER REGISTRATION TESTS ==========

  describe("Voter Registration", function () {
    it("should register a single voter", async function () {
      const newVoter = ethers.Wallet.createRandom();
      await dao.registerVoter(newVoter.address);
      expect(await dao.registeredVoters(newVoter.address)).to.equal(true);
    });

    it("should register multiple voters in batch", async function () {
      const voter4 = ethers.Wallet.createRandom();
      const voter5 = ethers.Wallet.createRandom();
      
      await dao.registerVotersBatch([voter4.address, voter5.address]);
      
      expect(await dao.registeredVoters(voter4.address)).to.equal(true);
      expect(await dao.registeredVoters(voter5.address)).to.equal(true);
    });

    it("should not allow non-admin to register voters", async function () {
      const newVoter = ethers.Wallet.createRandom();
      await expect(
        dao.connect(voter1).registerVoter(newVoter.address)
      ).to.be.revertedWith("Only admin can call this function");
    });

    it("should unregister a voter", async function () {
      await dao.unregisterVoter(voter1.address);
      expect(await dao.registeredVoters(voter1.address)).to.equal(false);
    });

    it("should track total registered voters", async function () {
      const initialCount = await dao.totalRegisteredVoters();
      expect(initialCount).to.equal(3); // From beforeEach
    });
  });

  // ========== PROPOSAL CREATION TESTS ==========

  describe("Proposal Creation", function () {
    it("should create a proposal successfully", async function () {
      const amount = ethers.utils.parseEther("2");
      
      const tx = await dao.createProposal(
        "Coding Club",
        "Workshop Event",
        "Fund a Python workshop for 50 students",
        amount,
        clubAddress1.address
      );

      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "ProposalCreated");
      
      expect(event.args.proposalID).to.equal(0);
      expect(event.args.clubName).to.equal("Coding Club");
      expect(event.args.requestedAmount).to.equal(amount);
      expect(event.args.clubAddress).to.equal(clubAddress1.address);
    });

    it("should increment proposal count", async function () {
      const amount = ethers.utils.parseEther("1");
      
      await dao.createProposal(
        "Robotics Club",
        "Parts Budget",
        "Buy robot components",
        amount,
        clubAddress1.address
      );

      expect(await dao.proposalCount()).to.equal(1);

      await dao.createProposal(
        "Art Club",
        "Exhibition",
        "Fund art exhibition",
        amount,
        clubAddress2.address
      );

      expect(await dao.proposalCount()).to.equal(2);
    });

    it("should reject proposal with zero amount", async function () {
      await expect(
        dao.createProposal(
          "Invalid Club",
          "No Budget",
          "No money requested",
          0,
          clubAddress1.address
        )
      ).to.be.revertedWith("Amount must be greater than 0");
    });

    it("should reject proposal exceeding available funds", async function () {
      const excessiveAmount = ethers.utils.parseEther("100");
      
      await expect(
        dao.createProposal(
          "Expensive Club",
          "Big Event",
          "Too much money",
          excessiveAmount,
          clubAddress1.address
        )
      ).to.be.revertedWith("Insufficient treasury funds");
    });

    it("should set proposal to ACTIVE state", async function () {
      const amount = ethers.utils.parseEther("1");
      
      await dao.createProposal(
        "Test Club",
        "Test Proposal",
        "Test description",
        amount,
        clubAddress1.address
      );

      const state = await dao.getProposalState(0);
      expect(state).to.equal("ACTIVE");
    });

    it("should allocate funds in escrow", async function () {
      const amount = ethers.utils.parseEther("2");
      const initialAllocated = (await dao.getTreasuryInfo())[1];
      
      await dao.createProposal(
        "Escrow Test Club",
        "Escrow Test",
        "Test escrow allocation",
        amount,
        clubAddress1.address
      );

      const updatedAllocated = (await dao.getTreasuryInfo())[1];
      expect(updatedAllocated).to.equal(initialAllocated.add(amount));
    });
  });

  // ========== VOTING TESTS ==========

  describe("Voting", function () {
    beforeEach(async function () {
      // Create a test proposal
      const amount = ethers.utils.parseEther("2");
      await dao.createProposal(
        "Voting Test Club",
        "Test Proposal",
        "Test voting mechanism",
        amount,
        clubAddress1.address
      );
    });

    it("should allow a registered voter to vote YES", async function () {
      const tx = await dao.connect(voter1).vote(0, true);
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "VoteCast");
      
      expect(event.args.proposalID).to.equal(0);
      expect(event.args.voter).to.equal(voter1.address);
      expect(event.args.choice).to.equal(true);
      expect(event.args.currentYesVotes).to.equal(1);
    });

    it("should allow a registered voter to vote NO", async function () {
      const tx = await dao.connect(voter2).vote(0, false);
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "VoteCast");
      
      expect(event.args.choice).to.equal(false);
      expect(event.args.currentNoVotes).to.equal(1);
    });

    it("should prevent voting by unregistered voters", async function () {
      const unregisteredVoter = ethers.Wallet.createRandom().connect(ethers.provider);
      
      await expect(
        dao.connect(unregisteredVoter).vote(0, true)
      ).to.be.revertedWith("Not a registered voter");
    });

    it("should prevent double voting on the same proposal", async function () {
      await dao.connect(voter1).vote(0, true);
      
      await expect(
        dao.connect(voter1).vote(0, false)
      ).to.be.revertedWith("Already voted on this proposal");
    });

    it("should track vote counts correctly", async function () {
      await dao.connect(voter1).vote(0, true);
      await dao.connect(voter2).vote(0, true);
      await dao.connect(voter3).vote(0, false);

      const counts = await dao.getVoteCounts(0);
      expect(counts[0]).to.equal(2); // Yes votes
      expect(counts[1]).to.equal(1); // No votes
      expect(counts[2]).to.equal(3); // Total voters
    });

    it("should verify if a user has voted", async function () {
      await dao.connect(voter1).vote(0, true);
      
      expect(await dao.hasUserVoted(0, voter1.address)).to.equal(true);
      expect(await dao.hasUserVoted(0, voter2.address)).to.equal(false);
    });

    it("should not allow voting after voting period ends", async function () {
      // Skip to end of voting period + 1 block
      const proposal = await dao.proposals(0);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const blocksToSkip = votingEndBlock - (await ethers.provider.getBlockNumber()) + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      await expect(
        dao.connect(voter1).vote(0, true)
      ).to.be.revertedWith("Voting period has ended");
    });
  });

  // ========== PROPOSAL FINALIZATION TESTS ==========

  describe("Proposal Finalization", function () {
    beforeEach(async function () {
      // Create a test proposal
      const amount = ethers.utils.parseEther("1");
      await dao.createProposal(
        "Finalization Test Club",
        "Test Proposal",
        "Test finalization logic",
        amount,
        clubAddress1.address
      );
    });

    it("should approve proposal with majority YES votes and quorum met", async function () {
      // Register more voters to meet 30% quorum (3 voters = 30%)
      await dao.connect(voter1).vote(0, true);
      await dao.connect(voter2).vote(0, true);
      await dao.connect(voter3).vote(0, true);

      // Skip to end of voting period
      const proposal = await dao.proposals(0);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const currentBlock = await ethers.provider.getBlockNumber();
      const blocksToSkip = votingEndBlock - currentBlock + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      // Finalize proposal
      const tx = await dao.finalizeProposal(0);
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "ProposalApproved");
      
      expect(event.args.proposalID).to.equal(0);
      expect(event.args.yesVotes).to.equal(3);
      expect(event.args.noVotes).to.equal(0);
    });

    it("should reject proposal if quorum not met", async function () {
      // Only 1 vote when 30% quorum needed (minimum 1 of 3)
      await dao.connect(voter1).vote(0, true);

      // Skip to end of voting period
      const proposal = await dao.proposals(0);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const currentBlock = await ethers.provider.getBlockNumber();
      const blocksToSkip = votingEndBlock - currentBlock + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      const tx = await dao.finalizeProposal(0);
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "ProposalRejected");
      
      expect(event.args.reason).to.equal("Quorum not met");
    });

    it("should reject proposal if NO votes win", async function () {
      // More NO than YES
      await dao.connect(voter1).vote(0, false);
      await dao.connect(voter2).vote(0, false);
      await dao.connect(voter3).vote(0, true);

      // Skip to end of voting period
      const proposal = await dao.proposals(0);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const currentBlock = await ethers.provider.getBlockNumber();
      const blocksToSkip = votingEndBlock - currentBlock + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      const tx = await dao.finalizeProposal(0);
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "ProposalRejected");
      
      expect(event.args.reason).to.equal("Majority voted NO");
    });

    it("should set proposal state to APPROVED or REJECTED", async function () {
      await dao.connect(voter1).vote(0, true);
      await dao.connect(voter2).vote(0, true);
      await dao.connect(voter3).vote(0, true);

      // Skip to end of voting period
      const proposal = await dao.proposals(0);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const currentBlock = await ethers.provider.getBlockNumber();
      const blocksToSkip = votingEndBlock - currentBlock + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      await dao.finalizeProposal(0);
      const state = await dao.getProposalState(0);
      expect(state).to.equal("APPROVED");
    });
  });

  // ========== FUND WITHDRAWAL TESTS ==========

  describe("Fund Withdrawal", function () {
    beforeEach(async function () {
      // Create and approve a proposal
      const amount = ethers.utils.parseEther("1");
      await dao.createProposal(
        "Withdrawal Test Club",
        "Fund Request",
        "Request funds for event",
        amount,
        clubAddress1.address
      );

      // Get all votes (3 voters, all YES)
      await dao.connect(voter1).vote(0, true);
      await dao.connect(voter2).vote(0, true);
      await dao.connect(voter3).vote(0, true);

      // Finalize proposal
      const proposal = await dao.proposals(0);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const currentBlock = await ethers.provider.getBlockNumber();
      const blocksToSkip = votingEndBlock - currentBlock + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      await dao.finalizeProposal(0);
    });

    it("should release funds to approved proposal club", async function () {
      const clubInitialBalance = await clubAddress1.getBalance();
      const withdrawAmount = ethers.utils.parseEther("1");

      await dao.connect(clubAddress1).withdrawFunds(0);

      const clubFinalBalance = await clubAddress1.getBalance();
      
      // Check that club received approximately the requested amount
      // (accounting for gas, but should be close)
      expect(clubFinalBalance).to.be.gt(clubInitialBalance);
    });

    it("should mark proposal as EXECUTED after withdrawal", async function () {
      await dao.connect(clubAddress1).withdrawFunds(0);
      const state = await dao.getProposalState(0);
      expect(state).to.equal("EXECUTED");
    });

    it("should prevent double withdrawal", async function () {
      await dao.connect(clubAddress1).withdrawFunds(0);

      await expect(
        dao.connect(clubAddress1).withdrawFunds(0)
      ).to.be.revertedWith("Funds already released");
    });

    it("should only allow club address to withdraw", async function () {
      await expect(
        dao.connect(voter1).withdrawFunds(0)
      ).to.be.revertedWith("Only club can withdraw funds");
    });

    it("should only allow withdrawal of APPROVED proposals", async function () {
      const amount = ethers.utils.parseEther("1");
      
      // Create another proposal that will be rejected
      await dao.createProposal(
        "Rejected Club",
        "Rejected Proposal",
        "This will be rejected",
        amount,
        clubAddress2.address
      );

      // Vote it down
      await dao.connect(voter1).vote(1, false);
      await dao.connect(voter2).vote(1, false);
      await dao.connect(voter3).vote(1, false);

      // Finalize
      const proposal = await dao.proposals(1);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const currentBlock = await ethers.provider.getBlockNumber();
      const blocksToSkip = votingEndBlock - currentBlock + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      await dao.finalizeProposal(1);

      // Try to withdraw
      await expect(
        dao.connect(clubAddress2).withdrawFunds(1)
      ).to.be.revertedWith("Proposal not approved");
    });
  });

  // ========== TREASURY MANAGEMENT TESTS ==========

  describe("Treasury Management", function () {
    it("should accept ETH via receive() function", async function () {
      const amount = ethers.utils.parseEther("5");
      
      const tx = await admin.sendTransaction({
        to: dao.address,
        value: amount,
      });

      await tx.wait();

      const treasuryInfo = await dao.getTreasuryInfo();
      expect(treasuryInfo[0]).to.be.gte(amount);
    });

    it("should track treasury balance correctly", async function () {
      const treasuryBefore = (await dao.getTreasuryInfo())[0];
      const addAmount = ethers.utils.parseEther("2");

      await dao.fundTreasury({ value: addAmount });

      const treasuryAfter = (await dao.getTreasuryInfo())[0];
      expect(treasuryAfter).to.equal(treasuryBefore.add(addAmount));
    });

    it("should reflect allocated funds in escrow", async function () {
      const allocatedBefore = (await dao.getTreasuryInfo())[1];
      const proposalAmount = ethers.utils.parseEther("1");

      await dao.createProposal(
        "Treasury Test Club",
        "Treasury Test",
        "Test treasury tracking",
        proposalAmount,
        clubAddress1.address
      );

      const allocatedAfter = (await dao.getTreasuryInfo())[1];
      expect(allocatedAfter).to.equal(allocatedBefore.add(proposalAmount));
    });

    it("should release allocated funds when proposal rejected", async function () {
      const proposalAmount = ethers.utils.parseEther("1");

      await dao.createProposal(
        "Release Test Club",
        "Release Test",
        "Test fund release on rejection",
        proposalAmount,
        clubAddress1.address
      );

      const allocatedAfterCreation = (await dao.getTreasuryInfo())[1];

      // Vote to reject
      await dao.connect(voter1).vote(0, false);
      await dao.connect(voter2).vote(0, false);
      await dao.connect(voter3).vote(0, false);

      // Finalize
      const proposal = await dao.proposals(0);
      const votingEndBlock = proposal.votingEndBlock.toNumber();
      const currentBlock = await ethers.provider.getBlockNumber();
      const blocksToSkip = votingEndBlock - currentBlock + 1;

      for (let i = 0; i < blocksToSkip; i++) {
        await ethers.provider.send("hardhat_mine", ["0x1"]);
      }

      await dao.finalizeProposal(0);

      const allocatedAfterRejection = (await dao.getTreasuryInfo())[1];
      expect(allocatedAfterRejection).to.equal(allocatedAfterCreation.sub(proposalAmount));
    });
  });

  // ========== GETTER FUNCTION TESTS ==========

  describe("Getter Functions", function () {
    beforeEach(async function () {
      const amount = ethers.utils.parseEther("1");
      await dao.createProposal(
        "Getter Test Club",
        "Getter Test",
        "Test getter functions",
        amount,
        clubAddress1.address
      );
    });

    it("should return proposal data via getProposal()", async function () {
      const proposal = await dao.getProposal(0);
      
      expect(proposal.id).to.equal(0);
      expect(proposal.clubName).to.equal("Getter Test Club");
      expect(proposal.title).to.equal("Getter Test");
      expect(proposal.clubAddress).to.equal(clubAddress1.address);
    });

    it("should return proposal state via getProposalState()", async function () {
      const state = await dao.getProposalState(0);
      expect(state).to.equal("ACTIVE");
    });

    it("should return vote counts via getVoteCounts()", async function () {
      await dao.connect(voter1).vote(0, true);
      await dao.connect(voter2).vote(0, false);

      const counts = await dao.getVoteCounts(0);
      expect(counts[0]).to.equal(1); // yes
      expect(counts[1]).to.equal(1); // no
      expect(counts[2]).to.equal(2); // total voters
    });

    it("should return treasury info via getTreasuryInfo()", async function () {
      const treasuryInfo = await dao.getTreasuryInfo();
      
      expect(treasuryInfo[0]).to.be.gt(0); // available
      expect(treasuryInfo[2]).to.be.gt(0); // total balance
    });
  });
});
