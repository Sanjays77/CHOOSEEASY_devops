const careersData = [
  // --- TECHNOLOGY ---
  {
    title: "Software Developer",
    category: "Technology",
    description:
      "Design, build, and maintain software applications and systems.",
    averageSalary: "$127,260",
    jobGrowth: "+25% (Much faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Write clean code",
      "Debug applications",
      "Collaborate with teams",
    ],
    skills: {
      technical: ["Java", "Python", "React"],
      soft: ["Problem Solving", "Teamwork"],
    },
    educationPathway: {
      degree: "Bachelor's in CS",
      certifications: ["AWS Certified"],
    },
    difficulty: "Advanced",
    demandLevel: "Very High",
    educationRequired: "Bachelor's Degree",
    futureScope: {
      demandTrend: "Rapidly Growing",
      techChanges: "High impact from AI",
    },
  },
  {
    title: "Data Scientist",
    category: "Technology",
    description:
      "Analyze complex data to help organizations make better decisions.",
    averageSalary: "$103,500",
    jobGrowth: "+35% (Explosive)",
    bright_outlook: true,
    responsibilities: ["Build ML models", "Analyze trends", "Visualize data"],
    skills: {
      technical: ["Python", "R", "SQL", "Machine Learning"],
      soft: ["Critical Thinking", "Communication"],
    },
    educationPathway: {
      degree: "Master's in Data Science",
      certifications: ["Google Data Analytics"],
    },
    difficulty: "Advanced",
    demandLevel: "Very High",
    educationRequired: "Master's Degree",
    futureScope: { demandTrend: "Explosive", techChanges: "High" },
  },
  {
    title: "Cybersecurity Analyst",
    category: "Technology",
    description: "Protect computer networks and systems from cyber threats.",
    averageSalary: "$112,000",
    jobGrowth: "+32% (Much faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Monitor networks",
      "Install firewalls",
      "Investigate breaches",
    ],
    skills: {
      technical: ["Network Security", "Linux", "Encryption"],
      soft: ["Attention to Detail", "Ethics"],
    },
    educationPathway: {
      degree: "Bachelor's in Cybersecurity",
      certifications: ["CISSP", "CEH"],
    },
    difficulty: "Advanced",
    demandLevel: "Very High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Critical", techChanges: "High" },
  },
  {
    title: "Cloud Architect",
    category: "Technology",
    description:
      "Design and manage cloud computing strategies for organizations.",
    averageSalary: "$133,000",
    jobGrowth: "+20% (Fast)",
    bright_outlook: true,
    responsibilities: [
      "Design cloud infrastructure",
      "Ensure security",
      "Manage cloud costs",
    ],
    skills: {
      technical: ["AWS", "Azure", "Docker", "Kubernetes"],
      soft: ["Leadership", "Strategic Planning"],
    },
    educationPathway: {
      degree: "Bachelor's in CS",
      certifications: ["AWS Solutions Architect"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "Moderate" },
  },
  {
    title: "UX/UI Designer",
    category: "Technology",
    description: "Design user-friendly interfaces for websites and apps.",
    averageSalary: "$90,000",
    jobGrowth: "+16% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Create wireframes",
      "Conduct user research",
      "Design prototypes",
    ],
    skills: {
      technical: ["Figma", "Adobe XD", "HTML/CSS"],
      soft: ["Empathy", "Creativity"],
    },
    educationPathway: {
      degree: "Bachelor's in Design",
      certifications: ["Google UX Design"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Steady", techChanges: "High (AI Tools)" },
  },

  // --- HEALTHCARE ---
  {
    title: "Registered Nurse",
    category: "Healthcare",
    description:
      "Provide patient care and educate patients about health conditions.",
    averageSalary: "$81,220",
    jobGrowth: "+6% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Monitor patients",
      "Administer medication",
      "Assist doctors",
    ],
    skills: {
      technical: ["Patient Care", "Medical Terminology"],
      soft: ["Compassion", "Stamina"],
    },
    educationPathway: {
      degree: "Bachelor's in Nursing (BSN)",
      certifications: ["NCLEX-RN"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Steady", techChanges: "Low" },
  },
  {
    title: "Physician Assistant",
    category: "Healthcare",
    description:
      "Practice medicine under the supervision of physicians and surgeons.",
    averageSalary: "$126,010",
    jobGrowth: "+27% (Much faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Examine patients",
      "Diagnose illnesses",
      "Prescribe medicine",
    ],
    skills: {
      technical: ["Clinical Medicine", "Diagnosis"],
      soft: ["Decision Making", "Empathy"],
    },
    educationPathway: {
      degree: "Master's in PA Studies",
      certifications: ["PANCE"],
    },
    difficulty: "Advanced",
    demandLevel: "Very High",
    educationRequired: "Master's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "Moderate" },
  },
  {
    title: "Physical Therapist",
    category: "Healthcare",
    description:
      "Help injured or ill people improve their movement and manage pain.",
    averageSalary: "$97,720",
    jobGrowth: "+15% (Much faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Develop treatment plans",
      "Guide exercises",
      "Assess progress",
    ],
    skills: {
      technical: ["Anatomy", "Rehabilitation"],
      soft: ["Patience", "Communication"],
    },
    educationPathway: {
      degree: "Doctor of Physical Therapy (DPT)",
      certifications: ["State License"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Doctoral Degree",
    futureScope: { demandTrend: "Steady", techChanges: "Low" },
  },
  {
    title: "Pharmacist",
    category: "Healthcare",
    description:
      "Dispense prescription medications and offer expertise in the safe use of prescriptions.",
    averageSalary: "$132,750",
    jobGrowth: "+2% (Slower than average)",
    bright_outlook: false,
    responsibilities: [
      "Verify prescriptions",
      "Advise patients",
      "Manage inventory",
    ],
    skills: {
      technical: ["Pharmacology", "Chemistry"],
      soft: ["Attention to Detail", "Integrity"],
    },
    educationPathway: {
      degree: "Doctor of Pharmacy (Pharm.D.)",
      certifications: ["NAPLEX"],
    },
    difficulty: "Advanced",
    demandLevel: "Moderate",
    educationRequired: "Doctoral Degree",
    futureScope: { demandTrend: "Stable", techChanges: "Moderate" },
  },

  // --- BUSINESS & FINANCE ---
  {
    title: "Financial Manager",
    category: "Business",
    description:
      "Plan, direct, or coordinate accounting, investing, banking, insurance, securities, and other financial activities.",
    averageSalary: "$139,790",
    jobGrowth: "+17% (Much faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Analyze data",
      "Advise senior managers",
      "Prepare financial reports",
    ],
    skills: {
      technical: ["Accounting", "Financial Modeling"],
      soft: ["Leadership", "Analytical Skills"],
    },
    educationPathway: {
      degree: "Bachelor's in Finance",
      certifications: ["CFA", "CPA"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "Moderate" },
  },
  {
    title: "Marketing Manager",
    category: "Business",
    description: "Plan programs to generate interest in products or services.",
    averageSalary: "$140,040",
    jobGrowth: "+6% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Develop strategies",
      "Manage budgets",
      "Analyze market trends",
    ],
    skills: {
      technical: ["SEO", "Data Analysis", "Digital Marketing"],
      soft: ["Creativity", "Leadership"],
    },
    educationPathway: {
      degree: "Bachelor's in Marketing",
      certifications: ["Google Ads", "HubSpot"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Steady", techChanges: "High" },
  },
  {
    title: "Human Resources Manager",
    category: "Business",
    description:
      "Plan, direct, and coordinate the administrative functions of an organization.",
    averageSalary: "$130,000",
    jobGrowth: "+5% (Average)",
    bright_outlook: true,
    responsibilities: [
      "Recruit staff",
      "Handle employee relations",
      "Oversee benefits",
    ],
    skills: {
      technical: ["HR Software", "Labor Law"],
      soft: ["Interpersonal Skills", "Decision Making"],
    },
    educationPathway: {
      degree: "Bachelor's in HR",
      certifications: ["SHRM-CP"],
    },
    difficulty: "Moderate",
    demandLevel: "Moderate",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Stable", techChanges: "Moderate" },
  },
  {
    title: "Management Analyst",
    category: "Business",
    description: "Propose ways to improve an organization's efficiency.",
    averageSalary: "$95,290",
    jobGrowth: "+10% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Gather data",
      "Recommend solutions",
      "Interview personnel",
    ],
    skills: {
      technical: ["Data Analysis", "Excel"],
      soft: ["Problem Solving", "Communication"],
    },
    educationPathway: {
      degree: "Bachelor's in Business",
      certifications: ["CMC"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "Moderate" },
  },

  // --- ENGINEERING ---
  {
    title: "Civil Engineer",
    category: "Engineering",
    description:
      "Design, build, and supervise infrastructure projects and systems.",
    averageSalary: "$89,940",
    jobGrowth: "+5% (Average)",
    bright_outlook: true,
    responsibilities: [
      "Design infrastructure",
      "Analyze survey reports",
      "Ensure compliance",
    ],
    skills: {
      technical: ["AutoCAD", "Structural Analysis"],
      soft: ["Project Management", "Problem Solving"],
    },
    educationPathway: {
      degree: "Bachelor's in Civil Engineering",
      certifications: ["PE License"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Steady", techChanges: "Low" },
  },
  {
    title: "Mechanical Engineer",
    category: "Engineering",
    description:
      "Design, develop, build, and test mechanical and thermal sensors and devices.",
    averageSalary: "$96,310",
    jobGrowth: "+2% (Slower than average)",
    bright_outlook: false,
    responsibilities: [
      "Design mechanical devices",
      "Analyze problems",
      "Oversee manufacturing",
    ],
    skills: {
      technical: ["CAD", "Thermodynamics"],
      soft: ["Creativity", "Math Skills"],
    },
    educationPathway: {
      degree: "Bachelor's in Mechanical Engineering",
      certifications: ["PE License"],
    },
    difficulty: "Advanced",
    demandLevel: "Moderate",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Stable", techChanges: "Moderate" },
  },
  {
    title: "Electrical Engineer",
    category: "Engineering",
    description:
      "Design, develop, test, and supervise the manufacture of electrical equipment.",
    averageSalary: "$103,390",
    jobGrowth: "+5% (Average)",
    bright_outlook: true,
    responsibilities: [
      "Design electrical systems",
      "Perform calculations",
      "Inspect installations",
    ],
    skills: {
      technical: ["Circuit Design", "Matlab"],
      soft: ["Innovation", "Teamwork"],
    },
    educationPathway: {
      degree: "Bachelor's in Electrical Engineering",
      certifications: ["PE License"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "High" },
  },

  // --- ARTS & DESIGN ---
  {
    title: "Graphic Designer",
    category: "Creative",
    description:
      "Create visual concepts, using computer software or by hand, to communicate ideas.",
    averageSalary: "$57,990",
    jobGrowth: "+3% (Slower than average)",
    bright_outlook: false,
    responsibilities: [
      "Create logos",
      "Select colors/fonts",
      "Present designs",
    ],
    skills: {
      technical: ["Adobe Creative Suite", "Typography"],
      soft: ["Creativity", "Time Management"],
    },
    educationPathway: {
      degree: "Bachelor's in Graphic Design",
      certifications: ["Adobe Certified"],
    },
    difficulty: "Moderate",
    demandLevel: "Moderate",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Stable", techChanges: "High (AI)" },
  },
  {
    title: "Interior Designer",
    category: "Creative",
    description:
      "Plan, design, and furnish interiors of residential, commercial, or industrial buildings.",
    averageSalary: "$61,590",
    jobGrowth: "+4% (Average)",
    bright_outlook: false,
    responsibilities: [
      "Determine client needs",
      "Create design plans",
      "Select materials",
    ],
    skills: {
      technical: ["CAD", "SketchUp"],
      soft: ["Creativity", "Detail Oriented"],
    },
    educationPathway: {
      degree: "Bachelor's in Interior Design",
      certifications: ["NCIDQ"],
    },
    difficulty: "Moderate",
    demandLevel: "Moderate",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Steady", techChanges: "Moderate" },
  },
  {
    title: "Animator",
    category: "Creative",
    description:
      "Create special effects, animation, or other visual images using film, video, computers, or other electronic tools.",
    averageSalary: "$98,950",
    jobGrowth: "+8% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Create storyboards",
      "Design characters",
      "Edit animations",
    ],
    skills: {
      technical: ["Maya", "Blender", "After Effects"],
      soft: ["Creativity", "Storytelling"],
    },
    educationPathway: { degree: "Bachelor's in Animation", certifications: [] },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "High" },
  },

  // --- LAW & PUBLIC SAFETY ---
  {
    title: "Lawyer",
    category: "Legal",
    description:
      "Represent clients in criminal and civil litigation and other legal proceedings.",
    averageSalary: "$135,740",
    jobGrowth: "+8% (Faster than average)",
    bright_outlook: true,
    responsibilities: ["Advise clients", "Interpret laws", "Argue in court"],
    skills: {
      technical: ["Legal Research", "Writing"],
      soft: ["Persuasion", "Critical Thinking"],
    },
    educationPathway: {
      degree: "Juris Doctor (J.D.)",
      certifications: ["Bar Exam"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Doctoral Degree",
    futureScope: { demandTrend: "Steady", techChanges: "Low" },
  },
  {
    title: "Police Officer",
    category: "Legal",
    description: "Protect lives and property.",
    averageSalary: "$69,160",
    jobGrowth: "+3% (Slower than average)",
    bright_outlook: false,
    responsibilities: ["Patrol areas", "Respond to calls", "Arrest suspects"],
    skills: {
      technical: ["Law Enforcement", "First Aid"],
      soft: ["Courage", "Communication"],
    },
    educationPathway: { degree: "Police Academy", certifications: [] },
    difficulty: "Moderate",
    demandLevel: "Moderate",
    educationRequired: "High School Diploma",
    futureScope: { demandTrend: "Stable", techChanges: "Moderate" },
  },

  // --- EDUCATION ---
  {
    title: "High School Teacher",
    category: "Education",
    description:
      "Teach students in one or more subjects, such as English, mathematics, or social studies.",
    averageSalary: "$62,360",
    jobGrowth: "+1% (Slower than average)",
    bright_outlook: false,
    responsibilities: ["Plan lessons", "Grade assignments", "Manage classroom"],
    skills: {
      technical: ["Curriculum Design", "Subject Knowledge"],
      soft: ["Patience", "Communication"],
    },
    educationPathway: {
      degree: "Bachelor's in Education",
      certifications: ["State Teaching License"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Stable", techChanges: "Moderate" },
  },
  {
    title: "University Professor",
    category: "Education",
    description: "Teach students beyond the high school level.",
    averageSalary: "$80,840",
    jobGrowth: "+8% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Deliver lectures",
      "Conduct research",
      "Publish papers",
    ],
    skills: {
      technical: ["Research", "Public Speaking"],
      soft: ["Mentorship", "Critical Thinking"],
    },
    educationPathway: { degree: "Ph.D. in Field", certifications: [] },
    difficulty: "Advanced",
    demandLevel: "Moderate",
    educationRequired: "Doctoral Degree",
    futureScope: { demandTrend: "Steady", techChanges: "Low" },
  },

  // --- TRADES ---
  {
    title: "Electrician",
    category: "Trades",
    description:
      "Install, maintain, and repair electrical wiring, equipment, and fixtures.",
    averageSalary: "$60,240",
    jobGrowth: "+7% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Read blueprints",
      "Install wiring",
      "Inspect components",
    ],
    skills: {
      technical: ["Circuitry", "Safety Codes"],
      soft: ["Troubleshooting", "Physical Stamina"],
    },
    educationPathway: {
      degree: "Apprenticeship",
      certifications: ["Journeyman License"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "High School Diploma",
    futureScope: { demandTrend: "Growing", techChanges: "Moderate" },
  },
  {
    title: "Plumber",
    category: "Trades",
    description: "Install and repair water, gas, and other piping systems.",
    averageSalary: "$60,090",
    jobGrowth: "+2% (Slower than average)",
    bright_outlook: false,
    responsibilities: ["Install pipes", "Repair leaks", "Estimate costs"],
    skills: {
      technical: ["Pipefitting", "Blueprints"],
      soft: ["Problem Solving", "Customer Service"],
    },
    educationPathway: {
      degree: "Apprenticeship",
      certifications: ["Plumbing License"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "High School Diploma",
    futureScope: { demandTrend: "Stable", techChanges: "Low" },
  },
  {
    title: "Chef",
    category: "Trades",
    description:
      "Direct the preparation, seasoning, and cooking of salads, soups, fish, meats, vegetables, desserts, or other foods.",
    averageSalary: "$56,520",
    jobGrowth: "+15% (Much faster than average)",
    bright_outlook: true,
    responsibilities: ["Plan menus", "Oversee kitchen", "Ensure food quality"],
    skills: {
      technical: ["Culinary Arts", "Food Safety"],
      soft: ["Creativity", "Leadership"],
    },
    educationPathway: {
      degree: "Culinary School",
      certifications: ["ServSafe"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Certificate",
    futureScope: { demandTrend: "Growing", techChanges: "Low" },
  },
  {
    title: "Pilot",
    category: "Trades",
    description: "Fly and navigate airplanes, helicopters, and other aircraft.",
    averageSalary: "$148,900",
    jobGrowth: "+6% (Faster than average)",
    bright_outlook: true,
    responsibilities: ["Fly aircraft", "Check weather", "Ensure safety"],
    skills: {
      technical: ["Navigation", "Physics"],
      soft: ["Focus", "Decision Making"],
    },
    educationPathway: {
      degree: "Flight School",
      certifications: ["Commercial Pilot License"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "Moderate" },
  },
  {
    title: "Sustainable Energy Specialist",
    category: "Science",
    description:
      "Analyze and improve energy efficiency and sustainability practices.",
    averageSalary: "$85,000",
    jobGrowth: "+10% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Conduct energy audits",
      "Recommend renewable solutions",
      "Monitor energy usage",
    ],
    skills: {
      technical: [
        "Energy Analysis",
        "Sustainability Reporting",
        "Project Management",
      ],
      soft: ["Problem Solving", "Communication"],
    },
    educationPathway: {
      degree: "Bachelor's in Environmental Science",
      certifications: ["LEED Green Associate"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Rapidly Growing", techChanges: "High" },
  },
  {
    title: "AI & Machine Learning Engineer",
    category: "Technology",
    description:
      "Develop and deploy AI models and machine learning algorithms to solve complex problems.",
    averageSalary: "$150,000",
    jobGrowth: "+40% (Explosive)",
    bright_outlook: true,
    responsibilities: [
      "Design AI models",
      "Train neural networks",
      "Optimize algorithms",
    ],
    skills: {
      technical: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
      soft: ["Critical Thinking", "Adaptability"],
    },
    educationPathway: {
      degree: "Master's in Computer Science (AI Specialization)",
      certifications: ["Google Professional Machine Learning Engineer"],
    },
    difficulty: "Advanced",
    demandLevel: "Very High",
    educationRequired: "Master's Degree",
    futureScope: { demandTrend: "Explosive", techChanges: "Very High" },
  },
  {
    title: "Event Planner",
    category: "Business",
    description: "Coordinate all aspects of professional meetings and events.",
    averageSalary: "$51,560",
    jobGrowth: "+18% (Much faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Meet with clients",
      "Coordinate services",
      "Monitor event activities",
    ],
    skills: {
      technical: ["Event Management Software", "Budgeting"],
      soft: ["Organization", "Communication"],
    },
    educationPathway: {
      degree: "Bachelor's in Hospitality Management",
      certifications: ["CME", "CMP"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "Moderate" },
  },
  {
    title: "Psychologist",
    category: "Science",
    description:
      "Study cognitive, emotional, and social processes and behavior by observing, interpreting, and recording how people relate to one another and to their environments.",
    averageSalary: "$82,180",
    jobGrowth: "+8% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Conduct studies",
      "Diagnose disorders",
      "Provide therapy",
    ],
    skills: {
      technical: ["Research Methods", "Data Analysis"],
      soft: ["Empathy", "Analytic Skills"],
    },
    educationPathway: {
      degree: "Ph.D. in Psychology",
      certifications: ["State License"],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Doctoral Degree",
    futureScope: { demandTrend: "Steady", techChanges: "Low" },
  },
  {
    title: "Nutritionist",
    category: "Healthcare",
    description:
      "Advise people on what to eat in order to lead a healthy lifestyle or achieve a specific health-related goal.",
    averageSalary: "$63,090",
    jobGrowth: "+11% (Much faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Assess nutritional needs",
      "Develop meal plans",
      "Monitor progress",
    ],
    skills: {
      technical: ["Nutritional Science", "Dietary Planning"],
      soft: ["Communication", "Listening"],
    },
    educationPathway: {
      degree: "Bachelor's in Dietetics",
      certifications: ["RDN"],
    },
    difficulty: "Moderate",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "Low" },
  },
  {
    title: "Journalist",
    category: "Arts & Design",
    description:
      "Research, write, edit, and present news stories for newspapers, magazines, radio, television, and online media.",
    averageSalary: "$49,300",
    jobGrowth: "-9% (Declining)",
    bright_outlook: false,
    responsibilities: [
      "Investigate stories",
      "Interview sources",
      "Write articles",
    ],
    skills: {
      technical: ["Writing", "Multimedia Reporting"],
      soft: ["Curiosity", "Communication"],
    },
    educationPathway: {
      degree: "Bachelor's in Journalism",
      certifications: [],
    },
    difficulty: "Moderate",
    demandLevel: "Moderate",
    educationRequired: "Bachelor's Degree",
    futureScope: {
      demandTrend: "Declining",
      techChanges: "High (Digital Media)",
    },
  },
  {
    title: "Biomedical Engineer",
    category: "Engineering",
    description:
      "Combine engineering principles with medical sciences to design and create equipment, devices, computer systems, and software used in healthcare.",
    averageSalary: "$92,620",
    jobGrowth: "+10% (Faster than average)",
    bright_outlook: true,
    responsibilities: [
      "Design medical devices",
      "Install equipment",
      "Train clinicians",
    ],
    skills: {
      technical: ["Biomechanics", "Biomaterials"],
      soft: ["Problem Solving", "Creativity"],
    },
    educationPathway: {
      degree: "Bachelor's in Biomedical Engineering",
      certifications: [],
    },
    difficulty: "Advanced",
    demandLevel: "High",
    educationRequired: "Bachelor's Degree",
    futureScope: { demandTrend: "Growing", techChanges: "High" },
  },
];

export default careersData;
