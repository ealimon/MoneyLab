import React, { useState, useEffect } from "react";
import { Check, X, Award, ArrowRight, Sparkles, AlertCircle, RefreshCw, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Module, QuizQuestion } from "../types";
import { playSuccessChime } from "../utils/audio";

interface ModuleQuizProps {
  module: Module;
  onComplete: () => void;
}

// Utility: Fisher-Yates array shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Prepare dynamic session: pick 5 random questions and shuffle options
function prepareQuizSession(questions: QuizQuestion[], count = 5): QuizQuestion[] {
  if (!questions || questions.length === 0) return [];
  
  // 1. Shuffle full question bank & select up to `count` questions
  const shuffledPool = shuffleArray(questions);
  const selectedQuestions = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

  // 2. For each selected question, shuffle options while preserving the correct answer index
  return selectedQuestions.map((q) => {
    const correctAnswerText = q.options[q.correctAnswerIndex];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectAnswerIndex = shuffledOptions.indexOf(correctAnswerText);

    return {
      ...q,
      options: shuffledOptions,
      correctAnswerIndex: newCorrectAnswerIndex !== -1 ? newCorrectAnswerIndex : 0,
    };
  });
}

export default function ModuleQuiz({ module, onComplete }: ModuleQuizProps) {
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize randomized quiz session on mount or module change
  useEffect(() => {
    initNewQuiz();
  }, [module.id]);

  const initNewQuiz = () => {
    const prepared = prepareQuizSession(module.quizzes, 5);
    setSessionQuestions(prepared);
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setHasSubmitted(false);
    setQuizFinished(false);
    setScore(0);
  };

  const currentQuestion: QuizQuestion | undefined = sessionQuestions[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedAnswerIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIdx === null || hasSubmitted || !currentQuestion) return;
    setHasSubmitted(true);
    if (selectedAnswerIdx === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
      playSuccessChime();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < sessionQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswerIdx(null);
      setHasSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (!currentQuestion || sessionQuestions.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] p-8 border-2 border-sky-100 shadow-[0_8px_0_0_#e0f2fe] max-w-xl mx-auto text-center space-y-4">
        <p className="text-slate-500 font-bold">Loading quiz questions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-6 border-2 border-sky-100 shadow-[0_8px_0_0_#e0f2fe] max-w-xl mx-auto space-y-6">
      {!quizFinished ? (
        <div className="space-y-6">
          {/* Progress indicators & Dynamic Badge */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2.5 pb-3 border-b-2 border-sky-50">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-black text-sky-700 bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-full font-display uppercase tracking-wide">
                Question {currentQuestionIdx + 1} of {sessionQuestions.length}
              </span>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Shuffle className="w-3 h-3 text-indigo-500" /> Dynamic Pool ({module.quizzes.length} Questions)
              </span>
            </div>

            <div className="flex gap-1.5 self-end sm:self-center">
              {sessionQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 w-6 rounded-full transition-all duration-300 ${
                    idx < currentQuestionIdx
                      ? "bg-sky-500"
                      : idx === currentQuestionIdx
                      ? "bg-yellow-400 animate-pulse"
                      : "bg-sky-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1.5 text-left">
            <h3 className="font-black text-sky-950 text-xl sm:text-2xl leading-snug font-display">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswerIdx === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              
              let optionStyle = "border-sky-100 hover:border-sky-300 hover:bg-sky-50/20 bg-white text-slate-700 shadow-[0_4px_0_0_#e0f2fe] hover:shadow-[0_6px_0_0_#e0f2fe] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none";
              if (isSelected && !hasSubmitted) {
                optionStyle = "border-sky-400 bg-sky-50 text-sky-950 font-black shadow-[0_4px_0_0_#bae6fd]";
              } else if (hasSubmitted) {
                if (isCorrect) {
                  optionStyle = "border-green-300 bg-green-50 text-green-950 font-black shadow-[0_4px_0_0_#bbf7d0]";
                } else if (isSelected) {
                  optionStyle = "border-rose-300 bg-rose-50 text-rose-950 line-through font-bold shadow-none opacity-80";
                } else {
                  optionStyle = "border-slate-100 bg-slate-50/40 text-slate-400 shadow-none opacity-50 select-none";
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  disabled={hasSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full border-2 rounded-2xl px-5 py-4 text-left text-base sm:text-lg font-black transition-all flex justify-between items-center ${optionStyle}`}
                >
                  <span className="font-display leading-relaxed">{option}</span>
                  {hasSubmitted && isCorrect && <Check className="w-5 h-5 text-green-600 shrink-0 ml-2" />}
                  {hasSubmitted && isSelected && !isCorrect && <X className="w-5 h-5 text-rose-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation / Footer Actions */}
          <AnimatePresence mode="wait">
            {!hasSubmitted ? (
              <button
                id="submit-answer-btn"
                disabled={selectedAnswerIdx === null}
                onClick={handleSubmitAnswer}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-b-0 text-yellow-950 font-black py-4 rounded-2xl shadow-lg border-b-4 border-yellow-600 active:translate-y-0.5 transition-all text-base sm:text-lg font-display tracking-wider uppercase cursor-pointer disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-3 border-t-2 border-sky-50"
              >
                <div className="bg-sky-50 border-2 border-sky-100 p-4 sm:p-5 rounded-2xl flex items-start gap-3 text-left">
                  <AlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-black text-sky-500 uppercase tracking-wider font-display">Finny's Explanation:</p>
                    <p className="text-sm sm:text-base text-sky-900 leading-relaxed font-bold font-display">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                <button
                  id="next-quiz-btn"
                  onClick={handleNextQuestion}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black py-4 rounded-2xl shadow-lg border-b-4 border-yellow-600 active:translate-y-0.5 transition-all text-base sm:text-lg flex items-center justify-center gap-2 font-display uppercase tracking-wide cursor-pointer"
                >
                  {currentQuestionIdx < sessionQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz Completed Celebration Screen */
        <div className="text-center space-y-6 py-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse" />
            <span className="text-6xl relative z-10">🏆</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-sky-950 tracking-tight font-display">Lesson Mastered!</h3>
            <p className="text-sm text-slate-600 font-semibold">
              You scored <strong>{score} out of {sessionQuestions.length}</strong>! {score >= 4 ? "Outstanding work!" : "Great practice effort!"}
            </p>
          </div>

          {/* Badge Display */}
          <div className="bg-sky-50 border-2 border-sky-100 rounded-3xl p-5 max-w-sm mx-auto flex items-center gap-4 text-left shadow-[0_6px_0_0_#e0f2fe]">
            <div className={`p-4 rounded-xl border-2 ${module.badge.color} shadow-sm text-3xl`}>
              🏅
            </div>
            <div>
              <h4 className="font-black text-sky-900 text-base flex items-center gap-1.5 font-display">
                {module.badge.title}
                <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              </h4>
              <p className="text-sm text-slate-500 mt-1 font-semibold">{module.badge.description}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 max-w-sm mx-auto">
            <button
              id="collect-rewards-btn"
              onClick={onComplete}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black py-4 rounded-2xl shadow-lg border-b-4 border-yellow-600 active:translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 font-display uppercase tracking-wide cursor-pointer"
            >
              Collect Lesson Rewards <Award className="w-5 h-5" />
            </button>

            <button
              id="retake-quiz-btn"
              onClick={initNewQuiz}
              className="w-full bg-sky-50 hover:bg-sky-100 text-sky-800 border-2 border-sky-200 font-black py-3 rounded-2xl transition-all text-xs flex items-center justify-center gap-2 font-display uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Practice With 5 New Random Questions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

