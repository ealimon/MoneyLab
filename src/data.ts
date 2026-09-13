import { Module, AvatarItem } from "./types";

export const MODULES: Module[] = [
  {
    id: "m1",
    title: "The Origin of Money",
    subtitle: "From Bartering to Cash",
    description: "Discover why trading apples for a skateboard is so hard, and how cash, coins, and currency solved this ancient puzzle!",
    category: "basics",
    estimatedMinutes: 5,
    xpReward: 100,
    coinReward: 50,
    badge: {
      id: "b1",
      title: "Barter King",
      description: "Understood the double coincidence of wants and the power of currency.",
      icon: "Coins",
      color: "text-amber-500 bg-amber-50 border-amber-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is the main problem with bartering (trading items directly)?",
        options: [
          "Items are always too clean to trade.",
          "Everyone only wants to trade for pet lizards.",
          "You must find someone who has what you want AND wants what you have."
        ],
        correctAnswerIndex: 2,
        explanation: "This is called the 'double coincidence of wants'. If you have apples and want a book, you have to find someone with a book who wants apples!"
      },
      {
        id: 2,
        question: "Why did societies start using metal coins instead of heavy items like cows or giant stones?",
        options: [
          "Coins are durable, easy to carry, and can be divided into smaller values.",
          "Coins can be eaten in an emergency.",
          "Cows were too quiet and boring to trade."
        ],
        correctAnswerIndex: 0,
        explanation: "Coins are lightweight, last forever, and have standard values, making trade extremely simple and efficient!"
      },
      {
        id: 3,
        question: "If you trade a pencil directly for an eraser, what is this exchange called?",
        options: [
          "Taxation",
          "Bartering",
          "Compounding"
        ],
        correctAnswerIndex: 1,
        explanation: "Trading goods or services directly without using money is called bartering."
      },
      {
        id: 4,
        question: "What is the 'double coincidence of wants'?",
        options: [
          "When you accidentally buy two of the exact same toy.",
          "When a store has a buy-one-get-one-free deal.",
          "When two people happen to want exactly what each other is trading."
        ],
        correctAnswerIndex: 2,
        explanation: "The double coincidence of wants is the hard-to-find situation where two people have exactly what the other person desires to trade!"
      },
      {
        id: 5,
        question: "Why is paper cash better than gold coins for daily grocery shopping?",
        options: [
          "Because paper cash is much lighter, more compact, and easier to carry around.",
          "Because cash has cool pictures of historic presidents.",
          "Because paper cash is waterproof and cannot be ripped."
        ],
        correctAnswerIndex: 0,
        explanation: "Paper cash is incredibly light and easy to carry compared to heavy bags of metal coins, making everyday trades fast and simple!"
      },
      {
        id: 6,
        question: "Which of these is NOT one of the 3 primary functions of money in economics?",
        options: [
          "A medium of exchange to buy goods.",
          "A delicious snack for when you are hungry.",
          "A store of value to save purchasing power."
        ],
        correctAnswerIndex: 1,
        explanation: "The 3 core functions of money are: Medium of Exchange, Store of Value, and Unit of Account. Money is definitely not for eating!"
      },
      {
        id: 7,
        question: "What gave early paper certificates and bank notes their value when first invented?",
        options: [
          "They were backed by real gold or silver stored safely in bank vaults.",
          "They were made out of solid chocolate.",
          "They could be traded for magical wishes."
        ],
        correctAnswerIndex: 0,
        explanation: "Early paper banknotes were promises that could be traded at the bank for actual physical gold or silver coins stored in vaults!"
      },
      {
        id: 8,
        question: "Why is money called a 'store of value'?",
        options: [
          "Because it must be physically locked inside a grocery store.",
          "It allows you to save purchasing power today and spend it safely in the future.",
          "Because its value disappears after 24 hours."
        ],
        correctAnswerIndex: 1,
        explanation: "Unlike perishable goods (like bananas that rot), money holds its value over time so you can save and spend it whenever you need!"
      }
    ]
  },
  {
    id: "m2",
    title: "Careers & Income",
    subtitle: "Choose Your Path",
    description: "Explore different jobs, learn how salaries work, and understand the mystery of why your virtual paycheck gets smaller before you spend it!",
    category: "earning",
    estimatedMinutes: 6,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b2",
      title: "Career Architect",
      description: "Mastered career planning, paychecks, and gross vs. net income.",
      icon: "Briefcase",
      color: "text-blue-500 bg-blue-50 border-blue-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is the difference between Gross Pay and Net Pay?",
        options: [
          "Gross Pay is what you earn before taxes; Net Pay is what you actually take home.",
          "Gross Pay is your take-home cash; Net Pay is eaten by spiders.",
          "Gross Pay is money earned on weekends; Net Pay is for weekdays."
        ],
        correctAnswerIndex: 0,
        explanation: "Gross Pay is the total money you earned. Net Pay is your actual take-home pay after taxes and other deductions are subtracted!"
      },
      {
        id: 2,
        question: "If you get paid an hourly wage, how do you earn more money on your paycheck?",
        options: [
          "Ask to work fewer hours.",
          "Keep your fingers crossed and hope for the best.",
          "Work more hours or earn a higher rate per hour."
        ],
        correctAnswerIndex: 2,
        explanation: "Hourly wages are calculated by multiplying your hourly rate by the number of hours you work. More hours = more money!"
      },
      {
        id: 3,
        question: "Why do some careers have higher average salaries than others?",
        options: [
          "Because those workers have longer names.",
          "They require specialized skills, higher levels of education, or are in very high demand.",
          "It is completely random."
        ],
        correctAnswerIndex: 1,
        explanation: "Jobs that require years of training, college degrees, or rare skills (like doctors or software engineers) tend to pay more to attract qualified people."
      },
      {
        id: 4,
        question: "What is a 'salary' compared to an 'hourly wage'?",
        options: [
          "A fixed amount of regular pay, regardless of the exact hours worked.",
          "Money you are paid only during holiday seasons.",
          "A bonus payment for working on high-rise buildings."
        ],
        correctAnswerIndex: 0,
        explanation: "A salary is a fixed, contracted payment (e.g., paid monthly or bi-weekly) regardless of whether you work exactly 38 or 40 hours that week, while an hourly wage changes depending on the hours logged."
      },
      {
        id: 5,
        question: "What is 'human capital' and how can you increase it?",
        options: [
          "The number of friends you have on your favorite social app.",
          "The physical size of your brain.",
          "Your knowledge, skills, education, and experience; you increase it by learning!"
        ],
        correctAnswerIndex: 2,
        explanation: "Human capital is your personal set of skills, education, and health. Investing in your human capital through study and practice helps you qualify for higher-paying careers!"
      },
      {
        id: 6,
        question: "If an employer offers 'overtime pay' at 1.5x regular pay ($16/hr base), how much is earned per overtime hour?",
        options: [
          "$24 per hour ($16 x 1.5).",
          "$16 per hour.",
          "$32 per hour."
        ],
        correctAnswerIndex: 0,
        explanation: "Overtime pay (often called 'time and a half') multiplies your base hourly rate by 1.5 ($16 x 1.5 = $24) for hours worked beyond the standard 40-hour work week!"
      },
      {
        id: 7,
        question: "What is 'passive income'?",
        options: [
          "Money earned from doing intense manual yard work every day.",
          "Income received automatically with little active daily effort, like royalties or investment dividends.",
          "Money borrowed from your best friend."
        ],
        correctAnswerIndex: 1,
        explanation: "Passive income is money earned on an ongoing basis from assets you created or bought (like writing a book, creating an app, or investments) without working hourly!"
      },
      {
        id: 8,
        question: "Which of the following is considered an employee benefit or workplace perk?",
        options: [
          "Health insurance and paid vacation days.",
          "A fine for showing up to work on time.",
          "A requirement to clean the entire office building alone."
        ],
        correctAnswerIndex: 0,
        explanation: "Employee benefits (like health coverage, retirement matching, and paid time off) are valuable forms of compensation added to your regular paycheck!"
      }
    ]
  },
  {
    id: "m3",
    title: "Needs vs. Wants Budgeting",
    subtitle: "The Piggy Bank Challenge",
    description: "Learn the legendary 50/30/20 rule to divide your money so you can afford what you need, get what you want, and save for the future!",
    category: "spending",
    estimatedMinutes: 6,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b3",
      title: "Budget Boss",
      description: "Balanced a budget and survived the unexpected 'Life Happens' simulator.",
      icon: "PiggyBank",
      color: "text-green-500 bg-green-50 border-green-200"
    },
    quizzes: [
      {
        id: 1,
        question: "Which of these is a true 'Need'?",
        options: [
          "A brand new gaming console.",
          "Concert tickets to see your favorite band.",
          "Basic food, water, and safe shelter."
        ],
        correctAnswerIndex: 2,
        explanation: "Needs are things you absolutely require to survive. While games and concert tickets are fun, you don't need them to stay alive and healthy!"
      },
      {
        id: 2,
        question: "According to the popular 50/30/20 rule, where does the 30% of your budget go?",
        options: [
          "Needs (rent, groceries, utilities).",
          "Wants (fun things, hobbies, and entertainment).",
          "Savings (future goals and emergencies)."
        ],
        correctAnswerIndex: 1,
        explanation: "The 50/30/20 rule splits your money: 50% for Needs, 30% for Wants (fun items), and 20% for Savings!"
      },
      {
        id: 3,
        question: "If your bicycle tire pops and costs $25 to replace, what should you do?",
        options: [
          "Use money from your Savings or Emergency Fund category.",
          "Never ride a bike again.",
          "Buy 5 more bikes using a credit card."
        ],
        correctAnswerIndex: 0,
        explanation: "Unexpected expenses (like repairs) are exactly why we keep a Savings/Emergency fund, so we don't have to panic or go into debt!"
      },
      {
        id: 4,
        question: "If you spend all your money on a movie and snacks instead of buying your required school textbook, what did you fail to prioritize?",
        options: [
          "Your savings goals.",
          "Your wants (things that are just for fun).",
          "Your needs (things you must have for your responsibilities and survival)."
        ],
        correctAnswerIndex: 2,
        explanation: "Needs must always be paid for first! School books are a necessity for your education responsibility, while movies and snacks are fun wants."
      },
      {
        id: 5,
        question: "What does the '20' stand for in the 50/30/20 budget rule?",
        options: [
          "20% goes towards savings, paying off debt, or investing for the future.",
          "20% goes towards fun hobbies and streaming services.",
          "20% is given away as birthday gifts."
        ],
        correctAnswerIndex: 0,
        explanation: "The 20% slice is dedicated to savings and financial goals, helping you build a security net or prepare for big future purchases!"
      },
      {
        id: 6,
        question: "What is an 'Emergency Fund' and how much should you aim to save in it as an adult?",
        options: [
          "3 to 6 months of essential living expenses saved for emergencies.",
          "Exactly $5 kept inside an envelope.",
          "One year's worth of candy and movie tickets."
        ],
        correctAnswerIndex: 0,
        explanation: "An emergency fund protects you against sudden life surprises (like car repairs or medical bills). Financial experts recommend keeping 3 to 6 months of basic expenses safe!"
      },
      {
        id: 7,
        question: "Why is creating a budget before you receive your income better than just tracking spending afterward?",
        options: [
          "It forces you to give every single dollar a job before you are tempted to spend it.",
          "It makes your bank balance magically double overnight.",
          "It is required by federal law for teenagers."
        ],
        correctAnswerIndex: 0,
        explanation: "Proactive budgeting gives you control of your money before you spend it, ensuring you hit your savings goals and cover all necessities first!"
      },
      {
        id: 8,
        question: "Which of the following is an example of a 'Fixed Expense' in a monthly budget?",
        options: [
          "Monthly rent or bus pass that stays the exact same price every month.",
          "Dining out at fancy restaurants on weekends.",
          "Buying seasonal video games during holiday sales."
        ],
        correctAnswerIndex: 0,
        explanation: "Fixed expenses are predictable costs that remain the same each billing cycle (like rent or flat-rate insurance), making them easy to plan for in advance!"
      }
    ]
  },
  {
    id: "m4",
    title: "Compound Interest Magic",
    subtitle: "Grow Your Money Tree",
    description: "Watch how a single dollar can snowball and multiply over time through compound interest. The ultimate financial superpower!",
    category: "saving",
    estimatedMinutes: 5,
    xpReward: 110,
    coinReward: 55,
    badge: {
      id: "b4",
      title: "Savings Botanist",
      description: "Cultivated a massive savings tree using the power of compounding.",
      icon: "TrendingUp",
      color: "text-emerald-500 bg-emerald-50 border-emerald-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is compound interest?",
        options: [
          "Interest that is extremely complicated to calculate.",
          "A fee you pay the bank for keeping your money.",
          "Earning interest on your original savings PLUS on the interest you've already earned."
        ],
        correctAnswerIndex: 2,
        explanation: "Compounding means you earn interest on your interest. It makes your money grow faster and faster like a snowball rolling downhill!"
      },
      {
        id: 2,
        question: "Why does starting to save at age 12 give you a massive advantage over starting at age 35?",
        options: [
          "Your savings have many more years to compound and grow.",
          "Because kids are naturally luckier.",
          "Older people are forbidden from having savings accounts."
        ],
        correctAnswerIndex: 0,
        explanation: "Time is the secret ingredient of compounding. The more years your money has to grow, the more dramatic the snowball effect becomes!"
      },
      {
        id: 3,
        question: "What is the safest place to deposit your savings to let them grow?",
        options: [
          "Underneath your mattress.",
          "A federally insured savings account at a bank.",
          "In a piggy bank hidden in your backyard."
        ],
        correctAnswerIndex: 1,
        explanation: "A bank savings account is safe, insured against loss, and pays you interest over time!"
      },
      {
        id: 4,
        question: "What is the 'principal' in a savings account?",
        options: [
          "The strict school director who watches over the local bank.",
          "The paper document that proves the bank is real.",
          "The initial sum of money you deposit before any interest is earned."
        ],
        correctAnswerIndex: 2,
        explanation: "In finance, 'principal' is the original amount of money you put in. Interest is calculated as a percentage of this principal!"
      },
      {
        id: 5,
        question: "If you deposit $100 at a 10% annual interest rate, how much money do you have after 2 years with compound interest?",
        options: [
          "$121",
          "$110",
          "$115"
        ],
        correctAnswerIndex: 0,
        explanation: "Year 1: $100 + $10 interest = $110. Year 2: you earn 10% on the new $110, which is $11, making the total $121! That's compound magic!"
      },
      {
        id: 6,
        question: "What is the 'Rule of 72' used for in financial math?",
        options: [
          "A mental shortcut to estimate how many years it takes your money to double at a given interest rate.",
          "A rule that you must save for exactly 72 weeks.",
          "The maximum number of dollars you can keep in a piggy bank."
        ],
        correctAnswerIndex: 0,
        explanation: "Divide 72 by your annual interest rate (e.g., 72 / 8% = 9 years) to find out roughly how many years it takes for your investment to double!"
      },
      {
        id: 7,
        question: "What does APY stand for on a bank savings account?",
        options: [
          "Annual Percentage Yield, showing total interest earned over a year with compounding.",
          "Automatic Piggybank Yearly score.",
          "Amount Paid to You on your birthday."
        ],
        correctAnswerIndex: 0,
        explanation: "APY (Annual Percentage Yield) reflects the real rate of return on your deposit, taking into account the effect of compounding interest over a full year!"
      },
      {
        id: 8,
        question: "What happens to cash kept under a mattress for 25 years without earning interest?",
        options: [
          "It loses purchasing power due to inflation as prices for everyday goods rise.",
          "It automatically multiplies into gold coins.",
          "The bills transform into new paper currency."
        ],
        correctAnswerIndex: 0,
        explanation: "Inflation causes prices of goods to rise over time. Money sitting idle without interest loses its buying power over decades!"
      }
    ]
  },
  {
    id: "m5",
    title: "Smart Shopping Sweep",
    subtitle: "Beating the Supermarket",
    description: "Learn how to calculate cost-per-ounce, decode confusing coupons, and dodge sneaky store tricks designed to empty your wallet!",
    category: "spending",
    estimatedMinutes: 6,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b5",
      title: "Deal Detective",
      description: "Cracked unit prices and unlocked the smartest shopping choices.",
      icon: "Search",
      color: "text-purple-500 bg-purple-50 border-purple-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is 'unit pricing'?",
        options: [
          "The cost per unit of measure (like ounce, gram, or sheet) to easily compare values.",
          "The color of the box.",
          "The price of buying exactly one truckload of items."
        ],
        correctAnswerIndex: 0,
        explanation: "Unit pricing shows you how much an item costs per ounce or gram. It helps you see if a giant box is actually a better deal than a small one!"
      },
      {
        id: 2,
        question: "If Brand A costs $4.00 for 16oz ($0.25/oz) and Brand B costs $6.00 for 30oz ($0.20/oz), which is the better bargain?",
        options: [
          "Brand A, because $4.00 is a smaller number.",
          "They are exactly the same.",
          "Brand B, because it has a lower cost per ounce ($0.20/oz)."
        ],
        correctAnswerIndex: 2,
        explanation: "Brand B gives you more food for every dollar spent. It costs less per ounce, making it the smarter buy!"
      },
      {
        id: 3,
        question: "What is an 'impulse buy'?",
        options: [
          "Buying something you planned to purchase for weeks.",
          "Buying an item on a sudden whim, often near the checkout counter, without planning.",
          "Trading items in a barter market."
        ],
        correctAnswerIndex: 1,
        explanation: "Stores place candies and fun trinkets right at the cash register to trigger 'impulse buys'—unplanned items they hope you'll grab without thinking!"
      },
      {
        id: 4,
        question: "Why is comparing the 'unit price' often more helpful than just looking at the retail price tag?",
        options: [
          "Because package sizes differ, and unit price reveals the actual cost per ounce or gram.",
          "Because the unit price is always printed in a prettier font.",
          "Because unit pricing automatically subtracts tax."
        ],
        correctAnswerIndex: 0,
        explanation: "Two boxes might look the same size, but one might have half the weight inside! Comparing unit price (like price per ounce) cuts through packaging tricks."
      },
      {
        id: 5,
        question: "What is a 'loss leader' used by grocery stores?",
        options: [
          "An employee who loses keys often.",
          "A brand of milk that has expired.",
          "A popular item sold at a very low price (even losing money) to attract shoppers into the store."
        ],
        correctAnswerIndex: 2,
        explanation: "Stores advertise super cheap items (like milk or bread) to get you in the door, hoping you'll buy plenty of regular-priced items while you're there!"
      },
      {
        id: 6,
        question: "Why do grocery stores frequently put staple goods like milk and eggs at the far back wall?",
        options: [
          "So shoppers must walk past aisles filled with tempting snacks and impulse goods.",
          "Because cows and chickens are kept in the back parking lot.",
          "To keep milk warm near the heaters."
        ],
        correctAnswerIndex: 0,
        explanation: "Store layout psychology! Placing everyday essentials in the back ensures shoppers traverse the entire store, increasing the chance of extra purchases."
      },
      {
        id: 7,
        question: "What is 'shrinkflation'?",
        options: [
          "When a manufacturer reduces product size or quantity while keeping the price unchanged.",
          "When clothes shrink in the washing machine.",
          "When stores give discounts for smaller shoes."
        ],
        correctAnswerIndex: 0,
        explanation: "Shrinkflation is a subtle form of inflation where a company keeps the sticker price identical but reduces the ounces or grams inside the package!"
      },
      {
        id: 8,
        question: "Why are store-brand (generic) items usually significantly cheaper than name-brand items?",
        options: [
          "Store brands spend far less money on national TV ads, marketing, and celebrity endorsements.",
          "Store brands are made of cardboard.",
          "Generic items are missing ingredients."
        ],
        correctAnswerIndex: 0,
        explanation: "Store brands often share the exact same manufacturing facilities as big name brands, but cost 20-30% less because they don't have massive ad budgets!"
      }
    ]
  },
  {
    id: "m6",
    title: "Banking & Checks",
    subtitle: "Unlock the Vault",
    description: "Crack the code of how checking and savings accounts work, write your very first virtual paper check, and run the ATM!",
    category: "basics",
    estimatedMinutes: 6,
    xpReward: 130,
    coinReward: 65,
    badge: {
      id: "b6",
      title: "Vault Master",
      description: "Successfully authorized a check and managed checking accounts.",
      icon: "Lock",
      color: "text-cyan-500 bg-cyan-50 border-cyan-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is the primary purpose of a checking account?",
        options: [
          "To lock up money until you turn 65.",
          "To hide your gold bars from pirates.",
          "To easily access your money for daily spending, debit card swipes, and checks."
        ],
        correctAnswerIndex: 2,
        explanation: "A checking account is designed for everyday transactions. You can deposit money and immediately spend it using cards, mobile apps, or checks!"
      },
      {
        id: 2,
        question: "Why must you sign your name on the bottom right corner of a check?",
        options: [
          "To officially authorize and approve the bank to transfer those funds.",
          "To prove you know how to write in cursive.",
          "Because checks look pretty with scribble drawings."
        ],
        correctAnswerIndex: 0,
        explanation: "Your unique signature is your security seal. It lets the bank know that YOU are the account owner approving the payment."
      },
      {
        id: 3,
        question: "What is a 9-digit routing number on a check?",
        options: [
          "The phone number of the store.",
          "Your private bank password.",
          "A special bank ID code that tells where your bank is located in the country."
        ],
        correctAnswerIndex: 2,
        explanation: "The routing number tells banking computers exactly which bank in the country holds your account, ensuring money routes to the correct destination."
      },
      {
        id: 4,
        question: "What does it mean when a check 'bounces'?",
        options: [
          "The paper check was printed on a rubber-like material.",
          "The account owner didn't have enough money in their account to pay the check amount.",
          "The bank teller physically dropped the check on the floor."
        ],
        correctAnswerIndex: 1,
        explanation: "A check bounces when there are insufficient funds in the checking account. The bank rejects the payment, and the check writer is often fined a fee!"
      },
      {
        id: 5,
        question: "What is the main difference between a debit card and a credit card?",
        options: [
          "Debit cards spend money directly from your bank account; credit cards borrow the money to pay back later.",
          "Debit cards can only be used at night.",
          "Credit cards don't have PIN numbers."
        ],
        correctAnswerIndex: 0,
        explanation: "With a debit card, you spend your own money instantly from your checking account. With a credit card, you are borrowing money from the bank and will receive a bill later."
      },
      {
        id: 6,
        question: "What is FDIC insurance in banking?",
        options: [
          "A federal government guarantee that protects deposits up to $250,000 if the bank fails.",
          "An insurance policy on video games.",
          "A fee charged to enter a bank lobby."
        ],
        correctAnswerIndex: 0,
        explanation: "The Federal Deposit Insurance Corporation (FDIC) backs member bank accounts up to $250,000 per depositor, keeping your savings completely secure!"
      },
      {
        id: 7,
        question: "What is an 'overdraft fee'?",
        options: [
          "A penalty fee charged by a bank when you spend more money than you have in your account.",
          "A bonus reward for making multiple deposits.",
          "A discount code for bank checks."
        ],
        correctAnswerIndex: 0,
        explanation: "An overdraft fee happens when your account balance goes below $0 and the bank covers the transaction for you, usually charging a steep penalty fee (e.g. $35)!"
      },
      {
        id: 8,
        question: "What is the 'Memo Line' on a paper check used for?",
        options: [
          "Writing a short note or reminder explaining what the payment was for.",
          "Writing secret riddles for the bank teller.",
          "Drawing pictures of bank vaults."
        ],
        correctAnswerIndex: 0,
        explanation: "The memo line helps both you and the recipient keep track of the purpose of the check, like writing 'October Rent' or 'Soccer Uniform'!"
      }
    ]
  },
  {
    id: "m7",
    title: "The Borrowing Beast",
    subtitle: "Credit & Debt Danger",
    description: "Credit cards let you buy today, but can invite a greedy 'Interest Monster' to double your bills! Master credit safety.",
    category: "spending",
    estimatedMinutes: 7,
    xpReward: 140,
    coinReward: 70,
    badge: {
      id: "b7",
      title: "Monster Tamer",
      description: "Defeated the Credit Monster and mastered credit scores.",
      icon: "ShieldAlert",
      color: "text-rose-500 bg-rose-50 border-rose-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is a credit card?",
        options: [
          "A card that gives you free unlimited money from the government.",
          "An identity card for arcade centers.",
          "A card that lets you borrow money from a bank to buy things, which you must pay back."
        ],
        correctAnswerIndex: 2,
        explanation: "Credit cards are NOT free money! You are borrowing money from the card issuer to buy things, and you must pay them back when the bill arrives."
      },
      {
        id: 2,
        question: "What happens if you only pay the tiny 'Minimum Payment' on a credit card bill?",
        options: [
          "You pay high interest on the remaining balance, and your debt grows and lasts for years!",
          "The bank rewards you with free cupcakes.",
          "Absolutely nothing; you saved money."
        ],
        correctAnswerIndex: 0,
        explanation: "If you don't pay the full bill, high-interest charges are added to what you owe. Your balance grows, and you end up paying double or triple the original price!"
      },
      {
        id: 3,
        question: "What is a Credit Score?",
        options: [
          "Your high score in a banking video game.",
          "The amount of physical money in your wallet.",
          "A grade showing how reliable you are at paying back borrowed money."
        ],
        correctAnswerIndex: 2,
        explanation: "A credit score is like a financial GPA. It tells lenders how reliable you are at paying back debt. High scores make borrowing cheaper and easier!"
      },
      {
        id: 4,
        question: "How can you build and maintain a high, excellent credit score?",
        options: [
          "By paying your bills on time, keeping debt low, and only borrowing what you can afford.",
          "By buying as many video games as possible on credit cards.",
          "By keeping your money in a shoe box instead of a bank."
        ],
        correctAnswerIndex: 0,
        explanation: "The single best way to build great credit is to pay every bill on time and keep your credit card balances very low relative to your limits!"
      },
      {
        id: 5,
        question: "What is 'APR' on a credit card?",
        options: [
          "Automatic Payment Refund, which returns your money.",
          "A special credit card for the month of April.",
          "Annual Percentage Rate, which is the yearly interest cost charged on unpaid debt."
        ],
        correctAnswerIndex: 2,
        explanation: "APR stands for Annual Percentage Rate. It is the yearly cost of interest you have to pay if you carry a balance on your credit card!"
      },
      {
        id: 6,
        question: "What is the standard score range for a FICO Credit Score?",
        options: [
          "300 to 850 (with 750+ considered excellent).",
          "0 to 100 points.",
          "1,000 to 10,000 points."
        ],
        correctAnswerIndex: 0,
        explanation: "Standard credit scores run from 300 to 850. Scores above 740+ help you qualify for the lowest interest rates and best loan terms!"
      },
      {
        id: 7,
        question: "What is 'collateral' on a secured loan (like a car loan or mortgage)?",
        options: [
          "A valuable property or asset the lender can reclaim if the borrower fails to repay the debt.",
          "A free gift card given to loan applicants.",
          "A special signature on your checkbook."
        ],
        correctAnswerIndex: 0,
        explanation: "Collateral is security pledged for a loan. If you don't make your payments on a car loan, the lender has the legal right to repossess the car."
      },
      {
        id: 8,
        question: "Why is carrying high-interest credit card debt for luxury purchases dangerous?",
        options: [
          "Because high interest compounds against you, turning a $100 purchase into hundreds of dollars in debt.",
          "Because credit cards expire after 3 days.",
          "Because banks confiscate your wallet."
        ],
        correctAnswerIndex: 0,
        explanation: "Credit card APRs are often 20% to 28%! When you carry a balance on depreciating luxury goods, compounding interest works against you like a runaway monster."
      }
    ]
  },
  {
    id: "m8",
    title: "The Rocket Market",
    subtitle: "Stock Market Simulator",
    description: "Buy shares of tomorrow's companies! Trade virtual stocks, react to crazy breaking news, and watch your portfolio blast off!",
    category: "investing",
    estimatedMinutes: 7,
    xpReward: 150,
    coinReward: 75,
    badge: {
      id: "b8",
      title: "Stock Scientist",
      description: "Successfully built and traded a diversified virtual stock portfolio.",
      icon: "Rocket",
      color: "text-violet-500 bg-violet-50 border-violet-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is a share of stock?",
        options: [
          "A tiny, real piece of ownership in a public company.",
          "A ticket to watch a movie about finance.",
          "A loan you make to a small local charity."
        ],
        correctAnswerIndex: 0,
        explanation: "When you buy a stock, you become a 'shareholder'—which means you own a micro-fraction of that company!"
      },
      {
        id: 2,
        question: "Why do stock prices fluctuate (go up and down)?",
        options: [
          "They change depending on the weather in Antarctica.",
          "They only go up, never down.",
          "They change based on company performance, news, and buyer/seller demand."
        ],
        correctAnswerIndex: 2,
        explanation: "Stock prices are determined by supply and demand. Good news makes more people want to buy, which drives the price up. Bad news does the opposite!"
      },
      {
        id: 3,
        question: "What is 'Diversification' in investing?",
        options: [
          "Spreading your money across many different investments to lower risk.",
          "Putting all of your money into one single trendy stock.",
          "Withdrawing all your cash to hide in a tree."
        ],
        correctAnswerIndex: 0,
        explanation: "Diversification is the golden rule of investing: 'Don't put all your eggs in one basket!' If one company fails, your other investments protect you."
      },
      {
        id: 4,
        question: "What is a 'dividend' paid by some companies?",
        options: [
          "A math operation taught in high school.",
          "A tax paid to the local city council.",
          "A portion of a company's profits paid directly back to its shareholders as cash."
        ],
        correctAnswerIndex: 2,
        explanation: "Some successful, stable companies share their earnings by sending regular cash payments (dividends) directly to their stock owners!"
      },
      {
        id: 5,
        question: "What is the difference between a 'Bull Market' and a 'Bear Market'?",
        options: [
          "A Bull Market is only for farming companies; a Bear Market is for honey companies.",
          "A Bull Market means prices are rising; a Bear Market means prices are falling.",
          "They are named after the favorite pets of the stock exchange president."
        ],
        correctAnswerIndex: 1,
        explanation: "A Bull market charges ahead with rising stock prices and strong investor confidence. A Bear market hibernates with falling stock prices!"
      },
      {
        id: 6,
        question: "What is an Index Fund or ETF (Exchange Traded Fund)?",
        options: [
          "A single investment that bundles hundreds of different company stocks together to spread risk.",
          "A government lottery ticket.",
          "A loan you give to the local arcade."
        ],
        correctAnswerIndex: 0,
        explanation: "An index fund (like an S&P 500 fund) lets you invest in hundreds of top companies at once, giving you instant diversification with low fees!"
      },
      {
        id: 7,
        question: "What is a Stock Exchange (such as the NYSE or NASDAQ)?",
        options: [
          "An organized marketplace where buyers and sellers trade shares of public corporations.",
          "A store where you exchange broken merchandise.",
          "A bank that only accepts gold bars."
        ],
        correctAnswerIndex: 0,
        explanation: "Stock exchanges are digital and physical hubs that connect investors worldwide to buy and sell company shares safely and transparently!"
      },
      {
        id: 8,
        question: "What does 'buy low and sell high' mean in stock investing?",
        options: [
          "Buying shares when the price is lower and selling them later when the value increases to earn a profit.",
          "Buying stocks on tall buildings and selling them on the ground floor.",
          "Purchasing shares only in the early morning."
        ],
        correctAnswerIndex: 0,
        explanation: "The core principle of capital gains: when you purchase shares at a bargain price and sell them at a higher valuation, the difference is your investment profit!"
      }
    ]
  },
  {
    id: "m9",
    title: "Paychecks & Taxes",
    subtitle: "The Shrinking Paystub",
    description: "Crack open a real paycheck stub! Discover where your tax money goes (like parks, schools, and roads) and see taxes at work.",
    category: "earning",
    estimatedMinutes: 6,
    xpReward: 130,
    coinReward: 65,
    badge: {
      id: "b9",
      title: "Civic Champion",
      description: "Decoded a pay stub and funded essential public community projects.",
      icon: "Map",
      color: "text-indigo-500 bg-indigo-50 border-indigo-200"
    },
    quizzes: [
      {
        id: 1,
        question: "Where do taxes deducted from your paycheck actually go?",
        options: [
          "They are destroyed and thrown away.",
          "Directly to the bank's secret prize vault.",
          "To the government to pay for public goods like schools, parks, and roads."
        ],
        correctAnswerIndex: 2,
        explanation: "Taxes are pooled together to pay for shared public services that benefit everyone, such as police, libraries, highways, and national parks."
      },
      {
        id: 2,
        question: "Which of these is typically funded by local sales or property taxes?",
        options: [
          "Public fire departments, public schools, and community playgrounds.",
          "Private vacation tickets for city officials.",
          "Sweets and snacks at local grocery stores."
        ],
        correctAnswerIndex: 0,
        explanation: "Local property and sales taxes are used directly in your community to fund schools, maintain city roads, and pay our local heroes like firefighters!"
      },
      {
        id: 3,
        question: "What is FICA on a paycheck stub?",
        options: [
          "A bonus coupon for arcade games.",
          "A tax that funds Social Security (retirement) and Medicare (healthcare for seniors).",
          "The name of the company owner."
        ],
        correctAnswerIndex: 1,
        explanation: "FICA is the Federal Insurance Contributions Act. It's a special tax that is put away to help pay for retirement and medical care for seniors and people with disabilities!"
      },
      {
        id: 4,
        question: "What is 'progressive taxation'?",
        options: [
          "A tax that only applies to high-tech companies.",
          "A tax system that changes every month.",
          "A tax system where tax rates increase as your income increases."
        ],
        correctAnswerIndex: 2,
        explanation: "In a progressive tax system, people with higher incomes pay a higher percentage rate of tax, ensuring those who make more contribute a larger share to public resources."
      },
      {
        id: 5,
        question: "What is a W-2 form?",
        options: [
          "An annual tax form showing your total earnings and the taxes withheld from your pay.",
          "A permission slip to work on weekends.",
          "A form used to open a new checking account."
        ],
        correctAnswerIndex: 0,
        explanation: "Every January, employers send workers a W-2 form. It summarizes exactly how much you earned and how much tax you paid the previous year, which is crucial for filling out tax returns!"
      },
      {
        id: 6,
        question: "What is 'Sales Tax' when purchasing an item in a store?",
        options: [
          "A percentage added by state or city governments to the retail price of goods and services.",
          "A fee charged to use the shopping cart.",
          "A discount applied on Mondays."
        ],
        correctAnswerIndex: 0,
        explanation: "Sales tax is collected by retailers at the cash register on behalf of state and local governments to fund community services like road maintenance and police!"
      },
      {
        id: 7,
        question: "What is the role of the IRS (Internal Revenue Service) in the United States?",
        options: [
          "The federal agency responsible for collecting federal income taxes and administering tax laws.",
          "A private company that manufactures dollar coins.",
          "The international bank for rocket scientists."
        ],
        correctAnswerIndex: 0,
        explanation: "The IRS is the government bureau that processes tax returns, audits filings, and collects revenue used to fund federal government operations!"
      },
      {
        id: 8,
        question: "What is a 'Tax Deduction' or 'Tax Credit'?",
        options: [
          "An allowable reduction in your taxable income or total tax liability that lowers how much tax you owe.",
          "A fine you pay for filing taxes too early.",
          "A gift card given to tax accountants."
        ],
        correctAnswerIndex: 0,
        explanation: "Tax deductions reduce your taxable income (e.g., student loan interest or charitable donations), saving you money on your tax bill!"
      }
    ]
  },
  {
    id: "m10",
    title: "Giving Back",
    subtitle: "The Power of Philanthropy",
    description: "Learn how to use your wealth to make a difference. Donate your accumulated virtual coins to rebuild and upgrade your community!",
    category: "saving",
    estimatedMinutes: 5,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b10",
      title: "Philanthropist",
      description: "Shared wealth to support charities and improve the local community.",
      icon: "Heart",
      color: "text-pink-500 bg-pink-50 border-pink-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What does the word 'Philanthropy' mean?",
        options: [
          "The study of ancient giant dinosaurs.",
          "Printing paper money at high speeds.",
          "Giving money, items, time, or skills to help others and do good in the world."
        ],
        correctAnswerIndex: 2,
        explanation: "Philanthropy is about generosity. It's the active desire to help others, whether through money, donating toys, or volunteering your hours!"
      },
      {
        id: 2,
        question: "Why do people and businesses choose to donate to charity?",
        options: [
          "Because they are forced to do so by local banks.",
          "To make the community stronger, healthier, and support causes they care about.",
          "Simply to get rid of heavy paper bills."
        ],
        correctAnswerIndex: 1,
        explanation: "Donating helps charities feed the hungry, rescue stray animals, heal patients, and protect nature, creating a safer and happier world for all."
      },
      {
        id: 3,
        question: "How can a middle school student practice philanthropy if they don't have any money to give?",
        options: [
          "Volunteer time at a local shelter, donate old books/toys, or help a neighbor.",
          "They cannot participate at all.",
          "Borrow massive sums of credit card debt to donate."
        ],
        correctAnswerIndex: 0,
        explanation: "Philanthropy is about your heart! Donating gently used clothes, books, toys, or volunteering your time to help clean a park are all incredible ways to give back!"
      },
      {
        id: 4,
        question: "What is a 'nonprofit organization' or charity?",
        options: [
          "A business that has failed and makes no sales.",
          "A bank that doesn't charge interest.",
          "An organization set up to help the public or a cause, where all money goes back to that mission instead of making owners rich."
        ],
        correctAnswerIndex: 2,
        explanation: "Nonprofit organizations focus entirely on public benefit or helping a specific cause. They do not have private owners earning profits; all extra funds go to their charitable work!"
      },
      {
        id: 5,
        question: "What is an 'endowment'?",
        options: [
          "A donated fund of money that is kept and invested, so the interest can support a charity forever.",
          "An annual tax paid on wild animals.",
          "The act of buying a large public building."
        ],
        correctAnswerIndex: 0,
        explanation: "An endowment is a financial gift invested to grow over time. The charity only spends the earned investment returns, ensuring the gift funds their mission forever!"
      },
      {
        id: 6,
        question: "What is a 'Corporate Matching Gift' program?",
        options: [
          "When a company pledges to match (double) the charitable donations made by its employees.",
          "When coworkers wear the exact same clothes to work.",
          "A game played at company holiday parties."
        ],
        correctAnswerIndex: 0,
        explanation: "Many generous employers double the impact of employee charity donations dollar-for-dollar through matching gift programs!"
      },
      {
        id: 7,
        question: "Why should donors research a charity or nonprofit before sending money?",
        options: [
          "To verify that the majority of donations go directly to program causes rather than excessive overhead or scams.",
          "To check if the charity has a cool theme song.",
          "Because donating to unapproved charities is illegal."
        ],
        correctAnswerIndex: 0,
        explanation: "Using rating resources (like Charity Navigator) ensures your donations are managed transparently and used effectively to help real people and causes!"
      },
      {
        id: 8,
        question: "What is an 'In-Kind Donation'?",
        options: [
          "Donating physical goods, food, supplies, or professional services rather than cash.",
          "A donation given with a polite thank you card.",
          "A donation that must be repaid next year."
        ],
        correctAnswerIndex: 0,
        explanation: "In-kind donations provide direct goods and services (like canned food for food pantries, clothes for shelters, or free medical care) instead of cash!"
      }
    ]
  }
];

export const AVATAR_ITEMS: AvatarItem[] = [
  // Hats
  { id: "h1", name: "Party Cone", category: "hat", cost: 50, asset: "🥳", color: "from-pink-400 to-rose-400" },
  { id: "h2", name: "Chef's Toque", category: "hat", cost: 80, asset: "👨‍🍳", color: "from-slate-200 to-gray-300" },
  { id: "h3", name: "Detective Fedora", category: "hat", cost: 150, asset: "🕵️‍♂️", color: "from-amber-700 to-amber-900" },
  { id: "h4", name: "Space Helmet", category: "hat", cost: 300, asset: "🧑‍🚀", color: "from-cyan-100 to-blue-200" },
  
  // Glasses
  { id: "g1", name: "Classic Specs", category: "glasses", cost: 40, asset: "👓", color: "from-blue-500 to-indigo-600" },
  { id: "g2", name: "Cool Shades", category: "glasses", cost: 75, asset: "🕶️", color: "from-slate-800 to-slate-950" },
  { id: "g3", name: "Cyber Goggles", category: "glasses", cost: 200, asset: "🥽", color: "from-lime-400 to-emerald-500" },

  // Clothing
  { id: "c1", name: "Tie-Dye Shirt", category: "clothing", cost: 90, asset: "👕", color: "from-teal-300 to-purple-400" },
  { id: "c2", name: "Hero Cape", category: "clothing", cost: 180, asset: "🦸‍♂️", color: "from-red-500 to-orange-600" },
  { id: "c3", name: "Golden Bling", category: "clothing", cost: 250, asset: "🪙", color: "from-yellow-400 to-amber-500" },

  // Companions
  { id: "p1", name: "Golden Pup", category: "companion", cost: 250, asset: "🐶", color: "from-orange-200 to-yellow-300" },
  { id: "p2", name: "Baby Dragon", category: "companion", cost: 500, asset: "🐉", color: "from-emerald-400 to-teal-500" },
  { id: "p3", name: "Micro Drone", category: "companion", cost: 350, asset: "🤖", color: "from-cyan-300 to-blue-500" }
];
