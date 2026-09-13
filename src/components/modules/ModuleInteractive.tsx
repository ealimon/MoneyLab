import React, { useState, useEffect } from "react";
import { 
  Coins, Briefcase, PiggyBank, TrendingUp, Search, Lock, ShieldAlert, Rocket, Map, Heart,
  ArrowRight, Check, Play, RefreshCw, Star, Trash2, ShoppingBag, Plus, Minus, UserCheck, Eye, Trash
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Module, StockState } from "../../types";

interface ModuleInteractiveProps {
  module: Module;
  onComplete: (awardedCoins: number, awardedXp: number) => void;
  userCoins: number;
}

export default function ModuleInteractive({ module, onComplete, userCoins }: ModuleInteractiveProps) {
  const [gameState, setGameState] = useState<any>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize Game State based on module ID
  useEffect(() => {
    setIsCompleted(false);
    if (module.id === "m1") {
      // Barter Game & Coin Matcher
      setGameState({
        subMode: "barter", // "barter" | "coins"
        scenarioIndex: 0,
        scenarios: [
          { targetCents: 15, label: "Buy a Fresh Apple 🍎", targetStr: "$0.15" },
          { targetCents: 35, label: "Buy a Fun Sticker Pack 🎨", targetStr: "$0.35" },
          { targetCents: 60, label: "Buy an Ice Pop 🍦", targetStr: "$0.60" },
          { targetCents: 85, label: "Buy a Cool Notebook 📓", targetStr: "$0.85" },
          { targetCents: 100, label: "Save in Big Piggy Bank 🐷", targetStr: "$1.00" },
        ],
        trayCoins: [] as Array<{ id: number; name: string; cents: number; icon: string }>,
        currentCents: 0,
        inventory: ["Apples 🍎"],
        step: 1,
        logs: ["You have an Apple Orchard. Your goal is to trade for a cool Skateboard 🛹!"]
      });
    } else if (module.id === "m2") {
      // Careers
      setGameState({
        selectedJob: null,
        clicks: 0,
        earnings: 0,
        taxDeducted: 0,
        netPay: 0,
        stage: "select" // select, work, paystub
      });
    } else if (module.id === "m3") {
      // Needs vs Wants & Budget Simulation
      setGameState({
        activeTab: "sorter", // "sorter" | "allocator" | "simulation"
        sorterIndex: 0,
        sorterScore: 0,
        sorterFeedback: null,
        sorterCompleted: false,
        needsPercent: 50,
        wantsPercent: 30,
        savingsPercent: 20,
        monthIndex: 0,
        savings: 0,
        totalIncome: 0,
        totalNeeds: 0,
        totalWants: 0,
        selectedNeed: null,
        selectedWant: null,
        selectedSide: null,
        lastMonthNet: 0,
        lastInterestEarned: 0,
        monthHistory: [],
        stage: "monthly_play" // "monthly_play", "month_summary", "final_summary"
      });
    } else if (module.id === "m4") {
      // Compound Interest
      setGameState({
        monthlySavings: 50,
        rate: 6,
        age: 12,
        totalSaved: 0,
        totalInterest: 0,
        totalPortfolio: 0
      });
    } else if (module.id === "m5") {
      // Comparison Shopping
      setGameState({
        chipsAnswer: null, // 'A' or 'B'
        juiceAnswer: null, // 'X' or 'Y'
        feedback: "",
        score: 0,
        stage: "chips" // chips, juice, score
      });
    } else if (module.id === "m6") {
      // Banking Basics
      setGameState({
        payee: "",
        amountNum: "",
        amountWords: "",
        signature: "",
        checkApproved: false,
        checkingBalance: 0,
        cashWallet: 0,
        atmStage: "insert" // insert, deposit, withdraw
      });
    } else if (module.id === "m7") {
      // Debt Monster
      setGameState({
        plan: null, // 'full' or 'minimum'
        months: 0,
        debt: 1000,
        totalInterestPaid: 0,
        stage: "select" // select, simulate
      });
    } else if (module.id === "m8") {
      // Rocket Stocks
      const initialStocks: StockState[] = [
        { id: "s1", name: "ChocoTech", symbol: "CHOCO", price: 100, history: [100], volatility: 0.1, trend: 1, description: "Makes digital chocolate dispensers." },
        { id: "s2", name: "DinoEnergy", symbol: "DINO", price: 50, history: [50], volatility: 0.25, trend: 0, description: "Eco-friendly energy from fossil models." },
        { id: "s3", name: "CyberRobotics", symbol: "ROBO", price: 150, history: [150], volatility: 0.4, trend: -1, description: "Builds homework-doing androids." },
        { id: "s4", name: "MemeWear", symbol: "MEME", price: 20, history: [20], volatility: 0.7, trend: 0, description: "Gamer clothing that glows in the dark." }
      ];
      setGameState({
        stocks: initialStocks,
        cash: 500,
        shares: { CHOCO: 0, DINO: 0, ROBO: 0, MEME: 0 },
        day: 1,
        news: "Welcome to Wall Street! Click Next Day to watch stock charts react to the news!",
        portfolioValue: 500
      });
    } else if (module.id === "m9") {
      // Taxes at work
      setGameState({
        allocated: { schools: 0, parks: 0, roads: 0, fire: 0 },
        remainingTax: 200,
        stage: "allocate" // allocate, success
      });
    } else if (module.id === "m10") {
      // Charity/Giving
      setGameState({
        shelterDonated: 0,
        foodBankDonated: 0,
        forestDonated: 0,
        spentCoins: 0,
        badgeEarned: false
      });
    }
  }, [module.id]);

  const completeSimulation = () => {
    setIsCompleted(true);
    onComplete(module.coinReward, module.xpReward);
  };

  // ----------------------------------------------------
  // MODULE 1: BARTER & COIN MATCHER
  // ----------------------------------------------------
  const handleAddCoinToTray = (name: string, cents: number, icon: string) => {
    setGameState((prev: any) => {
      const newTray = [...(prev.trayCoins || []), { id: Date.now() + Math.random(), name, cents, icon }];
      const newCents = (prev.currentCents || 0) + cents;
      return {
        ...prev,
        trayCoins: newTray,
        currentCents: newCents
      };
    });
  };

  const handleResetTray = () => {
    setGameState((prev: any) => ({
      ...prev,
      trayCoins: [],
      currentCents: 0
    }));
  };

  const handleNextCoinScenario = () => {
    setGameState((prev: any) => {
      const nextIdx = (prev.scenarioIndex || 0) + 1;
      if (nextIdx >= (prev.scenarios?.length || 5)) {
        completeSimulation();
        return prev;
      }
      return {
        ...prev,
        scenarioIndex: nextIdx,
        trayCoins: [],
        currentCents: 0
      };
    });
  };

  const handleBarterTrade = (offeredItem: string, wantedItem: string, recipient: string, rewardItem: string) => {
    setGameState((prev: any) => {
      const inv = prev.inventory.filter((item: string) => item !== offeredItem);
      const newInv = [...inv, rewardItem];
      const newLogs = [
        ...prev.logs,
        `Traded ${offeredItem} to ${recipient} for ${rewardItem}!`
      ];
      return {
        ...prev,
        inventory: newInv,
        logs: newLogs,
        step: prev.step + 1
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 2: CAREER CHOICES & INCOME
  // ----------------------------------------------------
  const CAREER_TASKS: Record<string, {
    time: string;
    title: string;
    scenario: string;
    options: {
      label: string;
      bonus: number;
      feedback: string;
      isQuality: boolean;
    }[];
  }[]> = {
    "Baker 🥐": [
      {
        time: "09:00 AM - Morning Rush",
        title: "Large Croissant Order",
        scenario: "A local cafe orders 40 fresh croissants for their morning rush! How do you operate the bakery ovens?",
        options: [
          { label: "Use precision timer & calibrated baking temperatures", bonus: 15, feedback: "Perfect golden croissants! The cafe owner tips $15 for stellar quality.", isQuality: true },
          { label: "Crank oven heat to maximum to bake as fast as possible", bonus: 0, feedback: "Croissants were slightly burnt on top. No bonus earned.", isQuality: false }
        ]
      },
      {
        time: "01:00 PM - Ingredient Sourcing",
        title: "Flour Supply Management",
        scenario: "Flour prices went up! How do you source ingredients for tomorrow's bread and pastry batches?",
        options: [
          { label: "Compare wholesale suppliers to get organic flour at bulk discount", bonus: 20, feedback: "Great cost savings! Bakery manager awards a $20 efficiency bonus.", isQuality: true },
          { label: "Buy small bags at the retail grocery store last minute", bonus: 0, feedback: "Expensive retail purchase reduced bakery profit margins.", isQuality: false }
        ]
      },
      {
        time: "04:00 PM - Custom Special Order",
        title: "3-Tier Birthday Cake",
        scenario: "A customer requests an elaborate custom birthday cake with intricate sugar decorations.",
        options: [
          { label: "Craft detailed sugar decorations with care and precision", bonus: 25, feedback: "Customer was thrilled with the masterpiece and left a $25 tip!", isQuality: true },
          { label: "Rush through decoration with basic standard frosting", bonus: 5, feedback: "Customer accepted it, leaving a small $5 tip.", isQuality: false }
        ]
      }
    ],
    "Eco Scientist 🧪": [
      {
        time: "09:00 AM - Field Sampling",
        title: "River Water Quality Check",
        scenario: "Water samples from the local river show an unusual acidic pH reading near the industrial park.",
        options: [
          { label: "Run multi-point chemical lab testing to isolate the exact pollution source", bonus: 25, feedback: "Accurate data isolated the runoff source! City awards a $25 research bonus.", isQuality: true },
          { label: "Guess the cause without re-testing to finish field work early", bonus: 0, feedback: "Inaccurate report required re-sampling later. No bonus earned.", isQuality: false }
        ]
      },
      {
        time: "01:00 PM - Council Presentation",
        title: "Environmental Impact Report",
        scenario: "You are presenting clean energy initiatives and solar impact statistics to the town council.",
        options: [
          { label: "Create clear, easy-to-read charts highlighting community savings", bonus: 30, feedback: "Council approved $10k in green grants & awarded a $30 merit bonus!", isQuality: true },
          { label: "Present unorganized raw spreadsheets without summary visual charts", bonus: 0, feedback: "Council struggled to understand the data. No bonus awarded.", isQuality: false }
        ]
      },
      {
        time: "04:00 PM - Laboratory Audit",
        title: "Lab Safety & Mentorship",
        scenario: "A student intern left chemical containers un-labeled in the testing area.",
        options: [
          { label: "Safely label everything according to ISO protocols and coach the intern", bonus: 20, feedback: "Lab Director praises your leadership with a $20 safety excellence bonus!", isQuality: true },
          { label: "Ignore the containers and leave them for the evening shift", bonus: 0, feedback: "Safety hazard flagged by inspector.", isQuality: false }
        ]
      }
    ],
    "Veterinarian 🩺": [
      {
        time: "09:00 AM - Morning Appointment",
        title: "Puppy Wellness Exam",
        scenario: "Barnaby the Golden Retriever puppy is visiting for his annual checkup and vaccinations.",
        options: [
          { label: "Perform gentle full exam, weigh Barnaby, and reward him with treats", bonus: 25, feedback: "Barnaby was calm & happy! Pet owner left a 5-star review & $25 tip.", isQuality: true },
          { label: "Rush the examination without calming treats or gentle handling", bonus: 0, feedback: "Barnaby whimpered and was frightened. No tip received.", isQuality: false }
        ]
      },
      {
        time: "01:00 PM - Pharmacy & Dosage",
        title: "Medication Calculation",
        scenario: "Calculating antibiotic dosage for a 12 lb feline patient suffering from an ear infection.",
        options: [
          { label: "Use exact weight formula (10mg/lb = 120mg) and verify with chart", bonus: 30, feedback: "Spot-on treatment plan! Clinic Director awards a $30 accuracy bonus.", isQuality: true },
          { label: "Estimate dosage by eye without checking the patient weight record", bonus: 0, feedback: "Risky estimate corrected by senior vet. No bonus earned.", isQuality: false }
        ]
      },
      {
        time: "04:00 PM - Urgent Walk-In",
        title: "Emergency Parrot Care",
        scenario: "A parrot swallowed a shiny metal button and needs immediate emergency care!",
        options: [
          { label: "Perform digital X-ray imaging and gently extract the foreign object", bonus: 35, feedback: "Successfully saved the parrot! Grateful owner rewards a $35 emergency bonus.", isQuality: true },
          { label: "Refer the patient to a clinic 45 minutes across town", bonus: 0, feedback: "Patient transferred elsewhere.", isQuality: false }
        ]
      }
    ],
    "Game Developer 💻": [
      {
        time: "09:00 AM - Server Optimization",
        title: "Multiplayer Lag Bug",
        scenario: "Your team's new online multiplayer game suffers lag spikes when 100 players gather in a city.",
        options: [
          { label: "Optimize networking code & cache player positions on local clients", bonus: 35, feedback: "Frame rate doubled! Lead Architect awards a $35 performance bonus.", isQuality: true },
          { label: "Lower game graphics resolution for all players to reduce bandwidth", bonus: 0, feedback: "Players complained about blurry visuals.", isQuality: false }
        ]
      },
      {
        time: "01:00 PM - User Interface UX",
        title: "Mobile Screen Redesign",
        scenario: "Redesigning the main game navigation menu for smaller mobile touchscreen displays.",
        options: [
          { label: "Design touch-friendly large controls with haptic feedback responses", bonus: 40, feedback: "User satisfaction jumped 45%! Studio grants a $40 UX Award.", isQuality: true },
          { label: "Keep tiny desktop buttons crammed on the phone screen", bonus: 0, feedback: "Players kept misclicking buttons.", isQuality: false }
        ]
      },
      {
        time: "04:00 PM - Season Update Launch",
        title: "Production Deployment",
        scenario: "Preparing to publish the new season game update to millions of active players.",
        options: [
          { label: "Run automated test suites and deploy staging server sandbox first", bonus: 45, feedback: "Flawless launch with zero server downtime! Executive $45 bonus awarded!", isQuality: true },
          { label: "Push code directly to live production servers without running tests", bonus: 0, feedback: "Server crashed for 20 minutes.", isQuality: false }
        ]
      }
    ]
  };

  const selectJob = (jobName: string, wage: number) => {
    setGameState({
      selectedJob: { name: jobName, wage },
      taskIndex: 0,
      totalBonus: 0,
      taskFeedback: null,
      selectedOption: null,
      stage: "work"
    });
  };

  const handleTaskChoice = (bonus: number, feedback: string, optionIndex: number) => {
    setGameState((prev: any) => ({
      ...prev,
      selectedOption: optionIndex,
      taskFeedback: feedback,
      totalBonus: prev.totalBonus + bonus
    }));
  };

  const handleNextTask = () => {
    setGameState((prev: any) => {
      const jobKey = prev.selectedJob?.name || "Baker 🥐";
      const tasks = CAREER_TASKS[jobKey] || CAREER_TASKS["Baker 🥐"];
      const nextIdx = prev.taskIndex + 1;

      if (nextIdx >= tasks.length) {
        const baseEarnings = prev.selectedJob.wage * 8;
        const grossPay = baseEarnings + prev.totalBonus;
        const tax = Math.round(grossPay * 0.20);
        const netPay = grossPay - tax;
        return {
          ...prev,
          taskIndex: nextIdx,
          baseEarnings,
          grossPay,
          taxDeducted: tax,
          netPay,
          stage: "paystub"
        };
      }

      return {
        ...prev,
        taskIndex: nextIdx,
        selectedOption: null,
        taskFeedback: null
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 3: 6-MONTH BUDGET SIMULATION
  // ----------------------------------------------------
  const SIMULATION_MONTHS = [
    {
      monthName: "January",
      seasonIcon: "❄️",
      motto: "Winter Bills & Grocery Strategy",
      income: 1000,
      fixedNeeds: [
        { name: "Apartment Rent", amount: 400 },
        { name: "Winter Heating & Utilities", amount: 120 },
        { name: "Water & Trash Service", amount: 30 }
      ],
      variableNeedOptions: {
        title: "Grocery Shopping Strategy",
        description: "January is cold! How will you stock your kitchen for the month?",
        options: [
          { label: "Store-Brand Pantry Staples & Meal Prep", cost: 150, feedback: "Smart choice! You saved $90 on groceries without sacrificing nutrition.", tag: "smart" },
          { label: "Name-Brand Gourmet Snacks & Prepared Meals", cost: 240, feedback: "Convenient & delicious, but gourmet snacks ate up a big chunk of cash!", tag: "splurge" }
        ]
      },
      wantOptions: {
        title: "Weekend Entertainment",
        description: "Your friends invite you to hang out this Friday evening.",
        options: [
          { label: "Movie night at home with homemade popcorn", cost: 5, feedback: "Cozy night in! Saved $25 while still having a blast with friends.", tag: "frugal" },
          { label: "Go to movie theater with large popcorn & combo soda", cost: 30, feedback: "Fun movie theater outing!", tag: "fun" }
        ]
      }
    },
    {
      monthName: "February",
      seasonIcon: "💌",
      motto: "Online Side Hustle & Phone Plan",
      income: 1000,
      fixedNeeds: [
        { name: "Apartment Rent", amount: 400 },
        { name: "Electricity & Heating", amount: 100 },
        { name: "Home Internet", amount: 40 }
      ],
      sideEvent: {
        title: "Decluttering Your Room (Side Income Opportunity)",
        description: "You have old magazines, comics, and unused gadgets sitting in your closet.",
        options: [
          { label: "Sell old magazines & unused gadgets online", amount: 80, feedback: "Awesome side hustle! Earned +$80 extra income selling online!" },
          { label: "Leave everything in the closet", amount: 0, feedback: "Decluttering deferred. No extra income earned." }
        ]
      },
      variableNeedOptions: {
        title: "Monthly Phone & Data Plan",
        description: "Your cell phone contract is up for renewal.",
        options: [
          { label: "Switch to basic prepaid unlimited talk & text plan", cost: 35, feedback: "Great deal! Keeps you connected while saving $35/month.", tag: "smart" },
          { label: "Keep premium unlimited high-speed streaming data plan", cost: 70, feedback: "Super fast downloads, but costs double the basic plan.", tag: "splurge" }
        ]
      },
      wantOptions: {
        title: "Valentine's Week Celebration",
        description: "Looking to celebrate Valentine's week with delicious treats.",
        options: [
          { label: "Bake chocolate cupcakes at home with friends", cost: 10, feedback: "Yummy baking session and saved $35!", tag: "frugal" },
          { label: "Order fancy bakery delivery cakes & chocolates", cost: 45, feedback: "Delicious gourmet cake delivery!", tag: "fun" }
        ]
      }
    },
    {
      monthName: "March",
      seasonIcon: "🚗",
      motto: "Surprise Bike Repair — Life Happens!",
      income: 1000,
      fixedNeeds: [
        { name: "Apartment Rent", amount: 400 },
        { name: "Electric & Water Utilities", amount: 90 },
        { name: "Home Internet", amount: 40 }
      ],
      sideEvent: {
        title: "Unexpected Event: Bicycle Repair Bill!",
        description: "Your bike tire popped and chain broke on the way to work/school!",
        options: [
          { label: "Fix flat tire & replace chain at local repair shop (-$65)", amount: -65, feedback: "Essential transportation need paid! Your savings emergency buffer handled it seamlessly." },
          { label: "Buy a brand-new expensive sports bike (-$280)", amount: -280, feedback: "The new bike looks cool, but severely drained your savings!" }
        ]
      },
      variableNeedOptions: {
        title: "Weekly Grocery Plan",
        description: "How will you manage your food supplies for March?",
        options: [
          { label: "Nutritious home cooking meal plan", cost: 160, feedback: "Healthy and affordable meal planning!", tag: "smart" },
          { label: "Eating fast food drive-thrus regularly", cost: 230, feedback: "Convenient fast food added up quickly!", tag: "splurge" }
        ]
      },
      wantOptions: {
        title: "Video Game Season Release",
        description: "A popular new season update and battle pass launched.",
        options: [
          { label: "Skip the game expansion for now", cost: 0, feedback: "Patience paid off! $0 spent.", tag: "frugal" },
          { label: "Buy new battle pass & character cosmetic skin", cost: 30, feedback: "Fun game skin! Just remember it's a Want.", tag: "fun" }
        ]
      }
    },
    {
      monthName: "April",
      seasonIcon: "🌧️",
      motto: "Spring Utilities & Yard Cleaning Hustle",
      income: 1000,
      fixedNeeds: [
        { name: "Apartment Rent", amount: 400 },
        { name: "Spring Climate Utilities", amount: 70 },
        { name: "Home Internet", amount: 40 }
      ],
      sideEvent: {
        title: "Spring Yard Cleaning Hustle",
        description: "Your neighbor asks for help clearing fallen branches and raking leaves.",
        options: [
          { label: "Help neighbor clean yard on Saturday morning (+ $70)", amount: 70, feedback: "Hard work paid off! Earned +$70 cash!" },
          { label: "Sleep in all Saturday (+ $0)", amount: 0, feedback: "Rested up, but no extra earnings." }
        ]
      },
      variableNeedOptions: {
        title: "Spring Wardrobe Replacement",
        description: "You've outgrown your old sneakers and work shoes.",
        options: [
          { label: "Thrift store quality shoes & essentials", cost: 45, feedback: "Found durable, stylish shoes at a bargain!", tag: "smart" },
          { label: "Designer sneakers at the mall", cost: 140, feedback: "Cool designer look, but expensive!", tag: "splurge" }
        ]
      },
      wantOptions: {
        title: "Concert Ticket Outing",
        description: "Your favorite music artist is performing live.",
        options: [
          { label: "Watch live stream concert online with friends", cost: 10, feedback: "Great music vibe with snacks at home!", tag: "frugal" },
          { label: "Buy front-row concert ticket", cost: 85, feedback: "Unforgettable show, but a major Want splurge!", tag: "fun" }
        ]
      }
    },
    {
      monthName: "May",
      seasonIcon: "🌸",
      motto: "Best Friend's Birthday & Bank Interest",
      income: 1000,
      fixedNeeds: [
        { name: "Apartment Rent", amount: 400 },
        { name: "Utilities", amount: 75 },
        { name: "Home Internet", amount: 40 }
      ],
      variableNeedOptions: {
        title: "Household Supplies & Groceries",
        description: "Stocking up on laundry detergent, soap, and groceries.",
        options: [
          { label: "Bulk warehouse club buy (toilet paper, soap, staples)", cost: 170, feedback: "Buying bulk lowered your per-unit cost for future months!", tag: "smart" },
          { label: "Retail grocery single items as needed", cost: 210, feedback: "Higher per-unit prices overall.", tag: "splurge" }
        ]
      },
      wantOptions: {
        title: "Best Friend's Birthday Gift",
        description: "Your best friend's birthday is coming up this weekend.",
        options: [
          { label: "Craft custom photo scrapbook & framed picture", cost: 20, feedback: "Heartfelt custom gift that your friend loved!", tag: "frugal" },
          { label: "Buy expensive store gift card & huge plush toy", cost: 60, feedback: "Generous gift, but higher cost!", tag: "fun" }
        ]
      }
    },
    {
      monthName: "June",
      seasonIcon: "☀️",
      motto: "Summer Kickoff & Final Financial Audit",
      income: 1000,
      fixedNeeds: [
        { name: "Apartment Rent", amount: 400 },
        { name: "Summer Air Conditioning Utilities", amount: 110 },
        { name: "Home Internet", amount: 40 }
      ],
      variableNeedOptions: {
        title: "Summer Meal Planning",
        description: "June weather is warm! Planning your groceries.",
        options: [
          { label: "Local farmers market produce & home prep", cost: 150, feedback: "Fresh, healthy & budget-friendly!", tag: "smart" },
          { label: "Pre-made summer deli platters & pre-cut fruit", cost: 220, feedback: "Convenient, but deli prices are high.", tag: "splurge" }
        ]
      },
      wantOptions: {
        title: "Summer Kickoff Event",
        description: "Kicking off the summer season with outdoor fun.",
        options: [
          { label: "Local beach & park picnic day", cost: 15, feedback: "Sunny fun for cheap!", tag: "frugal" },
          { label: "Water park season pass", cost: 75, feedback: "Water park slides are awesome, but cost $75!", tag: "fun" }
        ]
      }
    }
  ];

  // Needs vs Wants Sorter Items
  const NEEDS_WANTS_ITEMS = [
    { id: 1, name: "Fresh Vegetables & Groceries", icon: "🥦", type: "need", description: "Essential food required for basic nutrition, health, and energy." },
    { id: 2, name: "Latest Video Game Console", icon: "🎮", type: "want", description: "Awesome entertainment, but not required to survive." },
    { id: 3, name: "Monthly Rent & Safe Shelter", icon: "🏠", type: "need", description: "A safe home and roof over your head is a critical Need." },
    { id: 4, name: "Front-Row Concert Tickets", icon: "🎟️", type: "want", description: "An exciting live show, but strictly a luxury Want." },
    { id: 5, name: "Home Electricity & Heating Bill", icon: "⚡", type: "need", description: "Powers your home lights, refrigerator, and winter heating." },
    { id: 6, name: "Designer $200 Sneakers", icon: "👟", type: "want", description: "Basic protective shoes are a need, but expensive designer sneakers are a want." },
    { id: 7, name: "Clean Utility Water Bill", icon: "💧", type: "need", description: "Clean drinking and washing water is essential for health." },
    { id: 8, name: "Gourmet Bakery Dessert Delivery", icon: "🍰", type: "want", description: "A delicious sweet treat to enjoy occasionally, not a basic need." }
  ];

  const handleClassifySorterItem = (itemType: "need" | "want") => {
    const sIdx = typeof gameState.sorterIndex === "number" ? gameState.sorterIndex : 0;
    const currentItem = NEEDS_WANTS_ITEMS[sIdx] || NEEDS_WANTS_ITEMS[0];
    const isCorrect = itemType === currentItem.type;

    setGameState((prev: any) => ({
      ...prev,
      sorterScore: isCorrect ? (prev.sorterScore || 0) + 1 : (prev.sorterScore || 0),
      sorterFeedback: {
        isCorrect,
        text: isCorrect
          ? `Correct! "${currentItem.name}" is a ${currentItem.type.toUpperCase()}. ${currentItem.description}`
          : `Oops! "${currentItem.name}" is actually a ${currentItem.type.toUpperCase()}. ${currentItem.description}`
      }
    }));
  };

  const handleNextSorterItem = () => {
    setGameState((prev: any) => {
      const nextIdx = (prev.sorterIndex || 0) + 1;
      if (nextIdx >= NEEDS_WANTS_ITEMS.length) {
        return {
          ...prev,
          sorterCompleted: true,
          sorterFeedback: null
        };
      }
      return {
        ...prev,
        sorterIndex: nextIdx,
        sorterFeedback: null
      };
    });
  };

  const handleSelectSimulationOption = (type: "need" | "want" | "side", optionIndex: number) => {
    setGameState((prev: any) => ({
      ...prev,
      [type === "need" ? "selectedNeed" : type === "want" ? "selectedWant" : "selectedSide"]: optionIndex
    }));
  };

  const handleCompleteSimulationMonth = () => {
    setGameState((prev: any) => {
      const mIdx = typeof prev.monthIndex === "number" ? prev.monthIndex : 0;
      const monthData = SIMULATION_MONTHS[mIdx] || SIMULATION_MONTHS[0];
      const fixedNeedsSum = monthData.fixedNeeds.reduce((acc, curr) => acc + curr.amount, 0);
      const varNeedCost = typeof prev.selectedNeed === "number" && monthData.variableNeedOptions.options[prev.selectedNeed]
        ? monthData.variableNeedOptions.options[prev.selectedNeed].cost
        : 0;
      const totalMonthNeeds = fixedNeedsSum + varNeedCost;

      const wantCost = typeof prev.selectedWant === "number" && monthData.wantOptions.options[prev.selectedWant]
        ? monthData.wantOptions.options[prev.selectedWant].cost
        : 0;

      let sideIncomeOrExpense = 0;
      if (monthData.sideEvent && typeof prev.selectedSide === "number" && monthData.sideEvent.options[prev.selectedSide]) {
        sideIncomeOrExpense = monthData.sideEvent.options[prev.selectedSide].amount;
      }

      const totalMonthIncome = monthData.income + (sideIncomeOrExpense > 0 ? sideIncomeOrExpense : 0);
      const extraExpense = sideIncomeOrExpense < 0 ? Math.abs(sideIncomeOrExpense) : 0;

      const netSurplus = totalMonthIncome - (totalMonthNeeds + wantCost + extraExpense);

      const currSavings = typeof prev.savings === "number" ? prev.savings : 0;
      const interestEarned = Math.round(currSavings * 0.005);
      const newSavings = Math.max(0, currSavings + interestEarned + netSurplus);

      const monthSummaryLog = {
        monthName: monthData.monthName,
        income: totalMonthIncome,
        needs: totalMonthNeeds,
        wants: wantCost + extraExpense,
        netSurplus,
        interestEarned,
        savingsAfter: newSavings
      };

      return {
        ...prev,
        savings: newSavings,
        totalIncome: (prev.totalIncome || 0) + totalMonthIncome,
        totalNeeds: (prev.totalNeeds || 0) + totalMonthNeeds,
        totalWants: (prev.totalWants || 0) + wantCost + extraExpense,
        lastMonthNet: netSurplus,
        lastInterestEarned: interestEarned,
        monthHistory: [...(prev.monthHistory || []), monthSummaryLog],
        stage: "month_summary"
      };
    });
  };

  const handleNextSimulationMonth = () => {
    setGameState((prev: any) => {
      const nextMonthIdx = (prev.monthIndex || 0) + 1;
      if (nextMonthIdx >= SIMULATION_MONTHS.length) {
        return {
          ...prev,
          stage: "final_summary"
        };
      }
      return {
        ...prev,
        monthIndex: nextMonthIdx,
        selectedNeed: null,
        selectedWant: null,
        selectedSide: null,
        stage: "monthly_play"
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 4: COMPOUND INTEREST
  // ----------------------------------------------------
  useEffect(() => {
    if (module.id === "m4" && gameState.age !== undefined) {
      let principal = 0;
      let total = 0;
      const rateDecimal = (gameState.rate || 6) / 100 / 12;
      const months = (gameState.age - 12) * 12;
      const monthlyAdd = gameState.monthlySavings || 50;

      for (let i = 0; i < months; i++) {
        total = (total + monthlyAdd) * (1 + rateDecimal);
        principal += monthlyAdd;
      }

      setGameState((prev: any) => ({
        ...prev,
        totalSaved: Math.round(principal),
        totalInterest: Math.round(Math.max(0, total - principal)),
        totalPortfolio: Math.round(total)
      }));
    }
  }, [gameState.monthlySavings, gameState.rate, gameState.age, module.id]);

  // ----------------------------------------------------
  // MODULE 5: COMPARISON SHOPPING
  // ----------------------------------------------------
  const submitChips = (answer: "A" | "B") => {
    setGameState((prev: any) => ({
      ...prev,
      chipsAnswer: answer,
      stage: "juice"
    }));
  };

  const submitJuice = (answer: "X" | "Y") => {
    let score = 0;
    let feedback = "";
    if (gameState.chipsAnswer === "B") score += 50;
    if (answer === "Y") score += 50;

    if (score === 100) {
      feedback = "Whooo-ray! You scored 100%! You found that Brand B chips ($0.20/oz) and Brand Y juice boxes ($0.40/pack with coupon) are the smartest buys! Truly a Deal Detective!";
    } else if (score === 50) {
      feedback = "Good try! You got one deal right, but missed another. Let's look closely at the math and unlock your rewards!";
    } else {
      feedback = "Oops! Remember, always divide the Total Price by the Quantity to find the true price-per-unit. Let's learn and proceed!";
    }

    setGameState((prev: any) => ({
      ...prev,
      juiceAnswer: answer,
      score,
      feedback,
      stage: "score"
    }));
  };

  // ----------------------------------------------------
  // MODULE 6: BANKING
  // ----------------------------------------------------
  const submitCheck = () => {
    if (
      gameState.payee.toLowerCase().includes("arcade") &&
      gameState.amountNum === "150" &&
      gameState.amountWords.toLowerCase().includes("one hundred fifty") &&
      gameState.signature.trim().length > 2
    ) {
      setGameState((prev: any) => ({
        ...prev,
        checkApproved: true,
        atmStage: "insert",
        checkingBalance: 150
      }));
    } else {
      alert("Hoot! Check the details on the check. Pay to: Finny's Arcade, Amount: 150, Words: One Hundred Fifty, and sign your name!");
    }
  };

  const performATMDeposit = () => {
    setGameState((prev: any) => ({
      ...prev,
      atmStage: "withdraw",
      checkingBalance: prev.checkingBalance + 50
    }));
  };

  const performATMWithdraw = () => {
    setGameState((prev: any) => ({
      ...prev,
      atmStage: "done",
      checkingBalance: prev.checkingBalance - 20,
      cashWallet: 20
    }));
  };

  // ----------------------------------------------------
  // MODULE 7: THE DEBT TRAP
  // ----------------------------------------------------
  const chooseDebtPlan = (plan: "full" | "minimum") => {
    setGameState((prev: any) => ({
      ...prev,
      plan,
      debt: 1000,
      totalInterestPaid: 0,
      months: 0,
      stage: "simulate"
    }));
  };

  const fastForwardDebt = () => {
    setGameState((prev: any) => {
      let currentDebt = prev.debt;
      let interestPaid = prev.totalInterestPaid;
      const monthlyRate = 0.20 / 12; // 20% APR

      if (prev.plan === "full") {
        return {
          ...prev,
          debt: 0,
          months: 1,
          totalInterestPaid: 0
        };
      } else {
        // Minimum payment of $30/mo
        for (let m = 0; m < 12; m++) {
          if (currentDebt <= 0) break;
          const interest = currentDebt * monthlyRate;
          interestPaid += interest;
          currentDebt = currentDebt + interest - 30;
        }
        return {
          ...prev,
          debt: Math.max(0, Math.round(currentDebt)),
          months: prev.months + 12,
          totalInterestPaid: Math.round(interestPaid)
        };
      }
    });
  };

  // ----------------------------------------------------
  // MODULE 8: ROCKET STOCK SIMULATOR
  // ----------------------------------------------------
  const buyStock = (stockId: string, price: number) => {
    if (gameState.cash < price) return;
    setGameState((prev: any) => {
      const stock = prev.stocks.find((s: any) => s.id === stockId);
      const newShares = { ...prev.shares, [stock.symbol]: prev.shares[stock.symbol] + 1 };
      const newCash = prev.cash - price;
      
      const portfolioVal = newCash + prev.stocks.reduce((sum: number, s: any) => {
        return sum + (newShares[s.symbol] * s.price);
      }, 0);

      return {
        ...prev,
        cash: Math.round(newCash),
        shares: newShares,
        portfolioValue: Math.round(portfolioVal)
      };
    });
  };

  const sellStock = (stockId: string, price: number) => {
    setGameState((prev: any) => {
      const stock = prev.stocks.find((s: any) => s.id === stockId);
      if (prev.shares[stock.symbol] <= 0) return prev;
      
      const newShares = { ...prev.shares, [stock.symbol]: prev.shares[stock.symbol] - 1 };
      const newCash = prev.cash + price;
      
      const portfolioVal = newCash + prev.stocks.reduce((sum: number, s: any) => {
        return sum + (newShares[s.symbol] * s.price);
      }, 0);

      return {
        ...prev,
        cash: Math.round(newCash),
        shares: newShares,
        portfolioValue: Math.round(portfolioVal)
      };
    });
  };

  const advanceStockDay = () => {
    const marketNews = [
      { text: "ChocoTech launches an automated chocolate waffle maker! CHOCO shares soar!", stocks: { CHOCO: 0.25, DINO: 0.05, ROBO: 0.1, MEME: -0.05 } },
      { text: "Reports of hacker activity in CyberRobotics drops client trust. ROBO dips.", stocks: { CHOCO: -0.02, DINO: 0.02, ROBO: -0.22, MEME: 0.05 } },
      { text: "A massive solar storm powers DinoEnergy clean panels. DINO stocks boom!", stocks: { CHOCO: 0.05, DINO: 0.35, ROBO: 0.05, MEME: 0.02 } },
      { text: "MemeWear viral hoodie becomes popular on school apps! MEME shares skyrocket!", stocks: { CHOCO: 0.1, DINO: -0.1, ROBO: 0.0, MEME: 0.85 } },
      { text: "General market slowdown. Prices consolidation across sectors.", stocks: { CHOCO: -0.05, DINO: -0.04, ROBO: -0.08, MEME: -0.15 } }
    ];

    const selectedNews = marketNews[Math.floor(Math.random() * marketNews.length)];

    setGameState((prev: any) => {
      const nextDay = prev.day + 1;
      const updatedStocks = prev.stocks.map((stock: StockState) => {
        const changeFactor = selectedNews.stocks[stock.symbol as keyof typeof selectedNews.stocks] || 0;
        // Add random market noise
        const noise = (Math.random() - 0.5) * stock.volatility;
        const multiplier = 1 + changeFactor + noise;
        const newPrice = Math.max(5, Math.round(stock.price * multiplier));
        return {
          ...stock,
          price: newPrice,
          history: [...stock.history, newPrice]
        };
      });

      const portfolioVal = prev.cash + updatedStocks.reduce((sum: number, s: any) => {
        return sum + (prev.shares[s.symbol] * s.price);
      }, 0);

      return {
        ...prev,
        stocks: updatedStocks,
        day: nextDay,
        news: selectedNews.text,
        portfolioValue: Math.round(portfolioVal)
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 9: TAXES AT WORK
  // ----------------------------------------------------
  const allocateTax = (category: "schools" | "parks" | "roads" | "fire", amount: number) => {
    if (gameState.remainingTax <= 0 && amount > 0) return;
    setGameState((prev: any) => {
      const currentVal = prev.allocated[category];
      const newVal = Math.max(0, currentVal + amount);
      const diff = newVal - currentVal;
      return {
        ...prev,
        allocated: {
          ...prev.allocated,
          [category]: newVal
        },
        remainingTax: prev.remainingTax - diff
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 10: PHILANTHROPY / CHARITY
  // ----------------------------------------------------
  const donateCoins = (charity: "shelter" | "foodBank" | "forest", amount: number) => {
    if (userCoins < amount) {
      alert("Hoot! You don't have enough earned Fin-Coins for this donation yet. Keep completing modules to earn more coins!");
      return;
    }
    setGameState((prev: any) => {
      const itemKey = `${charity}Donated` as const;
      return {
        ...prev,
        [itemKey]: (prev[itemKey] || 0) + amount,
        spentCoins: prev.spentCoins + amount,
        badgeEarned: true
      };
    });
  };

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-sm font-black text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Module {module.id.replace("m", "")} Interactive Game
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">{module.title}</h2>
          <p className="text-sm text-slate-500 font-semibold">{module.subtitle}</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-center px-1">
            <p className="text-xs font-black text-slate-400 uppercase">XP Reward</p>
            <p className="font-bold text-base text-blue-600">+{module.xpReward} XP</p>
          </div>
          <div className="h-6 w-[1px] bg-slate-200" />
          <div className="text-center px-1">
            <p className="text-xs font-black text-slate-400 uppercase">Coins Reward</p>
            <p className="font-bold text-base text-yellow-500">+{module.coinReward} Coins</p>
          </div>
        </div>
      </div>

      {/* Game Stage Content */}
      <div className="min-h-[300px]">
        {/* MODULE 1: COIN MATCHER & BARTER SYSTEM */}
        {module.id === "m1" && (
          <div className="space-y-6 text-left">
            {/* Mode Switcher */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider font-display">
                MODULE 1: MONEY BASICS | Scenario {((gameState.scenarioIndex || 0) + 1)} of {(gameState.scenarios?.length || 5)} | ⭐ Win 5 Stars per scenario!
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setGameState((prev: any) => ({ ...prev, subMode: "coins" }))}
                  className={`px-3 py-1 rounded-xl text-xs font-black font-display border-2 border-black transition-all cursor-pointer ${
                    (gameState.subMode || "coins") === "coins"
                      ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  🪙 Coin Matcher
                </button>
                <button
                  onClick={() => setGameState((prev: any) => ({ ...prev, subMode: "barter" }))}
                  className={`px-3 py-1 rounded-xl text-xs font-black font-display border-2 border-black transition-all cursor-pointer ${
                    gameState.subMode === "barter"
                      ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  🍎 Barter Chain
                </button>
              </div>
            </div>

            {/* COIN MATCHER MODE */}
            {(gameState.subMode || "coins") === "coins" && (() => {
              const currentScenario = (gameState.scenarios && gameState.scenarios[gameState.scenarioIndex || 0]) || {
                targetCents: 15,
                label: "Buy a Fresh Apple 🍎",
                targetStr: "$0.15"
              };
              const targetCents = currentScenario.targetCents;
              const currentCents = gameState.currentCents || 0;
              const isMatched = currentCents === targetCents;
              const isOver = currentCents > targetCents;
              const isUnder = currentCents < targetCents;

              return (
                <div className="space-y-6">
                  {/* Scenario Goal Header */}
                  <div className="bg-[#fffbeb] border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_#000] space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="bg-yellow-400 border-2 border-black text-black px-3 py-1 rounded-full text-xs font-black uppercase font-display shadow-[2px_2px_0px_0px_#000]">
                        TARGET CHALLENGE: {currentScenario.label}
                      </span>
                      <span className="text-xs font-bold text-slate-600 font-mono">
                        Target: <strong className="text-black text-sm">{currentScenario.targetStr}</strong>
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-slate-800">
                      Click on coins below to match the exact target amount and deposit them into your Piggy Bank!
                    </p>
                  </div>

                  {/* Dual Meters: Target vs Current Tray */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Target Amount */}
                    <div className="bg-white border-3 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-display">Target Amount</span>
                        <p className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                          ${(targetCents / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-amber-100 border-2 border-black rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#000]">
                        🎯
                      </div>
                    </div>

                    {/* Your Current Count */}
                    <div className={`border-3 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000] flex items-center justify-between transition-colors ${
                      isMatched ? "bg-emerald-100" : isOver ? "bg-rose-100" : "bg-white"
                    }`}>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-display">Your Current Count</span>
                        <p className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                          ${(currentCents / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-200 border-2 border-black rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#000]">
                        🐷
                      </div>
                    </div>
                  </div>

                  {/* Live Feedback Banner */}
                  <div className={`border-2 border-black rounded-2xl p-4 font-display font-black text-sm shadow-[2px_2px_0px_0px_#000] flex items-center justify-between flex-wrap gap-2 ${
                    isMatched 
                      ? "bg-emerald-300 text-black" 
                      : isOver 
                        ? "bg-rose-300 text-black" 
                        : "bg-sky-100 text-slate-900"
                  }`}>
                    <span>
                      {isMatched && `🎉 Target Matched! You have exactly $${(targetCents / 100).toFixed(2)}! (+5 Stars awarded)`}
                      {isUnder && `Need $${((targetCents - currentCents) / 100).toFixed(2)} more to reach target!`}
                      {isOver && `Oops! Over by $${((currentCents - targetCents) / 100).toFixed(2)}. Click Reset to try again!`}
                    </span>
                    {isMatched && (
                      <button
                        onClick={handleNextCoinScenario}
                        className="bg-black text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        {(gameState.scenarioIndex || 0) < (gameState.scenarios?.length || 5) - 1 ? "Next Scenario ➡️" : "Complete Lesson 🏆"}
                      </button>
                    )}
                  </div>

                  {/* Piggy Bank Coin Tray Display */}
                  <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[3px_3px_0px_0px_#000] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-600 font-display flex items-center gap-1.5">
                        <span>🐷</span> Coins In Your Bank ({(gameState.trayCoins || []).length} coins):
                      </span>
                      {(gameState.trayCoins || []).length > 0 && (
                        <button
                          onClick={handleResetTray}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          Reset Coins 🔄
                        </button>
                      )}
                    </div>

                    <div className="min-h-[70px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-3 flex flex-wrap gap-2.5 items-center">
                      {(gameState.trayCoins || []).length === 0 ? (
                        <span className="text-xs font-bold text-slate-400 italic">
                          Your piggy bank tray is currently empty. Tap the coins below to drop them in!
                        </span>
                      ) : (
                        gameState.trayCoins.map((coin: any) => (
                          <span
                            key={coin.id}
                            className="bg-yellow-200 border-2 border-black px-3 py-1.5 rounded-xl font-display font-black text-xs shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 animate-in zoom-in-75 duration-150"
                          >
                            <span>{coin.icon}</span>
                            <span>{coin.cents}¢</span>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Clickable Coins Bank */}
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-600 font-display">
                      TAP ANY COIN TO ADD TO TRAY:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      {/* Penny */}
                      <button
                        onClick={() => handleAddCoinToTray("Penny", 1, "🪙")}
                        className="bg-[#fed7aa] hover:bg-[#fdba74] border-3 border-black p-3.5 rounded-2xl shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 transition-all text-center flex flex-col items-center gap-1 cursor-pointer font-display"
                      >
                        <span className="text-2xl">🪙</span>
                        <span className="font-black text-slate-950 text-sm">Penny</span>
                        <span className="bg-white border border-black px-2 py-0.5 rounded-full text-[11px] font-black">1¢</span>
                      </button>

                      {/* Nickel */}
                      <button
                        onClick={() => handleAddCoinToTray("Nickel", 5, "🪙")}
                        className="bg-[#e2e8f0] hover:bg-[#cbd5e1] border-3 border-black p-3.5 rounded-2xl shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 transition-all text-center flex flex-col items-center gap-1 cursor-pointer font-display"
                      >
                        <span className="text-2xl">🪙</span>
                        <span className="font-black text-slate-950 text-sm">Nickel</span>
                        <span className="bg-white border border-black px-2 py-0.5 rounded-full text-[11px] font-black">5¢</span>
                      </button>

                      {/* Dime */}
                      <button
                        onClick={() => handleAddCoinToTray("Dime", 10, "🪙")}
                        className="bg-[#bae6fd] hover:bg-[#7dd3fc] border-3 border-black p-3.5 rounded-2xl shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 transition-all text-center flex flex-col items-center gap-1 cursor-pointer font-display"
                      >
                        <span className="text-2xl">🪙</span>
                        <span className="font-black text-slate-950 text-sm">Dime</span>
                        <span className="bg-white border border-black px-2 py-0.5 rounded-full text-[11px] font-black">10¢</span>
                      </button>

                      {/* Quarter */}
                      <button
                        onClick={() => handleAddCoinToTray("Quarter", 25, "🪙")}
                        className="bg-[#fef08a] hover:bg-[#fde047] border-3 border-black p-3.5 rounded-2xl shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 transition-all text-center flex flex-col items-center gap-1 cursor-pointer font-display"
                      >
                        <span className="text-2xl">🪙</span>
                        <span className="font-black text-slate-950 text-sm">Quarter</span>
                        <span className="bg-white border border-black px-2 py-0.5 rounded-full text-[11px] font-black">25¢</span>
                      </button>
                    </div>
                  </div>

                  {/* Educational Tip Box */}
                  <div className="bg-slate-100 border-2 border-black rounded-2xl p-3.5 text-xs font-bold text-slate-700 shadow-[2px_2px_0px_0px_#000] flex items-center gap-2">
                    <span className="text-base">💡</span>
                    <span>
                      <strong>Quick Tip:</strong> 4 Quarters make 1 Dollar ($1.00). 10 Dimes make 1 Dollar! 2 Nickels make 1 Dime (10¢)!
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* BARTER CHAIN MODE */}
            {gameState.subMode === "barter" && (
              <div className="space-y-6">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-sm text-amber-800 leading-relaxed font-semibold">
                    <strong>Bartering Goal:</strong> Trade your farm's fresh <strong>Apples 🍎</strong> through villagers who want different items until you can get the <strong>Skateboard 🛹</strong>. This demonstrates why Cash is so much simpler than trading goods directly!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Active Items & Trade Station */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-500" /> Your Current Inventory
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {gameState.inventory?.map((item: string) => (
                          <span key={item} className="bg-slate-100 text-slate-800 border border-slate-200 text-sm font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
                            {item}
                          </span>
                        ))}
                      </div>

                      <h4 className="text-sm font-bold text-slate-700 mb-2">Available Trades</h4>
                      <div className="space-y-2.5">
                        {gameState.step === 1 && (
                          <div className="bg-slate-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center transition-all">
                            <div>
                              <p className="text-sm font-bold text-slate-700">Villager Albie</p>
                              <p className="text-xs text-slate-500 font-semibold">Wants: Apples 🍎 | Offers: Baseball Card ⚾</p>
                            </div>
                            <button
                              id="barter-trade-1"
                              onClick={() => handleBarterTrade("Apples 🍎", "Apples 🍎", "Albie", "Baseball Card ⚾")}
                              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg transition-all"
                            >
                              Trade
                            </button>
                          </div>
                        )}
                        {gameState.step === 2 && gameState.inventory?.includes("Baseball Card ⚾") && (
                          <div className="bg-slate-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center transition-all">
                            <div>
                              <p className="text-sm font-bold text-slate-700">Villager Beatrice</p>
                              <p className="text-xs text-slate-500 font-semibold">Wants: Baseball Card ⚾ | Offers: Guitar 🎸</p>
                            </div>
                            <button
                              id="barter-trade-2"
                              onClick={() => handleBarterTrade("Baseball Card ⚾", "Baseball Card ⚾", "Beatrice", "Guitar 🎸")}
                              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg transition-all"
                            >
                              Trade
                            </button>
                          </div>
                        )}
                        {gameState.step === 3 && gameState.inventory?.includes("Guitar 🎸") && (
                          <div className="bg-slate-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center transition-all">
                            <div>
                              <p className="text-sm font-bold text-slate-700">Villager Casey</p>
                              <p className="text-xs text-slate-500 font-semibold">Wants: Guitar 🎸 | Offers: Skateboard 🛹</p>
                            </div>
                            <button
                              id="barter-trade-3"
                              onClick={() => handleBarterTrade("Guitar 🎸", "Guitar 🎸", "Casey", "Skateboard 🛹")}
                              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg transition-all"
                            >
                              Trade
                            </button>
                          </div>
                        )}
                        {gameState.inventory?.includes("Skateboard 🛹") && (
                          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-sm font-bold text-center">
                            🎉 Whooo-ray! You got the Skateboard! You completed the barter chain.
                          </div>
                        )}
                      </div>
                    </div>

                    {gameState.inventory?.includes("Skateboard 🛹") && (
                      <button
                        id="m1-complete"
                        onClick={completeSimulation}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all mt-6 flex items-center justify-center gap-2"
                      >
                        Complete Lesson <Check className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Logs & Lessons */}
                  <div className="bg-slate-900 text-slate-200 rounded-xl p-5 font-mono text-xs flex flex-col justify-between shadow-inner h-[280px]">
                    <div className="space-y-2 overflow-y-auto">
                      <p className="text-amber-400 font-bold">--- TRANSACTION LOGS ---</p>
                      {gameState.logs?.map((log: string, idx: number) => (
                        <p key={idx} className="text-slate-300 border-l border-slate-700 pl-2">
                          {log}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 border-t border-slate-800 pt-3 italic font-semibold">
                      See how many steps that took? With Cash, you could buy the Skateboard instantly!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODULE 2: CAREER CHOICES & INCOME */}
        {module.id === "m2" && (
          <div className="space-y-6">
            {gameState.stage === "select" && (
              <div className="space-y-4">
                <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 font-bold text-lg shadow-sm">
                    💼
                  </div>
                  <div>
                    <h3 className="font-bold text-sky-950 text-sm sm:text-base font-display">Choose Your Career Pathway</h3>
                    <p className="text-xs sm:text-sm text-sky-800 font-medium">Select a job to experience real workday tasks and see how hourly wages & quality work bonuses impact your gross paycheck!</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Baker 🥐", wage: 20, desc: "Bakes warm treats, artisanal breads, and custom pastries." },
                    { name: "Eco Scientist 🧪", wage: 30, desc: "Analyzes ecosystems and protects the local environment." },
                    { name: "Veterinarian 🩺", wage: 35, desc: "Provides healthcare, vaccines & surgery for animals." },
                    { name: "Game Developer 💻", wage: 45, desc: "Codes gameplay systems, graphics, and server networking." }
                  ].map((job) => (
                    <button
                      key={job.name}
                      id={`job-${job.name.toLowerCase().split(' ')[0]}`}
                      onClick={() => selectJob(job.name, job.wage)}
                      className="bg-white border-2 border-slate-200 hover:border-sky-400 p-5 rounded-2xl shadow-sm text-left transition-all hover:shadow-md hover:-translate-y-0.5 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-1.5">
                          <h4 className="font-bold text-slate-900 text-base font-display group-hover:text-sky-600 transition-colors">{job.name}</h4>
                          <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full font-display">
                            ${job.wage}/hr
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{job.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-400 group-hover:text-sky-600">
                        <span>Base Shift Pay: ${(job.wage * 8)}</span>
                        <span className="flex items-center gap-1 font-display uppercase tracking-wider text-[11px]">
                          Start Shift <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {gameState.stage === "work" && (() => {
              const jobKey = gameState.selectedJob?.name || "Baker 🥐";
              const tasks = CAREER_TASKS[jobKey] || CAREER_TASKS["Baker 🥐"];
              const currentTask = tasks[gameState.taskIndex] || tasks[0];
              const baseEarnings = gameState.selectedJob?.wage * 8;
              const currentEarnings = baseEarnings + (gameState.totalBonus || 0);

              return (
                <div className="space-y-5 max-w-xl mx-auto">
                  {/* Job Header Bar */}
                  <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xl font-display">
                        {gameState.selectedJob?.name.split(" ").slice(-1)[0]}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-base font-display">{gameState.selectedJob?.name}</h3>
                        <p className="text-xs text-sky-600 font-bold font-display uppercase tracking-wide">
                          ${gameState.selectedJob?.wage}/hr Base Rate (8 Hour Shift)
                        </p>
                      </div>
                    </div>

                    <div className="text-right bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block font-display">Live Paycheck Meter</span>
                      <span className="text-base font-black text-emerald-700 font-display">${currentEarnings} Gross</span>
                    </div>
                  </div>

                  {/* Shift Progress Timeline */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 font-display uppercase tracking-wider">
                      <span>Shift Timeline</span>
                      <span className="text-sky-600">Task {gameState.taskIndex + 1} of {tasks.length}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                      <div
                        className="bg-sky-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${((gameState.taskIndex + (gameState.selectedOption !== null ? 1 : 0)) / tasks.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Task Card */}
                  <div className="bg-white rounded-2xl border-2 border-sky-100 p-6 shadow-md space-y-5 text-left relative overflow-hidden">
                    <div className="flex justify-between items-center border-b border-sky-100 pb-3">
                      <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase font-display">
                        ⏰ {currentTask.time}
                      </span>
                      <span className="text-xs font-bold text-slate-400">Workplace Scenario</span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-lg font-black text-slate-900 font-display">{currentTask.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {currentTask.scenario}
                      </p>
                    </div>

                    {/* Options or Feedback */}
                    {gameState.selectedOption === null ? (
                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-bold text-sky-900 uppercase tracking-wider font-display">How will you handle this situation?</p>
                        {currentTask.options.map((opt, idx) => (
                          <button
                            key={idx}
                            id={`task-option-${idx}`}
                            onClick={() => handleTaskChoice(opt.bonus, opt.feedback, idx)}
                            className="w-full bg-sky-50/60 hover:bg-sky-100/80 border-2 border-sky-200/80 hover:border-sky-400 p-4 rounded-xl text-left transition-all hover:scale-[1.01] active:scale-[0.99] space-y-1 group"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-sky-200 text-sky-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 font-display group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                {idx === 0 ? "A" : "B"}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-sky-950">
                                {opt.label}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4 pt-2">
                        <div className={`p-4 rounded-xl border-2 space-y-2 ${
                          currentTask.options[gameState.selectedOption].bonus > 0 
                            ? "bg-emerald-50/80 border-emerald-300 text-emerald-950" 
                            : "bg-amber-50/80 border-amber-300 text-amber-950"
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-black text-xs uppercase tracking-wider font-display flex items-center gap-1.5">
                              {currentTask.options[gameState.selectedOption].bonus > 0 ? "✨ Performance Bonus Earned!" : "⚠️ Standard Outcome"}
                            </span>
                            {currentTask.options[gameState.selectedOption].bonus > 0 && (
                              <span className="font-black text-sm bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full font-display">
                                +${currentTask.options[gameState.selectedOption].bonus} Bonus Tip
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-medium leading-relaxed">
                            {gameState.taskFeedback}
                          </p>
                        </div>

                        <button
                          id="next-task-btn"
                          onClick={handleNextTask}
                          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-3.5 px-4 rounded-xl transition-all shadow-md active:translate-y-0.5 text-xs sm:text-sm uppercase tracking-wider font-display flex items-center justify-center gap-2"
                        >
                          {gameState.taskIndex < tasks.length - 1 ? "Continue Work Shift ➡️" : "Finish Shift & Review Paystub 🧾"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {gameState.stage === "paystub" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-md max-w-md mx-auto space-y-4 text-left">
                  <div className="border-b border-dashed border-slate-200 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-black text-slate-900 text-base font-display">VIRTUAL PAYSTUB</h3>
                      <p className="text-xs text-slate-500 font-semibold font-display">Employee: Future Wealth Builder</p>
                    </div>
                    <span className="text-2xl">🧾</span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between font-semibold text-slate-600">
                      <span>Job Role</span>
                      <span className="font-black text-slate-900 font-display">{gameState.selectedJob?.name}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-600">
                      <span>Hours Worked</span>
                      <span className="font-bold text-slate-800">8.0 hrs @ ${gameState.selectedJob?.wage}/hr</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-600">
                      <span>Base Shift Earnings</span>
                      <span className="font-bold text-slate-800">${gameState.baseEarnings}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span>Quality & Performance Bonuses</span>
                      <span>+${gameState.totalBonus}</span>
                    </div>
                    <div className="h-[1px] bg-slate-200" />
                    <div className="flex justify-between font-black text-slate-900 text-sm sm:text-base">
                      <span>Gross Pay (Total Earnings)</span>
                      <span>${gameState.grossPay}</span>
                    </div>
                    <div className="flex justify-between font-bold text-red-600 bg-red-50 px-2.5 py-1.5 rounded-lg">
                      <span>Mandatory Deduction: Taxes (20%)</span>
                      <span>-${gameState.taxDeducted}</span>
                    </div>
                    <div className="h-[2px] bg-slate-200" />
                    <div className="flex justify-between font-black text-base sm:text-lg text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-3 py-2 rounded-xl">
                      <span>Net Pay (Take-Home Cash)</span>
                      <span>${gameState.netPay}</span>
                    </div>
                  </div>

                  <div className="bg-sky-50 border border-sky-100 p-3.5 rounded-xl text-xs sm:text-sm text-sky-900 leading-relaxed font-medium space-y-1.5">
                    <p className="font-bold text-sky-950 flex items-center gap-1.5 font-display text-sm">
                      💡 Key Takeaway:
                    </p>
                    <p>
                      Making thoughtful, high-quality decisions on the job earned you <strong>+${gameState.totalBonus} in performance bonuses</strong>!
                    </p>
                    <p className="text-slate-600 text-xs">
                      Note that 20% of your gross earnings goes to taxes, which fund public schools, parks, emergency services, and community roads!
                    </p>
                  </div>
                </div>

                <button
                  id="m2-complete"
                  onClick={completeSimulation}
                  className="w-full max-w-xs mx-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-display uppercase tracking-wider text-xs sm:text-sm"
                >
                  Complete Lesson <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODULE 3: NEEDS VS WANTS & 6-MONTH BUDGET SIMULATION */}
        {module.id === "m3" && (() => {
          const activeTab = gameState.activeTab || "sorter";

          const currentMonthIdx = typeof gameState.monthIndex === "number" ? gameState.monthIndex : 0;
          const currentMonthData = SIMULATION_MONTHS[currentMonthIdx] || SIMULATION_MONTHS[0];

          const isNeedSelected = typeof gameState.selectedNeed === "number";
          const isWantSelected = typeof gameState.selectedWant === "number";
          const isSideSelected = !currentMonthData.sideEvent || typeof gameState.selectedSide === "number";
          const isMonthComplete = isNeedSelected && isWantSelected && isSideSelected;

          const fixedNeedsSum = currentMonthData.fixedNeeds.reduce((acc, curr) => acc + curr.amount, 0);
          const varNeedCost = isNeedSelected && currentMonthData.variableNeedOptions.options[gameState.selectedNeed]
            ? currentMonthData.variableNeedOptions.options[gameState.selectedNeed].cost
            : 0;
          const totalMonthNeeds = fixedNeedsSum + varNeedCost;

          const wantCost = isWantSelected && currentMonthData.wantOptions.options[gameState.selectedWant]
            ? currentMonthData.wantOptions.options[gameState.selectedWant].cost
            : 0;

          let sideAmount = 0;
          if (currentMonthData.sideEvent && typeof gameState.selectedSide === "number" && currentMonthData.sideEvent.options[gameState.selectedSide]) {
            sideAmount = currentMonthData.sideEvent.options[gameState.selectedSide].amount;
          }

          const monthIncomeTotal = currentMonthData.income + (sideAmount > 0 ? sideAmount : 0);
          const monthExtraExpense = sideAmount < 0 ? Math.abs(sideAmount) : 0;
          const monthNetCash = monthIncomeTotal - (totalMonthNeeds + wantCost + monthExtraExpense);

          return (
            <div className="space-y-6 text-left">
              {/* TOP MODE TABS SELECTOR */}
              <div className="bg-white rounded-2xl border-2 border-sky-100 p-2 shadow-sm flex flex-wrap gap-2">
                {[
                  { id: "sorter", label: "🍕 1. Needs vs Wants Sorter" },
                  { id: "allocator", label: "📊 2. 50/30/20 Rule Allocator" },
                  { id: "simulation", label: "🗓️ 3. 6-Month Real Simulation" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setGameState((prev: any) => ({ ...prev, activeTab: tab.id }))}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black font-display transition-all ${
                      activeTab === tab.id
                        ? "bg-sky-500 text-white shadow-md scale-[1.02]"
                        : "bg-slate-50 hover:bg-sky-50 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: NEEDS VS WANTS ITEM SORTER */}
              {activeTab === "sorter" && (() => {
                const sIdx = typeof gameState.sorterIndex === "number" ? gameState.sorterIndex : 0;
                const item = NEEDS_WANTS_ITEMS[sIdx] || NEEDS_WANTS_ITEMS[0];
                const isCompleted = gameState.sorterCompleted || sIdx >= NEEDS_WANTS_ITEMS.length;

                if (isCompleted) {
                  return (
                    <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 sm:p-8 shadow-md text-center max-w-lg mx-auto space-y-5">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                        🏆
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-black text-slate-900 text-2xl font-display">Sorting Master!</h3>
                        <p className="text-sm text-slate-600 font-medium">
                          You scored <span className="font-black text-emerald-600">{gameState.sorterScore || 0} out of {NEEDS_WANTS_ITEMS.length}</span> correct!
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-medium leading-relaxed">
                        🌟 Key Takeaway: <strong>Needs</strong> are necessities for survival & health ( shelter, water, groceries, utilities ). <strong>Wants</strong> are fun desires ( games, concerts, designer gear ).
                      </p>
                      <button
                        onClick={() => setGameState((prev: any) => ({ ...prev, activeTab: "allocator" }))}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl shadow-md transition-all font-display uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 border-emerald-700 active:translate-y-0.5"
                      >
                        Next Activity: Try 50/30/20 Budget Allocator 📊 ➡️
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-md space-y-6 max-w-xl mx-auto">
                    {/* Header Score bar */}
                    <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-sky-600 font-display">
                          Item {sIdx + 1} of {NEEDS_WANTS_ITEMS.length}
                        </span>
                        <h3 className="font-black text-slate-900 text-lg font-display">Categorize This Item!</h3>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl">
                        <span className="text-xs font-black text-emerald-700 font-display">Score: {gameState.sorterScore || 0} pts</span>
                      </div>
                    </div>

                    {/* Active Item Card */}
                    <div className="bg-sky-50/60 border-2 border-sky-200 p-6 rounded-3xl text-center space-y-3">
                      <span className="text-6xl block animate-bounce">{item.icon}</span>
                      <h4 className="font-black text-slate-900 text-xl font-display">{item.name}</h4>
                      <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                        Is this item an essential <strong>Need</strong> or a non-essential <strong>Want</strong>?
                      </p>
                    </div>

                    {/* Sorter Buttons */}
                    {!gameState.sorterFeedback ? (
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleClassifySorterItem("need")}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-3 rounded-2xl shadow-md transition-all font-display text-sm sm:text-base border-b-4 border-emerald-700 active:translate-y-0.5 flex flex-col items-center gap-1"
                        >
                          <span className="text-xl">🥦</span>
                          <span>NEED (Essential)</span>
                        </button>
                        <button
                          onClick={() => handleClassifySorterItem("want")}
                          className="bg-pink-500 hover:bg-pink-600 text-white font-black py-4 px-3 rounded-2xl shadow-md transition-all font-display text-sm sm:text-base border-b-4 border-pink-700 active:translate-y-0.5 flex flex-col items-center gap-1"
                        >
                          <span className="text-xl">🎮</span>
                          <span>WANT (Luxury)</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-semibold space-y-1 ${
                          gameState.sorterFeedback.isCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-amber-50 border-amber-300 text-amber-950"
                        }`}>
                          <p className="font-bold flex items-center gap-1.5 font-display text-sm">
                            {gameState.sorterFeedback.isCorrect ? "✅ " : "💡 "}{gameState.sorterFeedback.text}
                          </p>
                        </div>

                        <button
                          onClick={handleNextSorterItem}
                          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-xl shadow-md transition-all font-display uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 border-sky-700 active:translate-y-0.5"
                        >
                          {sIdx + 1 < NEEDS_WANTS_ITEMS.length ? "Next Item ➡️" : "View Final Score 🏆 ➡️"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* TAB 2: 50/30/20 BUDGET ALLOCATOR */}
              {activeTab === "allocator" && (() => {
                const income = 1000;
                const needsPct = gameState.needsPercent || 50;
                const wantsPct = gameState.wantsPercent || 30;
                const savingsPct = gameState.savingsPercent || 20;

                const needsDollar = (income * needsPct) / 100;
                const wantsDollar = (income * wantsPct) / 100;
                const savingsDollar = (income * savingsPct) / 100;

                return (
                  <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-md space-y-6 max-w-xl mx-auto">
                    <div className="border-b border-sky-100 pb-4 space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-sky-600 font-display">The Golden 50/30/20 Rule</span>
                      <h3 className="font-black text-slate-900 text-xl font-display">Monthly Budget Allocator ($1,000 Income)</h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Divide your monthly income into three key buckets: Needs, Wants, and Savings!
                      </p>
                    </div>

                    {/* Allocation Sliders or Preset Buttons */}
                    <div className="space-y-4">
                      {/* Needs Bucket */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                          <span className="text-slate-800 flex items-center gap-1 font-display">🥦 Needs (Fixed Bills & Essentials): {needsPct}%</span>
                          <span className="text-rose-600 font-black font-display">${needsDollar}/mo</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="70"
                          step="5"
                          value={needsPct}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            const rem = 100 - val;
                            setGameState((prev: any) => ({
                              ...prev,
                              needsPercent: val,
                              wantsPercent: Math.round(rem * 0.6),
                              savingsPercent: Math.round(rem * 0.4)
                            }));
                          }}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      {/* Wants Bucket */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                          <span className="text-slate-800 flex items-center gap-1 font-display">🎮 Wants (Entertainment & Fun): {wantsPct}%</span>
                          <span className="text-pink-600 font-black font-display">${wantsDollar}/mo</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          step="5"
                          value={wantsPct}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            const rem = 100 - needsPct - val;
                            setGameState((prev: any) => ({
                              ...prev,
                              wantsPercent: val,
                              savingsPercent: Math.max(0, rem)
                            }));
                          }}
                          className="w-full accent-pink-500 cursor-pointer"
                        />
                      </div>

                      {/* Savings Bucket */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                          <span className="text-slate-800 flex items-center gap-1 font-display">🐷 Savings (Emergency Fund): {savingsPct}%</span>
                          <span className="text-emerald-600 font-black font-display">${savingsDollar}/mo</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          step="5"
                          value={savingsPct}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            const rem = 100 - needsPct - val;
                            setGameState((prev: any) => ({
                              ...prev,
                              savingsPercent: val,
                              wantsPercent: Math.max(0, rem)
                            }));
                          }}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Presets */}
                    <div className="space-y-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider font-display">Budget Strategy Presets:</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setGameState((prev: any) => ({ ...prev, needsPercent: 50, wantsPercent: 30, savingsPercent: 20 }))}
                          className="py-2 px-1 text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200 rounded-xl hover:bg-sky-100 font-display"
                        >
                          ⚖️ Balanced 50/30/20
                        </button>
                        <button
                          onClick={() => setGameState((prev: any) => ({ ...prev, needsPercent: 45, wantsPercent: 15, savingsPercent: 40 }))}
                          className="py-2 px-1 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl hover:bg-emerald-100 font-display"
                        >
                          🚀 Wealth Builder 45/15/40
                        </button>
                        <button
                          onClick={() => setGameState((prev: any) => ({ ...prev, needsPercent: 50, wantsPercent: 45, savingsPercent: 5 }))}
                          className="py-2 px-1 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-100 font-display"
                        >
                          ⚠️ Risky Fun 50/45/5
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setGameState((prev: any) => ({ ...prev, activeTab: "simulation" }))}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-xl shadow-md transition-all font-display uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 border-sky-700 active:translate-y-0.5"
                    >
                      Test Budget in 6-Month Real World Simulation 🗓️ ➡️
                    </button>
                  </div>
                );
              })()}

              {/* TAB 3: 6-MONTH REAL WORLD SIMULATION */}
              {activeTab === "simulation" && (
                <div className="space-y-6">
                  {/* Header Month Tracker */}
                  <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{currentMonthData.seasonIcon}</span>
                        <div>
                          <h3 className="font-black text-slate-900 text-base sm:text-lg font-display">
                            Month {currentMonthIdx + 1}: {currentMonthData.monthName}
                          </h3>
                          <p className="text-xs font-bold text-sky-600 font-display">
                            {currentMonthData.motto}
                          </p>
                        </div>
                      </div>

                      {/* Bank Accounts Bar */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                          <span className="text-base">💳</span>
                          <div>
                            <span className="block text-[10px] font-black uppercase text-sky-600 tracking-wider">Checking</span>
                            <span className="font-black text-sky-950 text-xs sm:text-sm font-display">+${monthIncomeTotal}</span>
                          </div>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                          <span className="text-base">🐷</span>
                          <div>
                            <span className="block text-[10px] font-black uppercase text-emerald-600 tracking-wider">Savings</span>
                            <span className="font-black text-emerald-950 text-xs sm:text-sm font-display">${gameState.savings || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Month Progress Pills */}
                    <div className="grid grid-cols-6 gap-1 sm:gap-2 pt-1 border-t border-slate-100">
                      {SIMULATION_MONTHS.map((m, idx) => (
                        <div
                          key={idx}
                          className={`py-1.5 rounded-xl text-center text-[10px] sm:text-xs font-black font-display transition-all border ${
                            idx === currentMonthIdx
                              ? "bg-sky-500 text-white border-sky-600 shadow-sm scale-105"
                              : idx < currentMonthIdx
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : "bg-slate-100 text-slate-400 border-slate-200 opacity-60"
                          }`}
                        >
                          <span className="hidden sm:inline">{m.monthName}</span>
                          <span className="sm:hidden">{m.monthName.substring(0, 3)}</span>
                          {idx < currentMonthIdx && " ✓"}
                        </div>
                      ))}
                    </div>
                  </div>

                  {gameState.stage === "monthly_play" && (
                    <div className="space-y-6">
                      {/* Step 1: Fixed Bills & Needs */}
                      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-black text-xs flex items-center justify-center font-display">1</span>
                            <h4 className="font-black text-slate-900 text-sm sm:text-base font-display">Fixed Bills & Needs (Due First)</h4>
                          </div>
                          <span className="text-xs font-black bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 font-display">
                            Total Fixed: -${fixedNeedsSum}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {currentMonthData.fixedNeeds.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex justify-between items-center font-semibold text-slate-700">
                              <span>{item.name}</span>
                              <span className="font-bold text-rose-600">-${item.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Side Event or Surprise */}
                      {currentMonthData.sideEvent && (
                        <div className="bg-amber-50/80 rounded-2xl border-2 border-amber-300 p-5 shadow-sm space-y-3">
                          <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                            <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center font-display">⚡</span>
                            <h4 className="font-black text-amber-950 text-sm sm:text-base font-display">{currentMonthData.sideEvent.title}</h4>
                          </div>
                          <p className="text-xs sm:text-sm text-amber-900 font-medium">
                            {currentMonthData.sideEvent.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {currentMonthData.sideEvent.options.map((opt, idx) => {
                              const isSelected = gameState.selectedSide === idx;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleSelectSimulationOption("side", idx)}
                                  className={`p-3.5 rounded-xl border-2 text-left transition-all space-y-1 ${
                                    isSelected
                                      ? "bg-amber-500 text-white border-amber-600 shadow-sm scale-[1.01]"
                                      : "bg-white hover:bg-amber-100/50 border-amber-200 text-slate-800"
                                  }`}
                                >
                                  <div className="flex justify-between items-start gap-2">
                                    <span className={`font-bold text-xs sm:text-sm ${isSelected ? "text-white" : "text-slate-900"}`}>
                                      {opt.label}
                                    </span>
                                    <span className={`font-black text-xs px-2 py-0.5 rounded-full font-display shrink-0 ${
                                      opt.amount > 0
                                        ? isSelected ? "bg-emerald-300 text-emerald-950" : "bg-emerald-100 text-emerald-800"
                                        : opt.amount < 0
                                        ? isSelected ? "bg-rose-300 text-rose-950" : "bg-rose-100 text-rose-800"
                                        : isSelected ? "bg-amber-400 text-amber-950" : "bg-slate-100 text-slate-600"
                                    }`}>
                                      {opt.amount > 0 ? `+$${opt.amount}` : opt.amount < 0 ? `-$${Math.abs(opt.amount)}` : "$0"}
                                    </span>
                                  </div>
                                  {isSelected && (
                                    <p className="text-xs text-amber-100 font-medium pt-1 border-t border-amber-400/50">
                                      {opt.feedback}
                                    </p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Variable Need Choice */}
                      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <span className="w-7 h-7 rounded-lg bg-sky-500 text-white font-black text-xs flex items-center justify-center font-display">2</span>
                          <div>
                            <h4 className="font-black text-slate-900 text-sm sm:text-base font-display">
                              {currentMonthData.variableNeedOptions.title} (Essential Need)
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">
                              {currentMonthData.variableNeedOptions.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {currentMonthData.variableNeedOptions.options.map((opt, idx) => {
                            const isSelected = gameState.selectedNeed === idx;
                            return (
                              <button
                                key={idx}
                                onClick={() => handleSelectSimulationOption("need", idx)}
                                className={`p-3.5 rounded-xl border-2 text-left transition-all space-y-1 ${
                                  isSelected
                                    ? "bg-sky-500 text-white border-sky-600 shadow-sm scale-[1.01]"
                                    : "bg-slate-50 hover:bg-sky-50 border-slate-200 text-slate-800"
                                }`}
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <span className={`font-bold text-xs sm:text-sm ${isSelected ? "text-white" : "text-slate-900"}`}>
                                    {opt.label}
                                  </span>
                                  <span className={`font-black text-xs px-2.5 py-0.5 rounded-full font-display shrink-0 ${
                                    isSelected ? "bg-sky-200 text-sky-950" : "bg-rose-100 text-rose-800"
                                  }`}>
                                    -${opt.cost}
                                  </span>
                                </div>
                                {isSelected && (
                                  <p className="text-xs text-sky-100 font-medium pt-1 border-t border-sky-400/50">
                                    {opt.feedback}
                                  </p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 4: Want Choice */}
                      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <span className="w-7 h-7 rounded-lg bg-pink-500 text-white font-black text-xs flex items-center justify-center font-display">3</span>
                          <div>
                            <h4 className="font-black text-slate-900 text-sm sm:text-base font-display">
                              {currentMonthData.wantOptions.title} (Non-Essential Want)
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">
                              {currentMonthData.wantOptions.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {currentMonthData.wantOptions.options.map((opt, idx) => {
                            const isSelected = gameState.selectedWant === idx;
                            return (
                              <button
                                key={idx}
                                onClick={() => handleSelectSimulationOption("want", idx)}
                                className={`p-3.5 rounded-xl border-2 text-left transition-all space-y-1 ${
                                  isSelected
                                    ? "bg-pink-500 text-white border-pink-600 shadow-sm scale-[1.01]"
                                    : "bg-slate-50 hover:bg-pink-50 border-slate-200 text-slate-800"
                                }`}
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <span className={`font-bold text-xs sm:text-sm ${isSelected ? "text-white" : "text-slate-900"}`}>
                                    {opt.label}
                                  </span>
                                  <span className={`font-black text-xs px-2.5 py-0.5 rounded-full font-display shrink-0 ${
                                    isSelected ? "bg-pink-200 text-pink-950" : "bg-pink-100 text-pink-800"
                                  }`}>
                                    -${opt.cost}
                                  </span>
                                </div>
                                {isSelected && (
                                  <p className="text-xs text-pink-100 font-medium pt-1 border-t border-pink-400/50">
                                    {opt.feedback}
                                  </p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Monthly Net Cash Flow Box */}
                      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
                            Month End Budget Calculator ({currentMonthData.monthName})
                          </span>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full">
                            Income: +${monthIncomeTotal}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="bg-slate-800 p-3 rounded-xl space-y-0.5">
                            <span className="text-slate-400 font-semibold block text-[10px]">Income Earned</span>
                            <span className="font-black text-emerald-400 text-sm font-display">+${monthIncomeTotal}</span>
                          </div>
                          <div className="bg-slate-800 p-3 rounded-xl space-y-0.5">
                            <span className="text-slate-400 font-semibold block text-[10px]">Needs (Bills/Groceries)</span>
                            <span className="font-black text-rose-400 text-sm font-display">-${totalMonthNeeds}</span>
                          </div>
                          <div className="bg-slate-800 p-3 rounded-xl space-y-0.5">
                            <span className="text-slate-400 font-semibold block text-[10px]">Wants (Fun/Outings)</span>
                            <span className="font-black text-pink-400 text-sm font-display">-${wantCost}</span>
                          </div>
                          <div className="bg-slate-800 p-3 rounded-xl space-y-0.5 border border-emerald-500/40">
                            <span className="text-slate-300 font-bold block text-[10px]">Leftover Surplus</span>
                            <span className="font-black text-emerald-300 text-sm font-display">+${monthNetCash}</span>
                          </div>
                        </div>

                        <button
                          disabled={!isMonthComplete}
                          onClick={handleCompleteSimulationMonth}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-black py-4 rounded-xl shadow-lg transition-all font-display uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 border-emerald-700 active:translate-y-0.5"
                        >
                          {isMonthComplete ? (
                            <>Complete {currentMonthData.monthName} & Transfer +${monthNetCash} to Savings 🐷 ➡️</>
                          ) : (
                            <>Make your selections above to finish {currentMonthData.monthName}!</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Month Summary Stage */}
                  {gameState.stage === "month_summary" && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-md max-w-lg mx-auto space-y-5 text-left">
                        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                          <div>
                            <h3 className="font-black text-slate-900 text-lg font-display flex items-center gap-2">
                              <span>{currentMonthData.seasonIcon}</span> {currentMonthData.monthName} Budget Completed!
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">Surplus cash successfully swept to savings!</p>
                          </div>
                          <span className="text-3xl">🧾</span>
                        </div>

                        <div className="space-y-2.5 text-xs sm:text-sm">
                          <div className="flex justify-between font-semibold text-slate-600">
                            <span>Monthly Income Received</span>
                            <span className="font-bold text-slate-900">${currentMonthData.income}</span>
                          </div>
                          {typeof gameState.selectedSide === "number" && currentMonthData.sideEvent && currentMonthData.sideEvent.options[gameState.selectedSide] && (
                            <div className={`flex justify-between font-bold px-2.5 py-1 rounded-lg ${
                              currentMonthData.sideEvent.options[gameState.selectedSide].amount >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                            }`}>
                              <span>{currentMonthData.sideEvent.options[gameState.selectedSide].label}</span>
                              <span>
                                {currentMonthData.sideEvent.options[gameState.selectedSide].amount >= 0
                                  ? `+$${currentMonthData.sideEvent.options[gameState.selectedSide].amount}`
                                  : `-$${Math.abs(currentMonthData.sideEvent.options[gameState.selectedSide].amount)}`
                                }
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between font-semibold text-slate-600">
                            <span>Total Needs Paid (Fixed Bills & Groceries)</span>
                            <span className="font-bold text-rose-600">
                              -${currentMonthData.fixedNeeds.reduce((a, b) => a + b.amount, 0) + (typeof gameState.selectedNeed === "number" && currentMonthData.variableNeedOptions.options[gameState.selectedNeed] ? currentMonthData.variableNeedOptions.options[gameState.selectedNeed].cost : 0)}
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold text-slate-600">
                            <span>Total Wants Paid (Entertainment / Outings)</span>
                            <span className="font-bold text-pink-600">
                              -${typeof gameState.selectedWant === "number" && currentMonthData.wantOptions.options[gameState.selectedWant] ? currentMonthData.wantOptions.options[gameState.selectedWant].cost : 0}
                            </span>
                          </div>
                          <div className="h-[1px] bg-slate-200" />
                          <div className="flex justify-between font-black text-slate-900 text-sm">
                            <span>Month Cash Surplus Swept to Savings</span>
                            <span className="text-emerald-600">+${gameState.lastMonthNet || 0}</span>
                          </div>
                          {(gameState.lastInterestEarned || 0) > 0 && (
                            <div className="flex justify-between font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-lg">
                              <span>🐷 Bank Interest Earned on Savings (0.5%)</span>
                              <span>+${gameState.lastInterestEarned}</span>
                            </div>
                          )}
                          <div className="h-[2px] bg-slate-200" />
                          <div className="flex justify-between font-black text-base sm:text-lg text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-3 py-2 rounded-xl">
                            <span>Total Savings Account Balance</span>
                            <span>${gameState.savings || 0}</span>
                          </div>
                        </div>

                        <button
                          onClick={handleNextSimulationMonth}
                          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-xl shadow-md transition-all font-display uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 border-sky-700 active:translate-y-0.5"
                        >
                          {currentMonthIdx < SIMULATION_MONTHS.length - 1 ? (
                            <>Proceed to {SIMULATION_MONTHS[currentMonthIdx + 1].monthName} ➡️</>
                          ) : (
                            <>View 6-Month Financial Report Card 📜 ➡️</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Final 6-Month Summary Report Card */}
                  {gameState.stage === "final_summary" && (() => {
                    const badge = (gameState.savings || 0) >= 1800
                      ? { title: "Master Wealth Builder 🏆", bg: "bg-amber-100 text-amber-900 border-amber-300", desc: "Outstanding financial discipline! You prioritized savings, optimized needs, and built a massive emergency shield!" }
                      : (gameState.savings || 0) >= 1200
                      ? { title: "Balanced Budgeter ⚖️", bg: "bg-emerald-100 text-emerald-900 border-emerald-300", desc: "Great job! You achieved a healthy balance between enjoying wants and growing your savings." }
                      : { title: "Smart Learner 🎓", bg: "bg-sky-100 text-sky-900 border-sky-300", desc: "Good effort completing all 6 months! Try running the simulation again to see if you can cut unnecessary wants and grow your savings even higher." };

                    return (
                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-md max-w-xl mx-auto space-y-6 text-left">
                          <div className="text-center border-b border-slate-100 pb-4 space-y-1">
                            <span className="text-4xl">📜</span>
                            <h3 className="font-black text-slate-900 text-xl font-display">6-MONTH FINANCIAL REPORT CARD</h3>
                            <p className="text-xs text-slate-500 font-semibold font-display">January through June Simulation Complete</p>
                          </div>

                          {/* Badge Card */}
                          <div className={`p-4 rounded-2xl border-2 text-center space-y-1.5 ${badge.bg}`}>
                            <span className="text-[10px] font-black uppercase tracking-wider font-display">Financial Persona Awarded</span>
                            <h4 className="font-black text-lg font-display">{badge.title}</h4>
                            <p className="text-xs font-medium leading-relaxed">{badge.desc}</p>
                          </div>

                          {/* Financial Metrics Grid */}
                          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-semibold">
                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                              <span className="text-slate-500 text-[10px] font-bold block uppercase font-display">Total 6-Month Income</span>
                              <span className="text-emerald-600 font-black text-lg font-display">${gameState.totalIncome || 0}</span>
                            </div>
                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                              <span className="text-slate-500 text-[10px] font-bold block uppercase font-display">Total Spent on Needs</span>
                              <span className="text-rose-600 font-black text-lg font-display">${gameState.totalNeeds || 0}</span>
                            </div>
                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                              <span className="text-slate-500 text-[10px] font-bold block uppercase font-display">Total Spent on Wants</span>
                              <span className="text-pink-600 font-black text-lg font-display">${gameState.totalWants || 0}</span>
                            </div>
                            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-300">
                              <span className="text-emerald-800 text-[10px] font-black block uppercase font-display">Total Emergency Savings</span>
                              <span className="text-emerald-700 font-black text-xl font-display">${gameState.savings || 0}</span>
                            </div>
                          </div>

                          {/* Monthly Timeline Log */}
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <h4 className="text-xs font-black text-slate-400 font-display uppercase tracking-wider">6-Month Savings Progress Log</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                              {gameState.monthHistory?.map((h: any, idx: number) => (
                                <div key={idx} className="bg-slate-50 border border-slate-200 p-2 rounded-xl">
                                  <span className="block text-[10px] font-bold text-slate-400 font-display">{h.monthName}</span>
                                  <span className="font-black text-emerald-600 text-xs font-display">+${h.netSurplus}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button
                            id="m3-complete"
                            onClick={completeSimulation}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 font-display uppercase tracking-wider text-xs sm:text-sm border-b-4 border-emerald-700 active:translate-y-0.5"
                          >
                            Complete Lesson & Claim Rewards <Check className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })()}

        {/* MODULE 4: SAVINGS & COMPOUND INTEREST */}
        {module.id === "m4" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sliders */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
                <h3 className="font-bold text-slate-800 text-sm">Savings Garden Controls</h3>
                
                {/* Monthly Add */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Monthly Contribution</span>
                    <span className="text-emerald-600">${gameState.monthlySavings}/mo</span>
                  </div>
                  <input
                    id="slider-savings"
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={gameState.monthlySavings || 50}
                    onChange={(e) => setGameState((prev: any) => ({ ...prev, monthlySavings: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Annual Interest Rate</span>
                    <span className="text-amber-600">{gameState.rate}% APR</span>
                  </div>
                  <input
                    id="slider-rate"
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={gameState.rate || 6}
                    onChange={(e) => setGameState((prev: any) => ({ ...prev, rate: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Age (Timeline Scrubber) */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Scrub Age (Timeline)</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-bold">Age {gameState.age}</span>
                  </div>
                  <input
                    id="slider-age"
                    type="range"
                    min="12"
                    max="50"
                    step="1"
                    value={gameState.age || 12}
                    onChange={(e) => setGameState((prev: any) => ({ ...prev, age: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>Start (12)</span>
                    <span>Adult (30)</span>
                    <span>Grown-up (50)</span>
                  </div>
                </div>
              </div>

              {/* Visual Compound Interest Money Tree */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col items-center justify-between min-h-[250px]">
                <h4 className="text-xs font-bold text-slate-400 uppercase self-start">The Growing Money Tree</h4>
                
                {/* SVG Visual Garden */}
                <div className="relative w-full h-40 flex items-end justify-center overflow-hidden">
                  {/* Sky/Ground details */}
                  <div className="absolute inset-x-0 bottom-0 h-4 bg-emerald-700/20 rounded-full blur-sm" />
                  
                  {/* The actual tree dynamically sizing */}
                  <svg className="w-full h-full max-w-[150px]" viewBox="0 0 100 100" preserveAspectRatio="xMidYEnd meet">
                    {/* Dirt block */}
                    <path d="M 10 95 C 30 90, 70 90, 90 95 L 90 100 L 10 100 Z" fill="#8B4513" opacity="0.3" />
                    {/* Trunk sizing up based on Age and Portfolio */}
                    <rect 
                      x={50 - Math.min(10, 2 + (gameState.age - 12) * 0.2)} 
                      y={95 - (gameState.age - 12) * 1.5} 
                      width={Math.min(20, 4 + (gameState.age - 12) * 0.4)} 
                      height={(gameState.age - 12) * 1.5} 
                      fill="#5C4033" 
                      rx="2"
                    />
                    {/* Leaves sizing based on Portfolio */}
                    {gameState.age > 13 && (
                      <circle 
                        cx="50" 
                        cy={95 - (gameState.age - 12) * 1.5} 
                        r={Math.min(30, 8 + (gameState.age - 12) * 0.7)} 
                        fill="#2E7D32" 
                        opacity="0.85" 
                      />
                    )}
                    {/* Coin fruits sizing/sprouting based on Interest ratio */}
                    {gameState.totalInterest > 50 && (
                      <>
                        <circle cx="45" cy={95 - (gameState.age - 12) * 1.6} r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                        <circle cx="55" cy={95 - (gameState.age - 12) * 1.4} r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                        {gameState.totalInterest > 500 && (
                          <>
                            <circle cx="35" cy={95 - (gameState.age - 12) * 1.3} r="3.5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                            <circle cx="65" cy={95 - (gameState.age - 12) * 1.5} r="3.5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                            <circle cx="50" cy={95 - (gameState.age - 12) * 1.9} r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                          </>
                        )}
                      </>
                    )}
                  </svg>

                  {/* Sparkle effects on giant portfolio */}
                  {gameState.totalInterest > 2000 && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute text-yellow-400 text-xl top-8 right-12 select-none">✨</motion.div>
                  )}
                </div>

                {/* Numeric Results */}
                <div className="w-full grid grid-cols-2 gap-2 text-center text-xs mt-3">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold">YOUR CONTRIBUTIONS</p>
                    <p className="font-bold text-slate-700">${gameState.totalSaved}</p>
                  </div>
                  <div className="bg-yellow-50/50 p-2 rounded-lg border border-yellow-100">
                    <p className="text-[10px] text-amber-500 font-bold">INTEREST EARNED</p>
                    <p className="font-bold text-amber-600">${gameState.totalInterest}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explainer / Complete */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="text-xs text-slate-600 leading-relaxed font-medium">
                💰 <strong>Magical Compounding Summary:</strong> You saved <strong>${gameState.totalSaved}</strong>, but because of annual interest compounding, you earned an extra <strong>${gameState.totalInterest}</strong> for a total of <strong>${gameState.totalPortfolio}</strong>! That's free money just for letting your savings grow!
              </div>
              <button
                id="m4-complete"
                onClick={completeSimulation}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                Complete Lesson <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* MODULE 5: COMPARISON SHOPPING */}
        {module.id === "m5" && (
          <div className="space-y-6">
            {gameState.stage === "chips" && (
              <div className="space-y-4">
                <div className="bg-purple-50 text-purple-900 px-4 py-3 rounded-xl border border-purple-100 text-xs font-semibold leading-relaxed">
                  🛒 <strong>Task 1: The Chip Dilemma!</strong> You need potato chips for a party. Which package represents the smartest bargain based on Unit Pricing (price-per-ounce)?
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Brand A */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🥔</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Super Crunch Chips (Brand A)</h4>
                      <p className="text-xs text-slate-500">12 oz bag</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-sm">$3.60 Total</span>
                      <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">$0.30 / oz</span>
                    </div>
                    <button
                      id="select-chips-a"
                      onClick={() => submitChips("A")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand A
                    </button>
                  </div>

                  {/* Brand B */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🥔🔥</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Mega Feast Crisps (Brand B)</h4>
                      <p className="text-xs text-slate-500">18 oz Giant bag</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-sm">$4.50 Total</span>
                      <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">$0.25 / oz</span>
                    </div>
                    <button
                      id="select-chips-b"
                      onClick={() => submitChips("B")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand B
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameState.stage === "juice" && (
              <div className="space-y-4">
                <div className="bg-purple-50 text-purple-900 px-4 py-3 rounded-xl border border-purple-100 text-xs font-semibold leading-relaxed">
                  🛒 <strong>Task 2: Juice Boxes & Coupons!</strong> Grab beverages for the gang. One has a coupon discount. Let's find the best price-per-unit!
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Brand X */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🧃</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Splashtastic Juice (Brand X)</h4>
                      <p className="text-xs text-slate-500">8-Pack Carton</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-sm">$4.80 Total</span>
                      <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">$0.60 / pack</span>
                    </div>
                    <button
                      id="select-juice-x"
                      onClick={() => submitJuice("X")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand X
                    </button>
                  </div>

                  {/* Brand Y */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🧃✨</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Orchard Bliss Juice (Brand Y)</h4>
                      <p className="text-xs text-slate-500">12-Pack Family Box</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="line-through text-slate-400 text-xs">$6.00</span>
                        <span className="font-bold text-slate-800 text-sm ml-1.5">$4.80 Total</span>
                      </div>
                      <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                        $0.40 / pack (with $1.20 coupon)
                      </span>
                    </div>
                    <button
                      id="select-juice-y"
                      onClick={() => submitJuice("Y")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand Y (with Coupon!)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameState.stage === "score" && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center space-y-4 max-w-md mx-auto">
                <span className="text-3xl">🕵️‍♂️</span>
                <h3 className="font-black text-slate-800 text-base">Shopping Report</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {gameState.feedback}
                </p>

                <button
                  id="m5-complete"
                  onClick={completeSimulation}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Collect Deal Rewards <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODULE 6: BANKING */}
        {module.id === "m6" && (
          <div className="space-y-6">
            {!gameState.checkApproved ? (
              <div className="space-y-4">
                <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 text-xs font-medium text-cyan-800">
                  🖋️ <strong>Virtual Check Writer:</strong> To deposit funds into your account, you must authorize a paper check to your savings fund. Fill out the check values correctly: <strong>Pay to: Finny's Arcade</strong>, <strong>Amount $: 150</strong>, and <strong>Amount in words: One Hundred Fifty</strong>.
                </div>

                {/* Check graphic */}
                <div className="bg-amber-50/70 rounded-2xl border-2 border-amber-200/60 p-5 font-serif max-w-md mx-auto space-y-4 relative shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="text-left">
                      <p className="text-[10px] font-bold tracking-wider text-amber-900/60 font-sans">FUTURE WEALTH HOLDER</p>
                      <p className="text-[8px] text-slate-500 font-sans">123 Savings Lane</p>
                    </div>
                    <div className="text-right text-[10px] text-slate-400 font-sans font-bold">CHECK #1001</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-2">
                    <label className="text-[10px] text-slate-600 uppercase font-sans font-bold text-left">Pay To:</label>
                    <input
                      id="check-payee"
                      type="text"
                      value={gameState.payee}
                      onChange={(e) => setGameState((prev: any) => ({ ...prev, payee: e.target.value }))}
                      placeholder="Finny's Arcade"
                      className="col-span-2 bg-transparent border-b border-slate-400 focus:outline-none focus:border-cyan-500 text-xs italic text-slate-800 font-bold"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-sans font-bold">$</span>
                      <input
                        id="check-amount"
                        type="text"
                        value={gameState.amountNum}
                        onChange={(e) => setGameState((prev: any) => ({ ...prev, amountNum: e.target.value }))}
                        placeholder="150"
                        className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs text-center focus:outline-none focus:border-cyan-500 text-slate-800 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-2">
                    <label className="text-[10px] text-slate-600 uppercase font-sans font-bold text-left">Dollars:</label>
                    <input
                      id="check-amount-words"
                      type="text"
                      value={gameState.amountWords}
                      onChange={(e) => setGameState((prev: any) => ({ ...prev, amountWords: e.target.value }))}
                      placeholder="One Hundred Fifty"
                      className="col-span-3 bg-transparent border-b border-slate-400 focus:outline-none focus:border-cyan-500 text-xs italic text-slate-800 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-end pt-2">
                    <div>
                      <p className="text-[8px] font-sans font-bold text-slate-400">MEMO: Arcade Tokens</p>
                    </div>
                    <div className="border-b border-slate-400">
                      <input
                        id="check-sig"
                        type="text"
                        value={gameState.signature}
                        onChange={(e) => setGameState((prev: any) => ({ ...prev, signature: e.target.value }))}
                        placeholder="Sign Your Name"
                        className="w-full bg-transparent focus:outline-none focus:border-cyan-500 text-xs text-center italic text-slate-800 font-bold font-serif"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 text-[7px] text-slate-500 font-mono mt-4 border-t border-slate-100 pt-2 tracking-wider">
                    <span>⑆ 123456789 ⑆</span>
                    <span>9876543210 ⑆</span>
                    <span>1001</span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    id="submit-check-btn"
                    onClick={submitCheck}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all text-xs"
                  >
                    Submit check to teller 🏦
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* ATM simulator */}
                <div className="bg-slate-800 text-white rounded-2xl p-6 border-4 border-slate-600 max-w-sm mx-auto shadow-xl font-mono text-center space-y-4">
                  <div className="bg-green-950 text-emerald-400 p-4 rounded-lg border border-green-800 min-h-[100px] flex flex-col justify-between text-left shadow-inner">
                    <p className="text-xs text-emerald-500 font-bold">ATM TERMINAL #808</p>
                    <div className="my-2">
                      <p className="text-sm font-semibold">Checking: <span className="font-bold">${gameState.checkingBalance}</span></p>
                      <p className="text-sm font-semibold">Cash Wallet: <span className="font-bold">${gameState.cashWallet}</span></p>
                    </div>
                    <p className="text-xs text-emerald-600 italic">
                      {gameState.atmStage === "insert" && "Check deposited! Insert Card to access."}
                      {gameState.atmStage === "withdraw" && "Cash deposit available. Select Action below."}
                      {gameState.atmStage === "done" && "Withdrawal successful! Receipt issued."}
                    </p>
                  </div>

                  {/* Dynamic buttons */}
                  <div className="space-y-3 pt-2">
                    {gameState.atmStage === "insert" && (
                      <button
                        id="atm-action-deposit"
                        onClick={performATMDeposit}
                        className="w-full bg-slate-700 hover:bg-slate-600 border border-slate-500 text-xs font-bold py-2 rounded-lg transition-all"
                      >
                        Deposit $50 Cash Gift
                      </button>
                    )}
                    {gameState.atmStage === "withdraw" && (
                      <button
                        id="atm-action-withdraw"
                        onClick={performATMWithdraw}
                        className="w-full bg-slate-700 hover:bg-slate-600 border border-slate-500 text-xs font-bold py-2 rounded-lg transition-all"
                      >
                        Withdraw $20 for Lunch
                      </button>
                    )}
                    {gameState.atmStage === "done" && (
                      <div className="bg-green-900/30 text-emerald-400 p-3 rounded-lg border border-green-800 text-xs leading-relaxed text-left font-semibold">
                        🎉 Perfect! You successfully deposited a check, deposited cash, and made an ATM withdrawal. You understand standard banking transactions!
                      </div>
                    )}
                  </div>
                </div>

                {gameState.atmStage === "done" && (
                  <button
                    id="m6-complete"
                    onClick={completeSimulation}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Complete Banking Lesson <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODULE 7: THE DEBT TRAP */}
        {module.id === "m7" && (
          <div className="space-y-6">
            {gameState.stage === "select" && (
              <div className="space-y-4">
                <div className="bg-rose-50 text-rose-950 p-4 rounded-xl border border-rose-100 text-xs font-semibold leading-relaxed">
                  😈 <strong>The Debt Challenge:</strong> You want to buy a high-performance $1,000 Gaming PC on your brand new credit card. Choose your payoff strategy to see how interest rates work:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Plan A */}
                  <button
                    id="select-debt-plan-full"
                    onClick={() => chooseDebtPlan("full")}
                    className="bg-white border border-slate-200 hover:border-emerald-400 p-5 rounded-xl text-left shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="text-2xl">🛡️</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-2">Plan A: Full Balance Paid</h4>
                    <p className="text-xs text-slate-500 mt-1">Pay the full $1,000 when the first bill arrives.</p>
                    <div className="mt-4 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md inline-block">
                      0% Interest Paid • Safe!
                    </div>
                  </button>

                  {/* Plan B */}
                  <button
                    id="select-debt-plan-min"
                    onClick={() => chooseDebtPlan("minimum")}
                    className="bg-white border border-slate-200 hover:border-rose-400 p-5 rounded-xl text-left shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="text-2xl">🐉</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-2">Plan B: Minimum Payment</h4>
                    <p className="text-xs text-slate-500 mt-1">Pay only the minimum $30 a month at 20% annual interest rate.</p>
                    <div className="mt-4 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md inline-block">
                      20% APR Interest • Dangerous!
                    </div>
                  </button>
                </div>
              </div>
            )}

            {gameState.stage === "simulate" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Simulation status */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      {gameState.plan === "full" ? "Strategy: Paid Full" : "Strategy: Minimum payments"}
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between font-medium text-slate-600">
                        <span>Original Purchase Price</span>
                        <span className="font-bold text-slate-800">$1,000</span>
                      </div>
                      <div className="flex justify-between font-medium text-slate-600">
                        <span>Time Elapsed</span>
                        <span className="font-bold text-slate-800">{gameState.months} months</span>
                      </div>
                      <div className="flex justify-between font-medium text-slate-600">
                        <span>Total Interest Paid</span>
                        <span className="font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">${gameState.totalInterestPaid}</span>
                      </div>
                      <div className="h-[1px] bg-slate-100" />
                      <div className="flex justify-between font-bold text-sm text-slate-800">
                        <span>Remaining Credit Card Debt</span>
                        <span className={gameState.debt > 0 ? "text-rose-600" : "text-emerald-600"}>${gameState.debt}</span>
                      </div>
                    </div>

                    {gameState.debt > 0 && (
                      <button
                        id="debt-fast-forward"
                        onClick={fastForwardDebt}
                        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 rounded-lg transition-all text-xs"
                      >
                        Fast-Forward 12 Months ⏩
                      </button>
                    )}
                  </div>

                  {/* Debt Monster Graphic */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-between min-h-[220px]">
                    <h4 className="text-xs font-bold text-slate-400 uppercase self-start">The Debt Monster</h4>
                    
                    <div className="text-center space-y-2 py-4">
                      {gameState.plan === "full" ? (
                        <>
                          <span className="text-5xl animate-bounce inline-block">🦎</span>
                          <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                            Cute Lizard: Your debt is $0! You tamed the credit danger immediately.
                          </p>
                        </>
                      ) : (
                        <>
                          <span 
                            className="text-5xl inline-block transition-all duration-500"
                            style={{ transform: `scale(${gameState.months > 0 ? 1.5 : 1.0})` }}
                          >
                            🐉
                          </span>
                          <p className="text-xs text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 leading-relaxed">
                            {gameState.months > 0 
                              ? `Giant Coin Dragon: Oh no! The Debt Monster grew! You paid $${gameState.totalInterestPaid} in interest and STILL owe $${gameState.debt}!`
                              : "Sleeping Dragon: It starts small, but interest compounding makes it grow fast!"
                            }
                          </p>
                        </>
                      )}
                    </div>

                    <button
                      id="reset-debt-sim"
                      onClick={() => setGameState((prev: any) => ({ ...prev, stage: "select" }))}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Restart comparison
                    </button>
                  </div>
                </div>

                {(gameState.plan === "full" || gameState.months >= 24) && (
                  <button
                    id="m7-complete"
                    onClick={completeSimulation}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Finish Debt Lesson <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODULE 8: ROCKET STOCKS */}
        {module.id === "m8" && (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs font-medium text-indigo-800 flex justify-between items-center gap-4">
              <div>
                <strong>🚀 Stock Market Sim:</strong> Trade company shares, read the news events, and try to make a profit! Spreading your money across different companies is called <strong>Diversification</strong>.
              </div>
              <div className="bg-white border border-indigo-200 px-3 py-2 rounded-lg text-center shrink-0">
                <p className="text-xs text-slate-400 uppercase font-black">YOUR CAPITAL</p>
                <p className="text-sm font-black text-indigo-600">${gameState.portfolioValue}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trading desk */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3 text-xs">
                    <span className="font-bold text-slate-500">Day: {gameState.day}/5</span>
                    <span className="font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border">Cash Wallet: ${gameState.cash}</span>
                  </div>

                  <div className="space-y-3">
                    {gameState.stocks?.map((stock: StockState) => {
                      const shareCount = gameState.shares[stock.symbol] || 0;
                      return (
                        <div key={stock.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 hover:bg-slate-100/50 p-3 rounded-xl border border-slate-100 gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-800 text-sm">{stock.name} ({stock.symbol})</span>
                              <span className="text-xs bg-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded">Owned: {shareCount}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 font-semibold">{stock.description}</p>
                          </div>

                          <div className="flex items-center gap-4 self-end sm:self-center">
                            <span className="font-black text-sm text-indigo-600">${stock.price}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                id={`buy-${stock.symbol.toLowerCase()}`}
                                disabled={gameState.cash < stock.price}
                                onClick={() => buyStock(stock.id, stock.price)}
                                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white font-bold p-1 rounded-lg text-xs transition-all flex items-center justify-center w-6 h-6"
                              >
                                +
                              </button>
                              <button
                                id={`sell-${stock.symbol.toLowerCase()}`}
                                disabled={shareCount <= 0}
                                onClick={() => sellStock(stock.id, stock.price)}
                                className="bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 text-white font-bold p-1 rounded-lg text-xs transition-all flex items-center justify-center w-6 h-6"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* News / Sim progress */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Live Market Feed</h4>
                  <div className="bg-indigo-950 text-indigo-200 rounded-lg p-3 text-xs font-mono min-h-[90px] border border-indigo-900 leading-relaxed shadow-inner">
                    ⚡ {gameState.news}
                  </div>
                </div>

                {gameState.day < 5 ? (
                  <button
                    id="stock-next-day"
                    onClick={advanceStockDay}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    Next Trading Day <ArrowRight className="w-4 h-4 animate-pulse" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-100 text-xs font-medium">
                      🏁 5-Day Simulation Complete! You completed your stock market experience!
                    </div>
                    <button
                      id="m8-complete"
                      onClick={completeSimulation}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 text-xs"
                    >
                      Finish Trading Lesson <Check className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 9: TAXES AT WORK */}
        {module.id === "m9" && (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs font-medium text-indigo-800">
              🏗️ <strong>Taxes at Work:</strong> You have <strong>$200 of paycheck tax dollars</strong> in your fund. Allocate them to essential city departments below, and watch your virtual town blossom with color and activity!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Allocation Desk */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-slate-800 text-sm">City Finance Desk</h4>
                  <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                    Remaining Tax: ${gameState.remainingTax}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Public Schools */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">📚 Public Schools</p>
                      <p className="text-xs text-slate-400 font-semibold">Funds textbooks, desks, and schools ($100)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-schools"
                        disabled={gameState.allocated?.schools <= 0}
                        onClick={() => allocateTax("schools", -100)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.schools}</span>
                      <button
                        id="tax-plus-schools"
                        disabled={gameState.remainingTax < 100}
                        onClick={() => allocateTax("schools", 100)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Public Parks */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">🌲 City Parks & Trees</p>
                      <p className="text-xs text-slate-400 font-semibold">Plants local trees and playgrounds ($50)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-parks"
                        disabled={gameState.allocated?.parks <= 0}
                        onClick={() => allocateTax("parks", -50)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.parks}</span>
                      <button
                        id="tax-plus-parks"
                        disabled={gameState.remainingTax < 50}
                        onClick={() => allocateTax("parks", 50)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Roads & Bridges */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">🛣️ Roads & Bridges</p>
                      <p className="text-xs text-slate-400 font-semibold">Repairs potholes and city highways ($50)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-roads"
                        disabled={gameState.allocated?.roads <= 0}
                        onClick={() => allocateTax("roads", -50)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.roads}</span>
                      <button
                        id="tax-plus-roads"
                        disabled={gameState.remainingTax < 50}
                        onClick={() => allocateTax("roads", 50)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Firefighters */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">🚒 Fire & Safety</p>
                      <p className="text-xs text-slate-400 font-semibold">Supports engines and fire protection ($50)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-fire"
                        disabled={gameState.allocated?.fire <= 0}
                        onClick={() => allocateTax("fire", -50)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.fire}</span>
                      <button
                        id="tax-plus-fire"
                        disabled={gameState.remainingTax < 50}
                        onClick={() => allocateTax("fire", 50)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual City sandbox */}
              <div className="bg-slate-900 border-2 border-slate-800 rounded-xl p-5 shadow-inner flex flex-col items-center justify-between text-center space-y-4 text-white min-h-[290px]">
                <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">City Grid</span>
                  <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                    {Object.values(gameState.allocated || {}).filter((v: any) => Number(v) > 0).length} / 4 Funded
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
                  {/* Public School */}
                  <div
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 min-h-[95px] text-center ${
                      (gameState.allocated?.schools || 0) > 0
                        ? "bg-blue-950/60 border-blue-400 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        : "bg-slate-800/30 border-slate-800 text-slate-500"
                    }`}
                  >
                    <span className={`text-2xl mb-1 transition-transform ${gameState.allocated?.schools > 0 ? "scale-110" : "grayscale opacity-40"}`}>
                      🏫
                    </span>
                    <span className={`text-xs font-bold leading-tight ${gameState.allocated?.schools > 0 ? "text-white" : "text-slate-500"}`}>
                      {gameState.allocated?.schools > 0 ? "School Active!" : "School"}
                    </span>
                    <span
                      className={`mt-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                        gameState.allocated?.schools > 0
                          ? "bg-blue-500/20 text-blue-300 border-blue-400/40"
                          : "bg-slate-800/60 text-slate-500 border-slate-700/50"
                      }`}
                    >
                      {gameState.allocated?.schools > 0 ? "Active" : "Locked"}
                    </span>
                  </div>

                  {/* City Parks */}
                  <div
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 min-h-[95px] text-center ${
                      (gameState.allocated?.parks || 0) > 0
                        ? "bg-emerald-950/60 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "bg-slate-800/30 border-slate-800 text-slate-500"
                    }`}
                  >
                    <span className={`text-2xl mb-1 transition-transform ${gameState.allocated?.parks > 0 ? "scale-110" : "grayscale opacity-40"}`}>
                      🌲
                    </span>
                    <span className={`text-xs font-bold leading-tight ${gameState.allocated?.parks > 0 ? "text-white" : "text-slate-500"}`}>
                      {gameState.allocated?.parks > 0 ? "Park Planted!" : "Parks"}
                    </span>
                    <span
                      className={`mt-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                        gameState.allocated?.parks > 0
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                          : "bg-slate-800/60 text-slate-500 border-slate-700/50"
                      }`}
                    >
                      {gameState.allocated?.parks > 0 ? "Planted" : "Locked"}
                    </span>
                  </div>

                  {/* Roads & Bridges */}
                  <div
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 min-h-[95px] text-center ${
                      (gameState.allocated?.roads || 0) > 0
                        ? "bg-amber-950/60 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-slate-800/30 border-slate-800 text-slate-500"
                    }`}
                  >
                    <span className={`text-2xl mb-1 transition-transform ${gameState.allocated?.roads > 0 ? "scale-110" : "grayscale opacity-40"}`}>
                      🛣️
                    </span>
                    <span className={`text-xs font-bold leading-tight ${gameState.allocated?.roads > 0 ? "text-white" : "text-slate-500"}`}>
                      {gameState.allocated?.roads > 0 ? "Road Paved!" : "Roads"}
                    </span>
                    <span
                      className={`mt-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                        gameState.allocated?.roads > 0
                          ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
                          : "bg-slate-800/60 text-slate-500 border-slate-700/50"
                      }`}
                    >
                      {gameState.allocated?.roads > 0 ? "Paved" : "Locked"}
                    </span>
                  </div>

                  {/* Fire & Safety */}
                  <div
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 min-h-[95px] text-center ${
                      (gameState.allocated?.fire || 0) > 0
                        ? "bg-rose-950/60 border-rose-400 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                        : "bg-slate-800/30 border-slate-800 text-slate-500"
                    }`}
                  >
                    <span className={`text-2xl mb-1 transition-transform ${gameState.allocated?.fire > 0 ? "scale-110" : "grayscale opacity-40"}`}>
                      🚒
                    </span>
                    <span className={`text-xs font-bold leading-tight ${gameState.allocated?.fire > 0 ? "text-white" : "text-slate-500"}`}>
                      {gameState.allocated?.fire > 0 ? "Fire Station!" : "Fire Station"}
                    </span>
                    <span
                      className={`mt-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                        gameState.allocated?.fire > 0
                          ? "bg-rose-500/20 text-rose-300 border-rose-400/40"
                          : "bg-slate-800/60 text-slate-500 border-slate-700/50"
                      }`}
                    >
                      {gameState.allocated?.fire > 0 ? "Ready" : "Locked"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic">
                  {gameState.remainingTax === 0 
                    ? "🎉 Fantastic! All tax dollars invested! The city is fully funded and prosperous!"
                    : `Please allocate the remaining $${gameState.remainingTax} tax dollars.`}
                </p>
              </div>
            </div>

            {gameState.remainingTax === 0 && (
              <button
                id="m9-complete"
                onClick={completeSimulation}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                Complete Lesson <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* MODULE 10: GIVING & CHARITY */}
        {module.id === "m10" && (
          <div className="space-y-6">
            <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 text-xs font-medium text-pink-800">
              💖 <strong>The Community Spark:</strong> Give back! Choose a worthy local charity to donate your real accumulated virtual Fin-Coins to. Each donation helps upgrade our local neighborhood assets!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Charity A */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between text-center space-y-3">
                <span className="text-4xl">🐶</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Animal Shelter</h4>
                  <p className="text-xs text-slate-500 font-semibold">Rescues puppies and kitties.</p>
                  <p className="text-xs font-bold text-pink-600 mt-2">Donated: {gameState.shelterDonated || 0} Coins</p>
                </div>
                <div className="flex gap-1">
                  <button
                    id="donate-shelter-20"
                    onClick={() => donateCoins("shelter", 20)}
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-black py-1.5 rounded-lg transition-all"
                  >
                    Give 20 🪙
                  </button>
                  <button
                    id="donate-shelter-50"
                    onClick={() => donateCoins("shelter", 50)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs font-black py-1.5 rounded-lg transition-all"
                  >
                    Give 50 🪙
                  </button>
                </div>
              </div>

              {/* Charity B */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between text-center space-y-3">
                <span className="text-4xl">🍎</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Community Food Bank</h4>
                  <p className="text-xs text-slate-500 font-semibold">Feeds families in need.</p>
                  <p className="text-xs font-bold text-pink-600 mt-2">Donated: {gameState.foodBankDonated || 0} Coins</p>
                </div>
                <div className="flex gap-1">
                  <button
                    id="donate-food-20"
                    onClick={() => donateCoins("foodBank", 20)}
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-black py-1.5 rounded-lg transition-all"
                  >
                    Give 20 🪙
                  </button>
                  <button
                    id="donate-food-50"
                    onClick={() => donateCoins("foodBank", 50)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs font-black py-1.5 rounded-lg transition-all"
                  >
                    Give 50 🪙
                  </button>
                </div>
              </div>

              {/* Charity C */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between text-center space-y-3">
                <span className="text-4xl">🌲</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Eco Conservation</h4>
                  <p className="text-xs text-slate-500 font-semibold">Plants trees and saves wildlife.</p>
                  <p className="text-xs font-bold text-pink-600 mt-2">Donated: {gameState.forestDonated || 0} Coins</p>
                </div>
                <div className="flex gap-1">
                  <button
                    id="donate-eco-20"
                    onClick={() => donateCoins("forest", 20)}
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-black py-1.5 rounded-lg transition-all"
                  >
                    Give 20 🪙
                  </button>
                  <button
                    id="donate-eco-50"
                    onClick={() => donateCoins("forest", 50)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs font-black py-1.5 rounded-lg transition-all"
                  >
                    Give 50 🪙
                  </button>
                </div>
              </div>
            </div>

            {gameState.badgeEarned && (
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs font-medium text-center">
                  🌟 <strong>Generosity Unleashed!</strong> You've donated a total of <strong>{gameState.spentCoins} Fin-Coins</strong> to critical civic sectors! You make our community a better place.
                </div>
                <button
                  id="m10-complete"
                  onClick={completeSimulation}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Complete Giving Lesson <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
