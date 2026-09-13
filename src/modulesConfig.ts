export interface AdventureModuleConfig {
  id: string;
  cardTitle: string;
  categoryTag: string;
  categoryBg: string;
  grade: string;
  gradeFilter: "gr6" | "gr7" | "gr8";
  description: string;
  actionLabel: string;
  actionBg: string;
  icon: string;
  scenarioTag: string;
}

export const ADVENTURE_MODULES: AdventureModuleConfig[] = [
  {
    id: "m1",
    cardTitle: "The Origin of Money",
    categoryTag: "MONEY BASICS",
    categoryBg: "bg-[#fde047] text-slate-950 border-2 border-black",
    grade: "GRADE 6",
    gradeFilter: "gr6",
    description: "Discover why trading apples for a skateboard is so hard, and how cash, coins, and currency solved this ancient puzzle!",
    actionLabel: "LET'S TRADE! >",
    actionBg: "bg-[#fde047] hover:bg-[#facc15] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "🪙",
    scenarioTag: "MODULE 1: THE ORIGIN OF MONEY"
  },
  {
    id: "m2",
    cardTitle: "Careers & Income",
    categoryTag: "CAREERS & WAGES",
    categoryBg: "bg-[#67e8f9] text-slate-950 border-2 border-black",
    grade: "GRADE 6",
    gradeFilter: "gr6",
    description: "Explore different jobs, learn how salaries work, and understand the mystery of why your virtual paycheck gets smaller before you spend it!",
    actionLabel: "CHOOSE PATH! >",
    actionBg: "bg-[#67e8f9] hover:bg-[#22d3ee] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "💼",
    scenarioTag: "MODULE 2: CAREERS & INCOME"
  },
  {
    id: "m3",
    cardTitle: "Needs vs. Wants",
    categoryTag: "BUDGETING",
    categoryBg: "bg-[#d8b4fe] text-slate-950 border-2 border-black",
    grade: "GRADE 6-7",
    gradeFilter: "gr6",
    description: "Learn the legendary 50/30/20 rule to divide your money so you can afford what you need, get what you want, and save for the future!",
    actionLabel: "LET'S BUDGET! >",
    actionBg: "bg-[#d8b4fe] hover:bg-[#c084fc] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "🧠",
    scenarioTag: "MODULE 3: NEEDS VS. WANTS BUDGETING"
  },
  {
    id: "m4",
    cardTitle: "Compound Interest Magic",
    categoryTag: "INVESTING & WEALTH",
    categoryBg: "bg-[#86efac] text-slate-950 border-2 border-black",
    grade: "GRADE 7-8",
    gradeFilter: "gr8",
    description: "Watch how a single dollar can snowball and multiply over time through compound interest. The ultimate financial superpower!",
    actionLabel: "GROW WEALTH! >",
    actionBg: "bg-[#86efac] hover:bg-[#4ade80] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "🌱",
    scenarioTag: "MODULE 4: COMPOUND INTEREST MAGIC"
  },
  {
    id: "m5",
    cardTitle: "Smart Shopping Sweep",
    categoryTag: "CONSUMER MATH",
    categoryBg: "bg-[#f472b6] text-slate-950 border-2 border-black",
    grade: "GRADE 6-7",
    gradeFilter: "gr6",
    description: "Learn how to calculate cost-per-ounce, decode confusing coupons, and dodge sneaky store tricks designed to empty your wallet!",
    actionLabel: "START SWEEP! >",
    actionBg: "bg-[#f472b6] hover:bg-[#f43f5e] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "🛒",
    scenarioTag: "MODULE 5: SMART SHOPPING SWEEP"
  },
  {
    id: "m6",
    cardTitle: "Banking & Checks",
    categoryTag: "BANKING & ACCOUNTS",
    categoryBg: "bg-[#fed7aa] text-slate-950 border-2 border-black",
    grade: "GRADE 7",
    gradeFilter: "gr7",
    description: "Crack the code of how checking and savings accounts work, write your very first virtual paper check, and run the ATM!",
    actionLabel: "UNLOCK VAULT! >",
    actionBg: "bg-[#fed7aa] hover:bg-[#fb923c] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "🏛️",
    scenarioTag: "MODULE 6: BANKING & CHECKS"
  },
  {
    id: "m7",
    cardTitle: "The Borrowing Beast",
    categoryTag: "CREDIT & DEBT",
    categoryBg: "bg-[#fca5a5] text-slate-950 border-2 border-black",
    grade: "GRADE 7-8",
    gradeFilter: "gr8",
    description: "Credit cards let you buy today, but invite a greedy 'Interest Monster' to double your bills! Master credit safety and avoid the minimum payment trap.",
    actionLabel: "BATTLE DEBT! >",
    actionBg: "bg-[#fca5a5] hover:bg-[#f87171] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "💳",
    scenarioTag: "MODULE 7: THE BORROWING BEAST"
  },
  {
    id: "m8",
    cardTitle: "The Rocket Market",
    categoryTag: "STOCK MARKET",
    categoryBg: "bg-[#5eead4] text-slate-950 border-2 border-black",
    grade: "GRADE 8",
    gradeFilter: "gr8",
    description: "Buy shares of tomorrow's companies! Trade virtual stocks, react to crazy breaking news, and watch your portfolio blast off!",
    actionLabel: "TRADE STOCKS! >",
    actionBg: "bg-[#5eead4] hover:bg-[#2dd4bf] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "🚀",
    scenarioTag: "MODULE 8: THE ROCKET MARKET"
  },
  {
    id: "m9",
    cardTitle: "Paychecks & Taxes",
    categoryTag: "CIVICS & TAXES",
    categoryBg: "bg-[#bef264] text-slate-950 border-2 border-black",
    grade: "GRADE 7-8",
    gradeFilter: "gr7",
    description: "Crack open a real paycheck stub! Discover where your tax money goes (like parks, schools, roads, and fire protection) and see taxes at work.",
    actionLabel: "CALCULATE TAX! >",
    actionBg: "bg-[#bef264] hover:bg-[#a3e635] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "📑",
    scenarioTag: "MODULE 9: PAYCHECKS & TAXES"
  },
  {
    id: "m10",
    cardTitle: "Giving Back",
    categoryTag: "PHILANTHROPY",
    categoryBg: "bg-[#e879f9] text-slate-950 border-2 border-black",
    grade: "GRADE 6-8",
    gradeFilter: "gr7",
    description: "Learn how to use your wealth to make a difference. Donate your accumulated virtual coins to re-build and upgrade your community!",
    actionLabel: "LET'S GIVE! >",
    actionBg: "bg-[#e879f9] hover:bg-[#d946ef] text-slate-950 border-2 border-black shadow-[2px_2px_0px_0px_#000]",
    icon: "❤️",
    scenarioTag: "MODULE 10: GIVING BACK"
  }
];
