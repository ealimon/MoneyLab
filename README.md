# ⚡ MoneyLab

An interactive, gamified financial simulation lab designed specifically for middle school students (Grades 6–8, ages 11–14). MoneyLab features 10 comprehensive educational modules, dynamic simulations (compound interest calculators, stock market simulators, paycheck tax breakdowns, and 50/30/20 budget planners), progress tracking, mastery certificates, a customizable student avatar, and the **MoneyLab AI Advisor** powered by Gemini.

---

## 🚀 One-Click Deployments

Teachers, students, and educators can launch their own live instance of MoneyLab with a single click. 

Since this application uses a full-stack architecture (Express + React) to securely query the Gemini API, choose one of the platforms below to deploy:

### Option 1: Deploy to Render (Recommended)
Render natively builds and deploys Node.js and React applications. It will auto-detect the `package.json` scripts.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/salimox/MoneyLab)

### Option 2: Deploy to Railway
Railway boots Node.js applications instantly.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/salimox/MoneyLab)

---

## 🔑 AI Assistant Configuration (Optional)
This application includes the **MoneyLab AI Advisor**.
- **Without an API Key**: The app runs in **High-Fidelity Fallback Mode**, providing robust, educational answers to common questions about savings, taxes, budgets, credit, and stocks. This is safe, offline-capable, and ideal for school environments.
- **With an API Key**: To enable real-time, dynamic AI conversations, add the `GEMINI_API_KEY` environment variable in your Render or Railway dashboard during or after deployment.

---

## 🧪 Features

- **10 Interactive Modules**: Earning & Careers, Budgeting (50/30/20 Rule), Saving (Compound Interest), Investing (Stocks & Diversification), Debt & Credit Cards, Paychecks & Taxes, Consumer Smarts & Unit Pricing, Financial Goals, Career Pathways, and Philanthropy/Donations.
- **Interactive Simulation Labs**: High-fidelity simulators for exponential compound growth, active stock trading, paycheck deduction breakdowns, and budget sliders.
- **Gamified Progression**: Earn Stars, complete quizzes, and unlock mastery badges as modules are finished.
- **Student Avatar Gear**: Customize your student avatar with unlocked hats, glasses, and accessories.
- **Official Diploma & Worksheets**: Generate printable, teacher-ready worksheets and the official MoneyLab Certificate of Mastery.
- **Classroom Safe**: Designed with high-contrast typography, engaging visuals, and an accessible layout.

---

## 🛠️ Local Development

If you'd like to run or test MoneyLab locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Setup
Clone the repository and install all dependencies:
```bash
git clone https://github.com/salimox/MoneyLab.git
cd MoneyLab
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Running the App
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build
To generate a production-ready optimized build:
```bash
npm run build
npm run start
```

