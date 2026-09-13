import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client safely (handle missing keys gracefully)
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });
      console.log("Gemini API client initialized successfully.");
    } catch (e) {
      console.error("Failed to initialize Gemini API client:", e);
    }
  } else {
    console.log("No valid GEMINI_API_KEY found, running AI in educational fallback mode.");
  }

  // AI Finny Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Missing or invalid messages array" });
      }

      if (!ai) {
        // High-fidelity fallback simulated advisor if key is absent or pending user setup
        const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
        let responseText = "Welcome to MoneyLab! ⚡ I'm your AI Financial Advisor. ";
        
        if (lastUserMessage.includes("budget") || lastUserMessage.includes("50/30/20")) {
          responseText += "The 50/30/20 rule is the gold standard for personal budgeting: 50% of your take-home pay covers Needs (housing, utilities, groceries), 30% goes to Wants (streaming services, gaming, eating out), and 20% goes straight into Savings & Investments. Sticking to this ratio gives you financial freedom without sacrificing fun!";
        } else if (lastUserMessage.includes("interest") || lastUserMessage.includes("compound") || lastUserMessage.includes("save")) {
          responseText += "Compound interest is mathematical acceleration! When you deposit money into an interest-bearing account, you earn interest on your initial deposit. The next cycle, you earn interest on your principal PLUS all previous interest. Over 10 to 30 years, this exponential curve turns modest monthly savings into substantial wealth!";
        } else if (lastUserMessage.includes("stock") || lastUserMessage.includes("invest") || lastUserMessage.includes("market")) {
          responseText += "A stock represents fractional ownership in a publicly traded corporation. If the company innovates and grows profits, the share price rises and may pay dividends. Because individual stocks carry risk, seasoned investors use 'diversification'—spreading capital across index funds or multiple industries to minimize risk.";
        } else if (lastUserMessage.includes("tax") || lastUserMessage.includes("paycheck")) {
          responseText += "When you look at your first paystub, your Gross Pay is reduced by mandatory tax deductions: Federal & State income tax, plus FICA (Social Security & Medicare). These contributions directly fund public infrastructure, emergency services, civic parks, and retirement safety nets.";
        } else if (lastUserMessage.includes("credit") || lastUserMessage.includes("debt") || lastUserMessage.includes("card")) {
          responseText += "A credit card provides a revolving line of short-term credit from a bank. If you pay the entire statement balance each month before the due date, you pay zero interest! But if you only pay the minimum payment, high APRs (often 20%+) will compound your balance, locking you in costly debt.";
        } else {
          responseText += "Great question! In MoneyLab, we focus on real-world financial independence: earning through valuable skills, executing a 50/30/20 budget, harnessing compound interest, and avoiding high-APR debt traps. What concept would you like to explore deeper?";
        }
        return res.json({ text: responseText });
      }

      // Convert messages to history and latest
      const chatHistory = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));
      const latestMessage = messages[messages.length - 1]?.content || "Hello!";

      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: "You are the MoneyLab AI Advisor, a sharp, encouraging, and tech-savvy financial literacy coach for middle school students (Grades 6–8, ages 11–14). Explain financial concepts (50/30/20 budgeting, compound interest formulas, stock market mechanics, paycheck withholdings, credit APR vs minimum payments, unit pricing) in clear, mature, relatable terms. Use examples like saving for laptops or gaming consoles, evaluating subscription costs, or running a lawn-mowing or coding side gig. Keep answers concise (1-3 short paragraphs), engaging, and empower the student with real financial wisdom.",
        },
        history: chatHistory
      });

      const response = await chat.sendMessage({ message: latestMessage });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to contact MoneyLab AI Advisor" });
    }
  });

  // Serve static assets in production, else let Vite handle it in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Financial Literacy Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup crashed:", err);
});
