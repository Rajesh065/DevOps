import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, Check, Sparkles } from 'lucide-react';
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

  // If showAllQuestions or no topicId, show all 30 questions; otherwise filter by topicId
  const questions: QuizQuestion[] =
    showAllQuestions || !topicId
      ? comprehensiveQuizQuestions
      : comprehensiveQuizQuestions.filter(q => q.topicId === topicId);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = questions.length;

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100) || 0;
  const isPassed = percentage >= 70;

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs mt-8">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold mb-1">
            <Award className="w-4 h-4" />
            <span>Interactive Knowledge Assessment Quiz</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {showAllQuestions
              ? 'DevOps Master Assessment (All 30 Questions)'
              : `${topicTitle || 'Lesson'} Knowledge Check`}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test your comprehension of core concepts with instant technical explanations.
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

      {/* Progress & Score Bar */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            Answered: <strong>{answeredCount}</strong> / {totalQuestions}
          </span>
          {isSubmitted && (
            <span className={`px-2.5 py-0.5 rounded-full font-bold border ${isPassed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
              Score: {score}/{totalQuestions} ({percentage}% {isPassed ? '• PASSED ✓' : '• RETRY NEEDED'})
            </span>
          )}
        </div>

        {!isSubmitted ? (
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={answeredCount === 0}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit & Verify Answers ({answeredCount}/{totalQuestions})
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors"
          >
            Retake Quiz
          </button>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Question Heading */}
              <div className="flex items-start gap-3 mb-3">
                <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-700 shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <div>
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600 mb-1 inline-block">
                    {q.conceptKey}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* 4 Options */}
              <div className="space-y-2 pl-9">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = optIdx === q.correctAnswerIndex;

                  let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100';

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-bold';
                    } else if (isThisSelected && !isCorrect) {
                      optionStyle = 'bg-rose-100/70 border-rose-300 text-rose-900 line-through';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold shadow-2xs';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => !isSubmitted && handleSelectOption(q.id, optIdx)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isThisSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation (Shown when submitted) */}
              {isSubmitted && (
                <div className="mt-3 ml-9 p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold font-mono text-[11px] text-slate-900 block">
                    {isCorrect ? '✓ Correct Answer Explanation:' : '✕ Explanation & Concept:'}
                  </span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
