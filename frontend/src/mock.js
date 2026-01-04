// CampusDAO Mock Data
// Realistic campus funding governance data

export const proposals = [
  {
    id: 1,
    clubName: "Computer Science Society",
    title: "Annual Hackathon Infrastructure & Prizes",
    description: "Funding request for our flagship annual hackathon event. Funds will cover cloud infrastructure for 48-hour event hosting, AWS credits for participants, prizes for winners (1st: $2000, 2nd: $1000, 3rd: $500), and food/beverages for 150 expected participants. This event historically attracts 120-180 students and serves as a key recruitment tool for tech companies.",
    requestedAmount: 8500,
    submissionDate: "2025-01-15",
    votingDeadline: "2025-02-15",
    status: "active",
    votesFor: 1847,
    votesAgainst: 342,
    quorum: 2000,
    totalVotes: 2189,
    category: "Events"
  },
  {
    id: 2,
    clubName: "Environmental Action Group",
    title: "Campus Sustainability Initiative - Solar Panel Installation",
    description: "Proposal to install solar panels on the Student Union building roof. This initiative will reduce campus carbon footprint by an estimated 15 tons CO2 annually and provide real-world renewable energy education opportunities. Funds cover equipment, installation, and maintenance contract for first year. Expected ROI: 7 years.",
    requestedAmount: 24000,
    submissionDate: "2025-01-10",
    votingDeadline: "2025-02-28",
    status: "active",
    votesFor: 2341,
    votesAgainst: 876,
    quorum: 2500,
    totalVotes: 3217,
    category: "Infrastructure"
  },
  {
    id: 3,
    clubName: "Debate Society",
    title: "National Debate Tournament Travel & Registration",
    description: "Request for funding to send our debate team to the National Collegiate Debate Championship in Washington DC. Covers registration fees for 8 debaters, round-trip flights, 4 nights accommodation, and ground transportation. Our team qualified after winning regionals and will represent the university at the national level.",
    requestedAmount: 6200,
    submissionDate: "2024-12-20",
    votingDeadline: "2025-01-20",
    status: "approved",
    votesFor: 3102,
    votesAgainst: 234,
    quorum: 2000,
    totalVotes: 3336,
    category: "Travel"
  },
  {
    id: 4,
    clubName: "International Students Association",
    title: "Cultural Festival 2025 - Venue & Equipment",
    description: "Annual cultural festival celebrating diversity on campus. Request covers venue rental, audio/visual equipment, stage setup, cultural performance honorariums, and food from 15 different countries. Expected attendance: 800+ students. This is our largest community-building event of the year.",
    requestedAmount: 12000,
    submissionDate: "2025-01-08",
    votingDeadline: "2025-02-08",
    status: "active",
    votesFor: 1923,
    votesAgainst: 567,
    quorum: 2000,
    totalVotes: 2490,
    category: "Events"
  },
  {
    id: 5,
    clubName: "Robotics Club",
    title: "Competition Robot Parts & Workshop Equipment",
    description: "Funding for VEX Robotics Competition participation and workshop equipment upgrades. Includes motors, sensors, aluminum framing, 3D printer filament, and competition registration. Our team has qualified for regionals and needs competition-grade components to remain competitive.",
    requestedAmount: 4800,
    submissionDate: "2024-11-30",
    votingDeadline: "2024-12-30",
    status: "approved",
    votesFor: 2654,
    votesAgainst: 421,
    quorum: 2000,
    totalVotes: 3075,
    category: "Equipment"
  },
  {
    id: 6,
    clubName: "Mental Health Awareness Society",
    title: "Peer Counseling Training & Support Resources",
    description: "Request to fund certified peer counseling training for 20 student volunteers and create a mental health resource library. Covers professional training workshops, certification fees, and initial stock of self-help resources. Program aims to provide accessible peer support during exam periods and stressful academic times.",
    requestedAmount: 3500,
    submissionDate: "2025-01-12",
    votingDeadline: "2025-02-12",
    status: "active",
    votesFor: 2789,
    votesAgainst: 145,
    quorum: 2000,
    totalVotes: 2934,
    category: "Programs"
  },
  {
    id: 7,
    clubName: "Film Production Club",
    title: "Professional Camera & Lighting Equipment",
    description: "Proposal to purchase professional-grade camera equipment to replace aging gear from 2015. Includes Sony cinema camera, lens kit, lighting setup, and audio recording equipment. Will enable students to produce broadcast-quality content and improve portfolio work for film industry careers.",
    requestedAmount: 15000,
    submissionDate: "2024-12-05",
    votingDeadline: "2025-01-05",
    status: "rejected",
    votesFor: 1234,
    votesAgainst: 2876,
    quorum: 2000,
    totalVotes: 4110,
    category: "Equipment"
  },
  {
    id: 8,
    clubName: "Women in STEM",
    title: "Industry Mentorship Program - Semester Launch",
    description: "Establish a formal mentorship program connecting 50 women students with industry professionals in tech and engineering. Funds cover platform subscription, kick-off networking event, monthly virtual meetups, and year-end celebration. Program includes 1:1 mentorship pairings and career development workshops.",
    requestedAmount: 5200,
    submissionDate: "2025-01-18",
    votingDeadline: "2025-02-18",
    status: "active",
    votesFor: 2456,
    votesAgainst: 234,
    quorum: 2000,
    totalVotes: 2690,
    category: "Programs"
  },
  {
    id: 9,
    clubName: "Entrepreneurship Society",
    title: "Startup Incubator Seed Funding Pool",
    description: "Create a micro-grant program for student startups. Request establishes a pool for 5 grants of $1000 each to student ventures selected through pitch competition. Includes mentorship resources and co-working space access. Past recipients have gone on to raise external funding and create jobs.",
    requestedAmount: 5000,
    submissionDate: "2024-12-28",
    votingDeadline: "2025-01-28",
    status: "approved",
    votesFor: 3421,
    votesAgainst: 567,
    quorum: 2000,
    totalVotes: 3988,
    category: "Programs"
  },
  {
    id: 10,
    clubName: "Music Society",
    title: "Sound System Upgrade for Performance Venue",
    description: "Replace outdated PA system in student performance space with modern equipment. Current system is 12 years old with frequent failures. New system will support concerts, open mics, and other performances. Benefits entire campus community and multiple clubs that use the space.",
    requestedAmount: 9800,
    submissionDate: "2025-01-05",
    votingDeadline: "2025-02-05",
    status: "active",
    votesFor: 1678,
    votesAgainst: 892,
    quorum: 2000,
    totalVotes: 2570,
    category: "Equipment"
  },
  {
    id: 11,
    clubName: "Asian Student Alliance",
    title: "Lunar New Year Celebration - Campus-Wide Event",
    description: "Traditional Lunar New Year celebration featuring cultural performances, authentic cuisine from 8 Asian countries, calligraphy workshops, and traditional games. This educational and cultural event typically attracts 500+ attendees and promotes cultural understanding across campus.",
    requestedAmount: 7500,
    submissionDate: "2024-11-15",
    votingDeadline: "2024-12-15",
    status: "approved",
    votesFor: 3876,
    votesAgainst: 234,
    quorum: 2000,
    totalVotes: 4110,
    category: "Events"
  },
  {
    id: 12,
    clubName: "Campus Newspaper",
    title: "Digital Platform Development & Hosting",
    description: "Modernize campus newspaper with professional digital platform. Moving from free blog to custom CMS with subscriber management, mobile app, and analytics. Covers development, hosting for 2 years, and content management training. Will improve reach from current 200 to projected 2000+ students.",
    requestedAmount: 6800,
    submissionDate: "2024-12-10",
    votingDeadline: "2025-01-10",
    status: "rejected",
    votesFor: 987,
    votesAgainst: 2456,
    quorum: 2000,
    totalVotes: 3443,
    category: "Infrastructure"
  }
];

export const treasuryData = {
  totalFunds: 125000,
  allocatedFunds: 67800,
  remainingBalance: 57200,
  pendingProposals: 5,
  activeProposals: 6
};

export const expenseLedger = [
  {
    id: 1,
    date: "2025-01-22",
    club: "Debate Society",
    amount: 6200,
    purpose: "National Debate Tournament Travel & Registration",
    txHash: "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
  },
  {
    id: 2,
    date: "2025-01-08",
    club: "Robotics Club",
    amount: 4800,
    purpose: "Competition Robot Parts & Workshop Equipment",
    txHash: "0x3c4b91a7d8e45fade1c0d57a7af66ab4ead79f8c9d2b1a3e4f5c6d7e8f9a0b1c"
  },
  {
    id: 3,
    date: "2025-01-30",
    club: "Entrepreneurship Society",
    amount: 5000,
    purpose: "Startup Incubator Seed Funding Pool",
    txHash: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d"
  },
  {
    id: 4,
    date: "2024-12-18",
    club: "Asian Student Alliance",
    amount: 7500,
    purpose: "Lunar New Year Celebration - Campus-Wide Event",
    txHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c"
  },
  {
    id: 5,
    date: "2024-12-05",
    club: "Engineering Society",
    amount: 3200,
    purpose: "Industry Conference Attendance - 10 Students",
    txHash: "0x5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e"
  },
  {
    id: 6,
    date: "2024-11-28",
    club: "Performing Arts Collective",
    amount: 4500,
    purpose: "Annual Theater Production - Set Design & Costumes",
    txHash: "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b"
  },
  {
    id: 7,
    date: "2024-11-15",
    club: "Biology Research Club",
    amount: 2800,
    purpose: "Lab Equipment & Research Materials",
    txHash: "0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d"
  },
  {
    id: 8,
    date: "2024-10-30",
    club: "Community Outreach Society",
    amount: 1900,
    purpose: "Food Drive & Homeless Shelter Partnership",
    txHash: "0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f"
  },
  {
    id: 9,
    date: "2024-10-12",
    club: "Data Science Club",
    amount: 3600,
    purpose: "Kaggle Competition Team Support & Cloud Computing",
    txHash: "0x7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c"
  },
  {
    id: 10,
    date: "2024-09-25",
    club: "Photography Society",
    amount: 2400,
    purpose: "Exhibition Space Rental & Printing Costs",
    txHash: "0x0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e"
  }
];

export const governanceRules = {
  quorum: 2000,
  votingPeriod: "30 days",
  proposalThreshold: "100 tokens to submit",
  votingPower: "1 wallet = 1 vote",
  executionDelay: "7 days after approval"
};
