import React, { useState } from "react";
import { Award, Printer, X, Sparkles, CheckCircle } from "lucide-react";
import { UserProgress } from "../types";

interface JuniorSaverCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export default function JuniorSaverCertificateModal({
  isOpen,
  onClose,
  progress
}: JuniorSaverCertificateModalProps) {
  const [studentName, setStudentName] = useState("Junior Financial Champion");
  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] w-full max-w-3xl overflow-hidden relative print:border-none print:shadow-none print:max-w-none">
        
        {/* Modal Top Control Bar - Hidden on print */}
        <div className="bg-amber-300 border-b-4 border-black p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-black font-display text-base sm:text-lg text-slate-950 uppercase tracking-wide">
              Official MoneyLab Diploma
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-100 text-black font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" /> Print Certificate
            </button>
            <button
              onClick={onClose}
              className="bg-rose-400 hover:bg-rose-500 text-black p-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-10 bg-[#fffdf7] relative text-center">
          {/* Decorative Border Frame */}
          <div className="border-4 border-double border-amber-600/80 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 shadow-inner">
            
            {/* Certificate Header */}
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-black border-2 border-black px-4 py-1 rounded-full font-black text-xs font-display tracking-widest uppercase shadow-[2px_2px_0px_0px_#000]">
                ⚡ MoneyLab Academy of Finance ⚡
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight pt-2">
                CERTIFICATE OF MASTERY
              </h1>
              <p className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider font-display">
                Middle School Financial Literacy & Wealth Management
              </p>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-600 italic">
              This official diploma is proudly presented to
            </p>

            {/* Editable Name Field */}
            <div className="my-4 max-w-md mx-auto print:border-b-2 print:border-black">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-center text-2xl sm:text-3xl font-black font-display text-slate-900 border-b-2 border-dashed border-amber-400 bg-transparent focus:outline-none focus:border-amber-600 pb-1"
                placeholder="Student Name"
              />
              <span className="text-[10px] text-slate-400 block mt-1 font-bold print:hidden">
                (Click text above to customize student name)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed font-medium">
              for outstanding achievement, mathematical reasoning, and practical mastery across the 
              <strong> 10 Real-World Finance Modules</strong>, including career paychecks & taxes, 
              50/30/20 budgeting, compound interest growth, banking & checks, credit debt defense, and stock market simulation!
            </p>

            {/* Stats row */}
            <div className="my-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                <span className="text-lg">⭐</span>
                <p className="text-xs font-black font-display text-slate-900">{progress.coins} Stars/Coins</p>
              </div>
              <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                <span className="text-lg">📚</span>
                <p className="text-xs font-black font-display text-slate-900">{progress.completedModules.length} of 10 Done</p>
              </div>
              <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                <span className="text-lg">🏅</span>
                <p className="text-xs font-black font-display text-slate-900">{progress.badges.length} Badges</p>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="mt-8 pt-6 border-t-2 border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              <div className="text-left">
                <p className="text-sm font-black font-display text-slate-900 border-b-2 border-slate-900 pb-1 w-44 text-center">
                  MoneyLab Director ⚡
                </p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mt-1">
                  Simulation & Curriculum
                </p>
              </div>

              {/* Gold Seal */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 border-4 border-amber-700 flex flex-col items-center justify-center text-center shadow-md rotate-[-6deg]">
                <span className="text-xs font-black text-amber-950 uppercase tracking-tighter leading-none">
                  OFFICIAL
                </span>
                <Award className="w-6 h-6 text-amber-950 my-0.5" />
                <span className="text-[9px] font-black text-amber-950 uppercase tracking-tighter leading-none">
                  SEAL 2026
                </span>
              </div>

              <div className="text-right">
                <p className="text-sm font-black font-display text-slate-900 border-b-2 border-slate-900 pb-1 w-44 text-center">
                  {todayDate}
                </p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mt-1">
                  Date Certified
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
