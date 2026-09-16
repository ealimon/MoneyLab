import React, { useState } from "react";
import { Printer, CheckCircle, Eye, EyeOff, Sparkles, Award } from "lucide-react";

interface WorksheetQuestion {
  id: string;
  type: "text" | "choice";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

interface ModuleWorksheetProps {
  moduleId: string;
  moduleTitle: string;
  moduleSubtitle: string;
  moduleCategory: string;
}

const WORKSHEET_DATA: Record<string, WorksheetQuestion[]> = {
  m1: [
    {
      id: "q1",
      type: "text",
      question: "If you trade a backpack directly for a jacket without using any coins or cash, what is this practice called?",
      correctAnswer: "Bartering",
      explanation: "Trading goods or services directly without using money is called bartering."
    },
    {
      id: "q2",
      type: "text",
      question: "Explain the term 'Double Coincidence of Wants' in your own words.",
      correctAnswer: "Finding someone who has what you want and wants what you have.",
      explanation: "This is the primary hurdle of bartering—both traders must desire what the other person is offering."
    },
    {
      id: "q3",
      type: "choice",
      question: "Why are metal coins or paper money better for trading than heavy cows or giant stones?",
      options: [
        "Coins are heavy and hard to lose.",
        "They are lightweight, durable, easy to carry, and have standard divided values.",
        "They can be eaten in an emergency."
      ],
      correctAnswer: "They are lightweight, durable, easy to carry, and have standard divided values.",
      explanation: "Money must serve as a portable, divisible, and durable store of value."
    },
    {
      id: "q4",
      type: "choice",
      question: "True or False: Before modern cash existed, people in different parts of the world used salt, cocoa beans, or seashells as currency.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "These are called commodity monies. Anything scarce and universally desired can temporarily act as currency!"
    },
    {
      id: "q5",
      type: "text",
      question: "Trade Math: If 1 bushel of wheat is worth 4 chickens in trade, how many chickens would a farmer need to trade for 3 bushels of wheat?",
      correctAnswer: "12 chickens",
      explanation: "Multiply the bushels by the exchange rate: 3 bushels * 4 chickens = 12 chickens."
    },
    {
      id: "q6",
      type: "choice",
      question: "What gives modern 'Fiat Currency' (such as US paper dollar bills) its purchasing power value?",
      options: [
        "Government backing and mutual public trust that it will always be accepted.",
        "It is made of pure solid silver and gold threads.",
        "Each dollar bill can be redeemed for a real chicken at the bank."
      ],
      correctAnswer: "Government backing and mutual public trust that it will always be accepted.",
      explanation: "Fiat money has value because the government declares it legal tender and society mutually trusts it."
    }
  ],
  m2: [
    {
      id: "q1",
      type: "text",
      question: "If an employee earns an hourly wage of $15 and works 10 hours, what is their Gross Pay?",
      correctAnswer: "$150",
      explanation: "Gross Pay is calculated by multiplying hours worked by the hourly rate: 10 hours * $15/hour = $150."
    },
    {
      id: "q2",
      type: "text",
      question: "Why is your Net Pay (take-home pay) smaller than your Gross Pay?",
      correctAnswer: "Taxes and other deductions are subtracted.",
      explanation: "Governments deduct income tax, payroll taxes (FICA), and other benefits from your gross earnings."
    },
    {
      id: "q3",
      type: "choice",
      question: "Why do specialized careers like surgeons or software architects usually have higher average salaries?",
      options: [
        "Because they work in taller buildings.",
        "They require years of training, advanced degrees, and are in high demand but low supply.",
        "It is determined purely by lottery."
      ],
      correctAnswer: "They require years of training, advanced degrees, and are in high demand but low supply.",
      explanation: "High barrier to entry (education) paired with strong demand drives salaries higher."
    },
    {
      id: "q4",
      type: "choice",
      question: "What is the term for a fixed, guaranteed annual amount paid to an employee, regardless of how many hours they work?",
      options: ["Hourly wage", "Salary", "Commission"],
      correctAnswer: "Salary",
      explanation: "A salary is a fixed annual sum, usually paid weekly or monthly, rather than an hourly wage."
    },
    {
      id: "q5",
      type: "text",
      question: "Paycheck Math: Maria earns $20/hr and works 15 hours this week. If $45 is deducted for taxes and insurance, what is her Net Pay?",
      correctAnswer: "$255",
      explanation: "Gross Pay = 15 hrs * $20 = $300. Net Pay = $300 - $45 deductions = $255 take-home pay."
    },
    {
      id: "q6",
      type: "choice",
      question: "Which of the following is considered an 'Employer-Provided Benefit' alongside your base wage?",
      options: [
        "Health insurance coverage and 401(k) retirement contributions.",
        "The mandatory brand of sneakers you must wear.",
        "A homework assignment due every Friday."
      ],
      correctAnswer: "Health insurance coverage and 401(k) retirement contributions.",
      explanation: "Benefits are valuable non-wage compensations like health insurance, paid time off, and retirement matching."
    }
  ],
  m3: [
    {
      id: "q1",
      type: "text",
      question: "According to the popular 50/30/20 rule, what percentage of your income should go toward Savings?",
      correctAnswer: "20%",
      explanation: "The rule splits income as: 50% for Needs, 30% for Wants, and 20% for Savings."
    },
    {
      id: "q2",
      type: "choice",
      question: "Classify the following items as a 'Need' or a 'Want': Electricity, Designer Sneakers, Emergency Medicine, Movie Ticket.",
      options: [
        "Needs: Electricity, Medicine | Wants: Sneakers, Movie Ticket",
        "Needs: Medicine, Movie Ticket | Wants: Electricity, Sneakers",
        "All are basic survival Needs."
      ],
      correctAnswer: "Needs: Electricity, Medicine | Wants: Sneakers, Movie Ticket",
      explanation: "Electricity and medicine are essential for survival and basic health. Sneakers and movies are for enjoyment."
    },
    {
      id: "q3",
      type: "text",
      question: "If you receive an allowance of $40, how much money should you allocate to your 'Wants' category under the 50/30/20 budget framework?",
      correctAnswer: "$12",
      explanation: "Wants get 30% of your budget: 30% of $40 is 0.30 * 40 = $12."
    },
    {
      id: "q4",
      type: "text",
      question: "Why is it critical to build and maintain an 'Emergency Fund' in your savings account?",
      correctAnswer: "To pay for unexpected life expenses without going into debt.",
      explanation: "Emergency funds cover surprises like phone repairs, medical bills, or job losses safely."
    },
    {
      id: "q5",
      type: "text",
      question: "Budget Math: If your monthly net pay is $500, calculate the exact dollar target for your Needs (50%) and Savings (20%).",
      correctAnswer: "Needs: $250, Savings: $100",
      explanation: "Needs = 50% of $500 = $250. Savings = 20% of $500 = $100. (Wants would be $150)."
    },
    {
      id: "q6",
      type: "choice",
      question: "If your monthly expenses exceed your income, which adjustment should you make first to balance your budget?",
      options: [
        "Cut back on non-essential Wants like dining out and gaming subscriptions.",
        "Stop buying essential groceries.",
        "Stop paying rent or utility bills."
      ],
      correctAnswer: "Cut back on non-essential Wants like dining out and gaming subscriptions.",
      explanation: "Wants are flexible and non-essential, making them the quickest and safest place to trim your budget."
    }
  ],
  m4: [
    {
      id: "q1",
      type: "text",
      question: "If you deposit $100 in a bank account that pays a 10% annual compound interest rate, how much total money will you have at the end of Year 1?",
      correctAnswer: "$110",
      explanation: "You earn 10% on $100, which is $10 interest, making the total $110."
    },
    {
      id: "q2",
      type: "choice",
      question: "In Year 2 of compounding, do you earn interest on just the original $100, or on the new $110 total?",
      options: [
        "Just the original $100.",
        "On the new $110 total (which includes your Year 1 interest).",
        "Neither; interest is only paid once."
      ],
      correctAnswer: "On the new $110 total (which includes your Year 1 interest).",
      explanation: "Compounding means earning interest on your previous interest! Year 2 interest will be 10% of $110 = $11."
    },
    {
      id: "q3",
      type: "text",
      question: "Why does starting to save at age 12 give you a massive compounding advantage over starting at age 40?",
      correctAnswer: "Your money has many more years to compound, snowball, and multiply.",
      explanation: "Time is the multiplier in compound interest. Extra decades create exponential, dramatic curves."
    },
    {
      id: "q4",
      type: "choice",
      question: "True or False: Keeping your cash tucked safely inside a physical piggy bank at home allows you to earn compound interest.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Piggy banks do not pay interest. Only bank accounts, bonds, or investments compound your money."
    },
    {
      id: "q5",
      type: "text",
      question: "Interest Math: If you put $200 in a high-yield savings account earning 5% annual interest, how much interest do you earn in Year 1?",
      correctAnswer: "$10 interest",
      explanation: "$200 * 0.05 = $10.00 in interest earned, giving a new total balance of $210."
    },
    {
      id: "q6",
      type: "choice",
      question: "Using the financial shortcut 'Rule of 72' (Years to double = 72 ÷ Interest Rate), about how many years will it take money to double at 8% interest?",
      options: [
        "9 years (72 ÷ 8 = 9)",
        "24 years",
        "72 years"
      ],
      correctAnswer: "9 years (72 ÷ 8 = 9)",
      explanation: "The Rule of 72 reveals that 72 divided by the 8% interest rate equals roughly 9 years to double."
    }
  ],
  m5: [
    {
      id: "q1",
      type: "text",
      question: "If a 12-ounce bottle of fruit juice costs $3.60, what is its Unit Price per single ounce?",
      correctAnswer: "$0.30 / oz",
      explanation: "Divide the total price by the number of ounces: $3.60 / 12oz = $0.30 per ounce."
    },
    {
      id: "q2",
      type: "choice",
      question: "Brand A costs $4.00 for 16oz. Brand B costs $4.50 for 18oz. Which brand represents the smarter financial bargain based on unit price?",
      options: [
        "Brand A ($0.25 / oz)",
        "Brand B ($0.25 / oz) - they are equal in value.",
        "Brand A because $4.00 is a lower price tag."
      ],
      correctAnswer: "Brand B ($0.25 / oz) - they are equal in value.",
      explanation: "Both cost exactly $0.25 per ounce! ($4.00/16 = $0.25, and $4.50/18 = $0.25). They are equal bargains."
    },
    {
      id: "q3",
      type: "text",
      question: "What is an 'impulse buy' and where do retail supermarkets strategically position items to trigger them?",
      correctAnswer: "An unplanned purchase, usually placed near checkout counters.",
      explanation: "Supermarkets put candies and toys at the register so you grab them while waiting in line."
    },
    {
      id: "q4",
      type: "choice",
      question: "How can a 'Buy One, Get One 50% Off' sale sometimes trick consumers into overspending?",
      options: [
        "It forces you to pay double tax.",
        "It encourages you to buy items you didn't need or want just because of the perceived discount.",
        "It is always a scam that charges full price."
      ],
      correctAnswer: "It encourages you to buy items you didn't need or want just because of the perceived discount.",
      explanation: "If you spend money on things you didn't plan to buy, you aren't saving money—you are spending more!"
    },
    {
      id: "q5",
      type: "text",
      question: "Unit Price Math: Cereal Brand X is 20oz for $5.00 ($0.25/oz). Brand Y is 10oz for $3.50 ($0.35/oz). How much do you save per ounce buying Brand X?",
      correctAnswer: "$0.10 per ounce",
      explanation: "Brand Y ($0.35) - Brand X ($0.25) = $0.10 saved per ounce on the larger box."
    },
    {
      id: "q6",
      type: "choice",
      question: "What is the '24-Hour Rule' that smart shoppers use before making expensive non-essential purchases?",
      options: [
        "Waiting 24 hours to let emotional impulses cool down before deciding whether to buy.",
        "Returning the product within 24 hours to get a free replacement.",
        "Shopping only between midnight and 1:00 AM."
      ],
      correctAnswer: "Waiting 24 hours to let emotional impulses cool down before deciding whether to buy.",
      explanation: "Taking 24 hours separates emotional impulses from genuine needs, preventing buyer's remorse."
    }
  ],
  m6: [
    {
      id: "q1",
      type: "text",
      question: "Where on a physical paper check do you write the name of the person or company you are paying?",
      correctAnswer: "On the 'Pay to the Order of' line.",
      explanation: "This specifies exactly who has authorization to deposit or cash the check."
    },
    {
      id: "q2",
      type: "text",
      question: "What is the purpose of the 9-digit routing number printed on the bottom-left corner of a check?",
      correctAnswer: "It identifies your specific bank so computers route the funds correctly.",
      explanation: "The routing number is like a zip code for banks, telling clearinghouses where to send the transaction."
    },
    {
      id: "q3",
      type: "choice",
      question: "What happens if you write a paper check for $100 but your checking account only holds $30?",
      options: [
        "The bank automatically gifts you $70.",
        "The check 'bounces' due to Non-Sufficient Funds (NSF) and you get charged a heavy fee.",
        "Nothing, the merchant simply waits until next month."
      ],
      correctAnswer: "The check 'bounces' due to Non-Sufficient Funds (NSF) and you get charged a heavy fee.",
      explanation: "Writing checks without matching funds is called 'bouncing' a check, leading to penalty overdraft fees."
    },
    {
      id: "q4",
      type: "choice",
      question: "True or False: A standard debit card swipe deducts money immediately from your bank checking account balance.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Debit cards are linked directly to your active checking account, removing funds almost instantly."
    },
    {
      id: "q5",
      type: "text",
      question: "Ledger Math: Your checking account balance is $80. You spend $25 on shoes with your debit card, then deposit a $45 gift check. What is your new balance?",
      correctAnswer: "$100",
      explanation: "Starting $80 - $25 expense + $45 deposit = $100.00 ending balance."
    },
    {
      id: "q6",
      type: "choice",
      question: "What independent U.S. government agency insures individual bank deposits up to $250,000 in case the bank fails?",
      options: [
        "FDIC (Federal Deposit Insurance Corporation)",
        "The Federal Bureau of Investigation (FBI)",
        "The Department of Motor Vehicles (DMV)"
      ],
      correctAnswer: "FDIC (Federal Deposit Insurance Corporation)",
      explanation: "The FDIC guarantees your deposited money up to $250,000 per depositor if an insured bank goes bankrupt."
    }
  ],
  m7: [
    {
      id: "q1",
      type: "choice",
      question: "True or False: A credit card works like free money from the government that requires no future repayments.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Credit cards are short-term loans from a bank. You must pay back everything you charge plus potential interest."
    },
    {
      id: "q2",
      type: "text",
      question: "What happens if you only pay the tiny 'Minimum Payment' on a $500 credit card bill every month?",
      correctAnswer: "The rest of the balance accumulates high interest, keeping you in debt for years.",
      explanation: "Paying only the minimum allows interest to snowball, making your purchase cost double or triple over time."
    },
    {
      id: "q3",
      type: "text",
      question: "What is a 'Credit Score' and why is it highly valuable when you grow up?",
      correctAnswer: "A score showing your trustworthiness at paying back debt, used to get loans with lower rates.",
      explanation: "It is like a financial GPA. High credit scores make borrowing cheaper for cars, mortgages, or businesses."
    },
    {
      id: "q4",
      type: "choice",
      question: "If you carry a credit card balance with an annual interest rate (APR) of 20%, you are paying:",
      options: [
        "A very low, safe rate.",
        "A very high, dangerous rate that will expand your debt quickly if unpaid.",
        "Zero fees, because credit cards are always free."
      ],
      correctAnswer: "A very high, dangerous rate that will expand your debt quickly if unpaid.",
      explanation: "Credit cards have some of the highest interest rates in finance, making carrying debt extremely expensive."
    },
    {
      id: "q5",
      type: "text",
      question: "Credit Card Math: If you charge a $60 dinner on your credit card and pay the full $60 statement before the monthly due date, how much interest is charged?",
      correctAnswer: "$0.00 (Zero interest)",
      explanation: "If you pay off your full statement balance on time each month, the grace period prevents any interest charges!"
    },
    {
      id: "q6",
      type: "choice",
      question: "What is the primary operational difference between a Debit Card and a Credit Card?",
      options: [
        "A debit card withdraws your own existing bank funds, while a credit card borrows funds that must be repaid.",
        "Debit cards only work in Canada.",
        "Credit cards are only made of paper."
      ],
      correctAnswer: "A debit card withdraws your own existing bank funds, while a credit card borrows funds that must be repaid.",
      explanation: "Debit is 'pay now with your money'; credit is 'pay later by taking a short-term bank loan'."
    }
  ],
  m8: [
    {
      id: "q1",
      type: "text",
      question: "What does it mean to own a single 'share of stock' in a public company?",
      correctAnswer: "You own a tiny fractional piece of that company.",
      explanation: "As a shareholder, you own a micro-part of the business and share in its profits or losses."
    },
    {
      id: "q2",
      type: "choice",
      question: "Why is putting 100% of your life savings into one hot stock considered highly risky?",
      options: [
        "Because stock brokers will steal it.",
        "If that single company goes bankrupt or struggles, you could lose all your money.",
        "Stocks are only open on holidays."
      ],
      correctAnswer: "If that single company goes bankrupt or struggles, you could lose all your money.",
      explanation: "No company is guaranteed to succeed. Concentrating your capital creates extreme vulnerability."
    },
    {
      id: "q3",
      type: "text",
      question: "Explain the golden investment concept of 'Diversification' in your own words.",
      correctAnswer: "Spreading your investments across many companies or categories to reduce risk.",
      explanation: "This is the classic rule: 'Don't put all your eggs in one basket.' If one fails, the others support you."
    },
    {
      id: "q4",
      type: "choice",
      question: "What drives stock prices to go up or down on the public stock exchange market?",
      options: [
        "Supply and demand, driven by company earnings news, economy trends, and investor outlook.",
        "The wind patterns in the Atlantic ocean.",
        "They only change at midnight randomly."
      ],
      correctAnswer: "Supply and demand, driven by company earnings news, economy trends, and investor outlook.",
      explanation: "Prices change because buyers and sellers bid based on their expectations of the company's future value."
    },
    {
      id: "q5",
      type: "text",
      question: "Stock Profit Math: You buy 5 shares of a robotics company at $20/share ($100 total). You sell them later at $26/share. What is your total profit?",
      correctAnswer: "$30 profit",
      explanation: "Sale total = 5 * $26 = $130. Profit = $130 - $100 = $30 (or $6 gain per share * 5 shares = $30)."
    },
    {
      id: "q6",
      type: "choice",
      question: "What is an 'Index Fund' (or ETF) and why do financial advisors recommend it for young investors?",
      options: [
        "It bundles shares of hundreds of different companies together for instant, low-cost diversification.",
        "It is a lottery ticket that guarantees 1000% returns.",
        "It is an exclusive membership card for Wall Street executives."
      ],
      correctAnswer: "It bundles shares of hundreds of different companies together for instant, low-cost diversification.",
      explanation: "An index fund spreads your investment across the whole market, dramatically reducing the risk of any single company failing."
    }
  ],
  m9: [
    {
      id: "q1",
      type: "text",
      question: "What does 'FICA' stand for on a standard paycheck stub, and what two public programs does it fund?",
      correctAnswer: "Federal Insurance Contributions Act; funds Social Security and Medicare.",
      explanation: "FICA is a payroll tax that funds Social Security (retirement) and Medicare (healthcare for seniors)."
    },
    {
      id: "q2",
      type: "choice",
      question: "List three core community infrastructure elements or services that are funded directly using tax dollars.",
      options: [
        "Netflix, private yachts, local toy shops.",
        "Public schools, municipal fire departments, public highways and parks.",
        "Fast food restaurants, arcade games, private apartments."
      ],
      correctAnswer: "Public schools, municipal fire departments, public highways and parks.",
      explanation: "Taxes pay for public goods that serve the general population and cannot be easily privatized."
    },
    {
      id: "q3",
      type: "text",
      question: "If your Gross Pay is $400, and your paycheck stub lists $40 for Federal Income Tax, $15 for State Tax, and $10 for FICA, what is your final Net Pay?",
      correctAnswer: "$335",
      explanation: "Net Pay = Gross Pay - Deductions. Net = $400 - ($40 + $15 + $10) = $400 - $65 = $335."
    },
    {
      id: "q4",
      type: "choice",
      question: "True or False: Only adults pay taxes; teenagers working part-time retail or restaurant jobs never pay any payroll taxes.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Anyone who earns wages is subject to federal, state, and payroll taxes, regardless of age!"
    },
    {
      id: "q5",
      type: "text",
      question: "Sales Tax Math: You purchase a $30 backpack in a city with a 6% sales tax. What is the total cost at checkout?",
      correctAnswer: "$31.80",
      explanation: "Tax amount = $30 * 0.06 = $1.80. Total price at register = $30 + $1.80 = $31.80."
    },
    {
      id: "q6",
      type: "choice",
      question: "Every April, workers file an annual tax return with the IRS. What happens if you had more tax withheld from your paychecks than you actually owed?",
      options: [
        "The government sends you a Tax Refund check for the difference.",
        "The government keeps the extra money as a permanent bonus.",
        "You are sent to tax school on weekends."
      ],
      correctAnswer: "The government sends you a Tax Refund check for the difference.",
      explanation: "A tax refund simply returns your own overpaid money back to your bank account."
    }
  ],
  m10: [
    {
      id: "q1",
      type: "text",
      question: "What does the word 'Philanthropy' mean?",
      correctAnswer: "Giving money, items, time, or skills to help others and improve the community.",
      explanation: "Philanthropy is the active effort to promote the welfare of others, often through generous donations."
    },
    {
      id: "q2",
      type: "choice",
      question: "How can a student practice philanthropy and give back without spending any physical money?",
      options: [
        "They cannot participate until they have a job.",
        "Volunteering time at animal shelters, donating old books/toys, or helping a neighbor.",
        "Borrowing money on a credit card to donate."
      ],
      correctAnswer: "Volunteering time at animal shelters, donating old books/toys, or helping a neighbor.",
      explanation: "Giving your time, energy, kindness, or gently used goods is a powerful, free form of philanthropy."
    },
    {
      id: "q3",
      type: "text",
      question: "What is a 'Non-profit Organization' or Charity?",
      correctAnswer: "An organization formed to help a cause rather than make money for owners.",
      explanation: "Non-profits use their excess funds directly to support social, environmental, or educational missions."
    },
    {
      id: "q4",
      type: "choice",
      question: "Why is donating a portion of your wealth or allowance considered a healthy financial habit?",
      options: [
        "Because it makes you look rich.",
        "It builds community connection, supports vital causes, and fosters healthy gratitude habits.",
        "It guarantees you will win the lottery."
      ],
      correctAnswer: "It builds community connection, supports vital causes, and fosters healthy gratitude habits.",
      explanation: "Generosity expands your worldview, helps others survive, and establishes a balanced, positive connection with wealth."
    },
    {
      id: "q5",
      type: "text",
      question: "Giving Budget Math: You earn $50 from weekend pet-sitting and allocate 10% to a local animal shelter. How much do you donate?",
      correctAnswer: "$5.00",
      explanation: "10% of $50 = 0.10 * $50 = $5.00 donated to the shelter."
    },
    {
      id: "q6",
      type: "choice",
      question: "Why do wise donors check independent charity evaluators (like Charity Navigator) before making large contributions?",
      options: [
        "To ensure the non-profit spends the majority of donor money on its core cause rather than excessive administrative overhead.",
        "To see if the charity hands out free televisions.",
        "Because it is required by the fire department."
      ],
      correctAnswer: "To ensure the non-profit spends the majority of donor money on its core cause rather than excessive administrative overhead.",
      explanation: "Evaluating charities ensures that your hard-earned money efficiently impacts real people and communities."
    }
  ]
};

export default function ModuleWorksheet({ moduleId, moduleTitle, moduleSubtitle, moduleCategory }: ModuleWorksheetProps) {
  const questions = WORKSHEET_DATA[moduleId] || [];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});

  const handleInputChange = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCheckAnswers = () => {
    const results: Record<string, boolean> = {};
    questions.forEach((q) => {
      const userAns = (answers[q.id] || "").trim().toLowerCase();
      const correctAns = q.correctAnswer.toLowerCase();
      
      if (q.type === "choice") {
        results[q.id] = userAns === correctAns;
      } else {
        // Simple keyword match for open response
        const keywords = correctAns.replace(/[$,%]/g, "").split(/\s+/).filter(w => w.length > 2);
        const match = keywords.some(kw => userAns.includes(kw)) || userAns.includes(correctAns);
        results[q.id] = match || userAns.length > 3; // Give credit for trying
      }
    });
    setCheckedAnswers(results);
    setCelebrated(true);
  };

  return (
    <div className="bg-white border-2 border-sky-100 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_0_0_#e0f2fe] space-y-6 text-left max-w-2xl mx-auto print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full print:space-y-3">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-sky-100 pb-5 gap-4 print:border-b-2 print:border-slate-900 print:pb-2 print:mb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest bg-sky-100 text-sky-700 px-3 py-1 rounded-full print:bg-slate-100 print:text-slate-900 print:border print:border-slate-800 font-mono print:text-[9px] print:px-2 print:py-0.5">
              MONEYLAB • {moduleCategory.toUpperCase()} WORKSHEET
            </span>
            {showAnswerKey && (
              <span className="hidden print:inline-block text-xs font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-800 px-2 py-0.5 rounded-full font-mono print:text-[9px]">
                TEACHER ANSWER KEY
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-sky-950 mt-2 font-display print:text-lg print:mt-1 print:text-black print:font-extrabold">{moduleTitle}</h2>
          <p className="text-sm text-sky-500 font-bold font-display print:text-[11px] print:text-slate-700 print:leading-tight">{moduleSubtitle}</p>
        </div>
        <div className="flex items-center gap-2 print:hidden shrink-0">
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-sm transition-colors"
          >
            {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAnswerKey ? "Hide Answers" : "Answer Key"}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm shadow-md transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Worksheet
          </button>
        </div>
      </div>

      {/* Classroom header inputs for printing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sky-50/50 p-4 rounded-2xl border border-sky-100/50 print:grid-cols-3 print:bg-transparent print:border-0 print:p-0 print:mb-2.5 print:gap-4">
        <div className="space-y-1 print:space-y-0.5">
          <label className="text-xs sm:text-sm font-black uppercase text-sky-600 font-display print:text-slate-900 print:text-[10px] block">Student Name:</label>
          <input
            type="text"
            placeholder="Write name here..."
            className="w-full bg-white border border-sky-100 rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-sky-950 placeholder:text-slate-300 focus:outline-sky-400 print:border-0 print:border-b-2 print:border-slate-800 print:rounded-none print:p-0 print:text-slate-900 print:font-bold print:h-6 print:text-xs"
          />
        </div>
        <div className="space-y-1 print:space-y-0.5">
          <label className="text-xs sm:text-sm font-black uppercase text-sky-600 font-display print:text-slate-900 print:text-[10px] block">Date:</label>
          <input
            type="text"
            defaultValue={new Date().toLocaleDateString()}
            className="w-full bg-white border border-sky-100 rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-sky-950 focus:outline-sky-400 print:border-0 print:border-b-2 print:border-slate-800 print:rounded-none print:p-0 print:text-slate-900 print:font-bold print:h-6 print:text-xs"
          />
        </div>
        <div className="space-y-1 print:space-y-0.5">
          <label className="text-xs sm:text-sm font-black uppercase text-sky-600 font-display print:text-slate-900 print:text-[10px] block">Score / Grade:</label>
          <div className="w-full bg-white border border-sky-100 rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-sky-950 print:border-0 print:border-b-2 print:border-slate-800 print:rounded-none print:p-0 print:text-slate-900 print:h-6 print:text-xs">
            _____ / 100
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6 pt-2 print:space-y-3 print:pt-0">
        {questions.map((q, idx) => {
          const isCorrect = checkedAnswers[q.id];
          return (
            <div key={q.id} className="space-y-3 print:space-y-1.5 print:break-inside-avoid print:page-break-inside-avoid print:mb-2.5 print:pb-2 print:border-b print:border-slate-200">
              <p className="text-base sm:text-lg font-black text-sky-950 leading-relaxed font-display flex gap-2.5 print:text-slate-900 print:text-xs print:font-bold print:leading-snug">
                <span className="bg-sky-100 text-sky-800 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 text-xs sm:text-sm font-black print:bg-slate-100 print:text-slate-900 print:border print:border-slate-800 print:w-5 print:h-5 print:text-[10px] print:rounded">
                  {idx + 1}
                </span>
                <span>{q.question}</span>
              </p>

              {q.type === "choice" ? (
                <div className="grid grid-cols-1 gap-2.5 pl-4 sm:pl-8 print:pl-6 print:gap-1.5">
                  {q.options?.map((opt) => {
                    const isSelected = answers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleInputChange(q.id, opt)}
                        className={`text-left px-4 py-3 rounded-xl text-sm sm:text-base font-semibold border-2 transition-all flex items-start gap-3 print:border-0 print:bg-transparent print:p-0.5 print:rounded-none ${
                          isSelected
                            ? "bg-sky-100 border-sky-400 text-sky-900 font-bold print:font-bold print:bg-slate-50"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 border-slate-400 mt-1 flex items-center justify-center text-[10px] shrink-0 print:border-slate-800 print:w-3.5 print:h-3.5 print:mt-0.5 ${isSelected ? "bg-sky-500 border-sky-500 text-white font-bold print:bg-slate-900 print:text-white" : ""}`}>
                          {isSelected ? "✓" : ""}
                        </span>
                        <span className="print:text-slate-900 print:text-[11px] print:leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="pl-4 sm:pl-8 print:pl-6 space-y-2 print:space-y-1">
                  <textarea
                    rows={2}
                    value={answers[q.id] || ""}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="Type your answer explanation here..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3.5 text-sm sm:text-base font-medium text-slate-700 placeholder:text-slate-300 focus:outline-sky-400 print:hidden"
                  />

                  {/* Print Typed Answer Box */}
                  {answers[q.id] ? (
                    <div className="hidden print:block p-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 bg-slate-50">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Student Answer:</p>
                      <p className="text-[11px] leading-snug">{answers[q.id]}</p>
                    </div>
                  ) : null}

                  {/* Print Lined Writing Area */}
                  <div className="hidden print:block space-y-2 pt-1">
                    <div className="border-b border-dashed border-slate-400 h-5" />
                    <div className="border-b border-dashed border-slate-400 h-5" />
                  </div>
                </div>
              )}

              {/* Verified Feedback / Success marker */}
              {celebrated && answers[q.id] && (
                <div className="pl-8 flex items-center gap-1.5 text-xs font-black print:hidden">
                  {isCorrect ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Checked! Stellar analysis.
                    </span>
                  ) : q.type === "choice" ? (
                    <span className="text-amber-600">
                      ⚠️ Give it another look! Let's check the core principle below.
                    </span>
                  ) : (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Checked! Thoughtful response.
                    </span>
                  )}
                </div>
              )}

              {/* Answer Key Override */}
              {(showAnswerKey || (celebrated && !isCorrect && q.type === "choice")) && (
                <div className="pl-8 pr-4 py-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-sm text-emerald-800 space-y-1 print:bg-slate-50 print:border-slate-800 print:text-black print:p-2 print:rounded-lg print:pl-6">
                  <p className="font-extrabold flex items-center gap-1.5 print:text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 print:text-slate-800" />
                    Correct Answer: <span className="font-black underline">{q.correctAnswer}</span>
                  </p>
                  <p className="text-xs text-emerald-700/95 font-medium leading-normal print:text-slate-700 print:text-[10px]">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer controls */}
      <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <button
          onClick={handleCheckAnswers}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl transition-all active:scale-95 text-sm uppercase tracking-wider font-display"
        >
          Verify & Submit Worksheet
        </button>

        {celebrated && (
          <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-200 px-4 py-2 rounded-2xl animate-bounce">
            <span className="text-lg">🙌</span>
            <span className="font-black text-yellow-800 text-sm font-display">
              Double High Five! Awarded 10 Fin-Coins!
            </span>
          </div>
        )}
      </div>

      {/* Print Footer Notice */}
      <div className="hidden print:block pt-2 border-t border-slate-300 text-center text-[9px] text-slate-500 font-mono">
        MoneyLab Financial Literacy Curriculum • Middle School Interactive Lab • Student Worksheet
      </div>

    </div>
  );
}
