import React, { useState, useRef } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  Check,
  Send,
  AlertCircle,
  Sparkles,
  Trophy,
  Target
} from 'lucide-react';
import { QuizQuestion } from '../types/navigator';
import { comprehensiveQuizQuestions } from '../data/quizData';

interface InteractiveQuizProps {
  topicId?: string;
  topicTitle?: string;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  topicId,
  topicTitle
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // If showAllQuestions or no topicId, show all 30 questions; otherwise filter by topicId
  const questions: QuizQuestion[] =
    showAllQuestions || !topicId
      ? comprehensiveQuizQuestions
      : comprehensiveQuizQuestions.filter(q => q.topicId === topicId);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return; // Prevent changing after submission until reset
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Calculate detailed scorecard stats
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  questions.forEach(q => {
    const userChoice = selectedAnswers[q.id];
    if (userChoice === undefined) {
      skippedCount++;
    } else if (userChoice === q.correctAnswerIndex) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100) || 0;
  const isPassed = percentage >= 70;

  const handleSubmit = () => {
    if (answeredCount === 0) {
      alert('Please answer at least one question before submitting!');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs mt-8" ref={resultsRef}>
      {/* Quiz Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold mb-1">
            <Award className="w-4 h-4" />
            <span>DevOps Knowledge Assessment & Quiz</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {showAllQuestions
              ? 'Comprehensive DevOps Master Quiz (30 Questions)'
              : `${topicTitle || 'Lesson'} Knowledge Check (${totalQuestions} Questions)`}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your answers and click <strong>"Submit Quiz"</strong> to calculate your Correct and Wrong breakdown with explanations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {topicId && (
            <button
              onClick={() => {
                setShowAllQuestions(!showAllQuestions);
                handleReset();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              {showAllQuestions ? `Show Lesson Quiz (${questions.length} Qs)` : 'Take All 30 Qs Master Quiz'}
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prominent Submission Scorecard Card (When Submitted) */}
      {isSubmitted ? (
        <div className={`p-6 rounded-2xl border ${isPassed ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'} space-y-5 shadow-xs animate-in fade-in zoom-in-95 duration-200`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isPassed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                {isPassed ? <Trophy className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 block">
                  Official Quiz Result Summary
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">
                  {isPassed ? '🎉 Congratulations! You Passed!' : '📚 Keep Learning & Try Again!'}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* 4 Score Stat Boxes (Correct, Wrong, Skipped, Percentage) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {/* Box 1: Correct Answers */}
            <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-700 font-bold">
                <span>Correct Answers</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-700">
                {correctCount} <span className="text-xs font-normal text-slate-500">/ {totalQuestions}</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 block font-semibold">
                ✓ {percentage}% accuracy
              </span>
            </div>

            {/* Box 2: Wrong Answers */}
            <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-rose-700 font-bold">
                <span>Wrong Answers</span>
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-extrabold text-rose-700">
                {wrongCount} <span className="text-xs font-normal text-slate-500">/ {totalQuestions}</span>
              </div>
              <span className="text-[11px] font-mono text-rose-600 block font-semibold">
                ✕ Needs review below
              </span>
            </div>

            {/* Box 3: Skipped / Unanswered */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 font-bold">
                <span>Unanswered</span>
                <Target className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-extrabold text-slate-700">
                {skippedCount}
              </div>
              <span className="text-[11px] font-mono text-slate-500 block">
                {skippedCount === 0 ? 'All answered' : 'Skipped questions'}
              </span>
            </div>

            {/* Box 4: Final Grade */}
            <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-blue-700 font-bold">
                <span>Final Score</span>
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold text-blue-700">
                {percentage}%
              </div>
              <span className="text-[11px] font-mono text-blue-600 block font-semibold">
                {isPassed ? 'Mastery Level' : 'Min 70% required'}
              </span>
            </div>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
            <span className="font-bold text-slate-900 font-mono">Detailed Review Mode:</span>
            <span>Scroll down to inspect which questions you answered correctly and review in-depth explanations for mistakes.</span>
          </div>
        </div>
      ) : (
        /* Progress & Top Submit Bar (Before Submission) */
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-slate-600">
              Questions Answered: <strong className="text-slate-900">{answeredCount}</strong> of {totalQuestions}
            </span>
            <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-200"
                style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Quiz & View Results ({answeredCount}/{totalQuestions})</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : hasAnswered
                    ? 'bg-rose-50/40 border-rose-300'
                    : 'bg-slate-50/60 border-slate-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Heading with Status Tag */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-700 shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <div>
                    <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600 mb-1 inline-block">
                      {q.conceptKey}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>
                </div>

                {/* Submitted Status Badge */}
                {isSubmitted && (
                  <div>
                    {isCorrect ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correct (+1)</span>
                      </span>
                    ) : hasAnswered ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-rose-100 text-rose-800 border border-rose-300 font-bold flex items-center gap-1 shrink-0">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Wrong (0)</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-200 text-slate-700 border border-slate-300 font-medium shrink-0">
                        Skipped
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* 4 Selectable Options */}
              <div className="space-y-2 pl-10">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = optIdx === q.correctAnswerIndex;

                  let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100';

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold shadow-2xs';
                    } else if (isThisSelected && !isCorrect) {
                      optionStyle = 'bg-rose-100/80 border-rose-400 text-rose-950 line-through';
                    } else {
                      optionStyle = 'bg-slate-50 border-slate-200 text-slate-500 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'bg-blue-50 border-blue-600 text-blue-950 font-semibold shadow-2xs ring-1 ring-blue-600';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${isThisSelected && !isSubmitted ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300'}`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSubmitted && isThisCorrect && (
                        <span className="text-emerald-700 font-bold font-mono text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Answer</span>
                        </span>
                      )}
                      {isSubmitted && isThisSelected && !isCorrect && (
                        <span className="text-rose-700 font-bold font-mono text-[11px] flex items-center gap-1">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Your Choice</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Detailed Technical Explanation (Shown after submission) */}
              {isSubmitted && (
                <div className="mt-4 ml-10 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold font-mono text-[11px] ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isCorrect ? '✓ Explanation:' : '✕ Concept Review & Solution:'}
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Submission Bar (If not yet submitted) */}
      {!isSubmitted && (
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-slate-500">
            {answeredCount === totalQuestions ? '✓ All questions answered!' : `${totalQuestions - answeredCount} questions remaining`}
          </span>

          <button
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>Submit Quiz & View Scorecard ({answeredCount}/{totalQuestions})</span>
          </button>
        </div>
      )}
    </div>
  );
};
