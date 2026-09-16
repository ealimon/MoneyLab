import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles, Sparkle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function FinnyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to MoneyLab! ⚡ I'm your AI Financial Advisor. Ask me anything about investing, 50/30/20 budgeting, stock market volatility, or decoding your first paycheck!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_PROMPTS = [
    "How does compound interest work?",
    "Explain the 50/30/20 budget rule",
    "How do stock markets work?",
    "Why are taxes taken from paychecks?",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const getLocalFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("compound") || q.includes("interest") || q.includes("money tree") || q.includes("sprout")) {
      return "Compound interest is exponential growth! 📈 When you put money in a savings or investment account, you earn interest on your original deposit. Then in the next period, you earn interest on the deposit PLUS the previous interest. Over decades, this creates massive compounding wealth!";
    }
    if (q.includes("50/30/20") || q.includes("budget") || q.includes("needs") || q.includes("wants")) {
      return "The 50/30/20 rule is a world-class budgeting framework: 50% covers survival NEEDS (rent, groceries, utilities), 30% goes to WANTS (gaming, dining out, subscriptions), and 20% goes to SAVINGS and investing for long-term independence. 📊";
    }
    if (q.includes("stock") || q.includes("market") || q.includes("invest") || q.includes("share")) {
      return "Stocks represent fractional ownership of a company! 🏢 When you purchase a share, you own a piece of that business (like Apple, Tesla, or Nike). If company profits grow, your share value increases. Spreading your money across diverse sectors reduces your risk! 🚀";
    }
    if (q.includes("tax") || q.includes("paycheck") || q.includes("deduction") || q.includes("fcia") || q.includes("fica")) {
      return "Taxes fund public infrastructure! 🏛️ When you earn money, payroll withholdings like FICA (Social Security & Medicare) and income tax are deducted from your gross pay to maintain roads, schools, hospitals, and emergency services.";
    }
    if (q.includes("save") || q.includes("piggy") || q.includes("allowance")) {
      return "Saving gives you freedom and options. By consistently putting away 20% of whatever you earn or receive, you build an emergency cushion and have capital ready to invest when great opportunities arise! 💼";
    }
    if (q.includes("credit") || q.includes("debt") || q.includes("borrow") || q.includes("card")) {
      return "Credit cards are short-term loans from financial institutions. 💳 If you pay off your full balance every month, you pay 0% interest. But if you only pay the minimum balance, high APR rates (often 20%+) will compound your debt rapidly. Always pay statements in full!";
    }
    if (q.includes("bank") || q.includes("check") || q.includes("debit")) {
      return "Banks safeguard your capital with FDIC insurance. 🏦 Checking accounts are designed for everyday transactions (via debit card and checks), while High-Yield Savings Accounts (HYSA) generate interest on your emergency reserves!";
    }
    if (q.includes("give") || q.includes("donate") || q.includes("charity") || q.includes("philanthr")) {
      return "Philanthropy is investing in community solutions! ❤️ Allocating a portion of your income to non-profits and causes you believe in creates lasting positive social impact and cultivates disciplined financial gratitude.";
    }
    if (q.includes("barter") || q.includes("origin") || q.includes("cash") || q.includes("history")) {
      return "Before currency existed, people relied on direct bartering (e.g. trading grain for tools). Currency solved the 'double coincidence of wants' by providing a durable, portable, and universally accepted medium of exchange. 🪙";
    }
    if (q.includes("earn") || q.includes("job") || q.includes("career") || q.includes("salary")) {
      return "Your earning potential scales with your specialized skills! Whether in software engineering, healthcare, design, or entrepreneurship, investing in your own education and abilities provides the highest return on investment. 💡";
    }

    return "Great financial inquiry! In MoneyLab, our core pillars are: (1) Invest in valuable skills, (2) budget with the 50/30/20 rule, (3) leverage compound interest, and (4) avoid high-APR debt. What other topic would you like to investigate?";
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // If running statically on GitHub Pages, directly use local response to bypass server dependency
    const isStaticHost = window.location.hostname.endsWith("github.io") || window.location.hostname.includes("localhost") === false && window.location.hostname.includes(".run") === false;

    if (isStaticHost) {
      setTimeout(() => {
        const fallbackText = getLocalFallbackResponse(textToSend);
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fallbackText,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setLoading(false);
      }, 750);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "Connection glitch. Let's analyze that financial question again!",
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackText = getLocalFallbackResponse(textToSend);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fallbackText || "Network sync error. Always remember: starting your compound savings early is the highest-leverage financial move you can make! Try asking again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="finny-trigger"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-slate-900 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-amber-400 group cursor-pointer"
          >
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-amber-300 font-display">
              MoneyLab AI Coach
            </span>
            <MessageSquare className="w-5 h-5 text-amber-400" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="finny-chatbox"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl border-2 border-black w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-950 text-white p-4 flex items-center justify-between shadow-md border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black text-lg border border-black shadow-[2px_2px_0px_0px_#000]">
                  ⚡
                </div>
                <div>
                  <h3 className="font-black text-base tracking-wide font-display text-white">MoneyLab AI Advisor</h3>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold font-mono">
                    <Sparkles className="w-3 h-3 animate-pulse text-amber-400" />
                    SIMULATION COACH • ONLINE
                  </div>
                </div>
              </div>
              <button
                id="close-finny"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm sm:text-base leading-relaxed ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white rounded-br-none font-medium shadow-sm border border-slate-800"
                        : "bg-white text-slate-800 border-2 border-slate-200 rounded-bl-none shadow-sm font-medium"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                    <span className="text-base animate-spin">⚡</span>
                    <span className="text-sm text-slate-500 font-bold italic">MoneyLab AI is formulating analysis...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-slate-100 bg-white space-y-1.5">
                <p className="text-xs sm:text-sm text-slate-500 font-bold px-1 flex items-center gap-1">
                  <Sparkle className="w-3.5 h-3.5 text-amber-500" /> Suggestions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      id={`suggest-${prompt.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-xs sm:text-sm bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-200 transition-all text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center"
            >
              <input
                id="finny-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me a money question..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium"
              />
              <button
                id="send-to-finny"
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 text-white p-2.5 rounded-xl transition-all shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
