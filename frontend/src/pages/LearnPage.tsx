import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Award
} from 'lucide-react';
import { LearningTopic } from '../types/navigator';
import { YamlCodeViewer } from '../components/YamlCodeViewer';
import { InteractiveQuiz } from '../components/InteractiveQuiz';

interface LearnPageProps {
  topics: LearningTopic[];
  completedIds: string[];
  onToggleComplete: (topicId: string) => void;
  selectedTopicSlug?: string | null;
}

export const LearnPage: React.FC<LearnPageProps> = ({
  topics,
  completedIds,
  onToggleComplete,
  selectedTopicSlug
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    if (selectedTopicSlug) {
      const found = topics.find(t => t.slug === selectedTopicSlug);
      if (found) return found.id;
    }
    return topics[0]?.id || 'topic-1';
  });

  const categories = ['All', 'Fundamentals', 'CI/CD', 'Pipelines'];

  const filteredTopics = topics.filter(
    t => activeCategory === 'All' || t.category === activeCategory
  );

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const isCompleted = selectedTopic ? completedIds.includes(selectedTopic.id) : false;

  const currentIndex = topics.findIndex(t => t.id === selectedTopic?.id);
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header & Overall Curriculum Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-1">
              <BookOpen className="w-4 h-4" />
              <span>DevOps Knowledge Base & Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Learn DevOps & CI/CD</h1>
            <p className="text-xs text-slate-500 mt-1">
              Step-by-step interactive lessons, pipeline code examples, and end-of-lesson interactive quizzes.
            </p>
          </div>

          {/* Progress Box */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 min-w-[220px] text-xs font-mono">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-600 font-medium">Curriculum Progress:</span>
              <span className="text-emerald-700 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1.5 block text-right font-semibold">
              {completedCount} of {topics.length} lessons completed
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 mr-1 text-[11px] font-mono">Filter Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Syllabus List + Right Topic Content Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lessons Syllabus */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100">
          <div className="px-4 py-3 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 font-mono">
            <span>Curriculum Modules</span>
            <span className="text-slate-500">{filteredTopics.length} topics</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[720px] overflow-y-auto">
            {filteredTopics.map((topic) => {
              const isSelected = selectedTopic?.id === topic.id;
              const topicCompleted = completedIds.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`p-4 cursor-pointer text-left transition-colors ${
                    isSelected
                      ? 'bg-blue-50/50 border-l-3 border-l-blue-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleComplete(topic.id);
                        }}
                        title={topicCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                        className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                      >
                        {topicCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">Lesson 0{topic.order}</span>
                        <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono border font-semibold ${getDifficultyBadge(topic.difficulty)}`}>
                      {topic.difficulty}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 pl-6.5 leading-relaxed">
                    {topic.shortDescription}
                  </p>

                  <div className="flex items-center gap-3 mt-2 pt-1 pl-6.5 text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {topic.estimatedTime}
                    </span>
                    <span>•</span>
                    <span>{topic.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Topic Detail Reader + End of Lesson Interactive Quiz */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {selectedTopic ? (
            <div className="space-y-6">
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-medium">
                    <span>Lesson 0{selectedTopic.order}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-semibold">{selectedTopic.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedTopic.estimatedTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {selectedTopic.title}
                  </h2>
                </div>

                {/* Mark as Complete Button */}
                <button
                  onClick={() => onToggleComplete(selectedTopic.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`} />
                  <span>{isCompleted ? 'Completed ✓' : 'Mark as Complete'}</span>
                </button>
              </div>

              {/* Topic Overview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedTopic.overview}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Key Takeaways
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  {selectedTopic.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic Sections */}
              <div className="space-y-6 pt-2">
                {selectedTopic.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-base font-bold text-slate-900">{section.heading}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {section.body}
                    </p>

                    {section.tipOrNote && (
                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 leading-relaxed">
                        {section.tipOrNote}
                      </div>
                    )}

                    {section.codeSnippet && (
                      <YamlCodeViewer
                        filename={section.codeSnippet.filename || 'pipeline.yml'}
                        code={section.codeSnippet.code}
                        language={section.codeSnippet.language}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* End-of-Lesson Interactive Knowledge Check Quiz */}
              <InteractiveQuiz
                topicId={selectedTopic.id}
                topicTitle={selectedTopic.title}
              />

              {/* Bottom Navigation */}
              <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-100">
                {prevTopic ? (
                  <button
                    onClick={() => setSelectedTopicId(prevTopic.id)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 border border-slate-200 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous: {prevTopic.title}</span>
                  </button>
                ) : (
                  <div />
                )}

                {nextTopic ? (
                  <button
                    onClick={() => setSelectedTopicId(nextTopic.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors shadow-xs"
                  >
                    <span>Next: {nextTopic.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleComplete(selectedTopic.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-xs font-semibold text-white transition-colors shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Curriculum Completed!</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              Select a lesson from the curriculum syllabus on the left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
