import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Sparkles,
  HelpCircle,
  Check,
  RotateCcw
} from 'lucide-react';
import { LearningTopic } from '../types/navigator';
import { YamlCodeViewer } from '../components/YamlCodeViewer';

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

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30';
      case 'Intermediate':
        return 'bg-[#9e6a03]/15 text-[#d29922] border-[#9e6a03]/30';
      case 'Advanced':
        return 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30';
      default:
        return 'bg-[#30363d] text-[#8b949e] border-[#30363d]';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Overall Curriculum Progress Bar */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#58a6ff] mb-1">
              <BookOpen className="w-4 h-4" />
              <span>DevOps Knowledge Base & Curriculum</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3]">Learn DevOps & CI/CD</h1>
            <p className="text-xs text-[#8b949e] mt-1">
              Step-by-step interactive lessons with real pipeline examples and LocalStorage tracking.
            </p>
          </div>

          {/* Progress Box */}
          <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] min-w-[200px] text-xs font-mono">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#8b949e]">Curriculum Progress:</span>
              <span className="text-[#3fb950] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#21262d] h-2 rounded-full overflow-hidden border border-[#30363d]">
              <div
                className="bg-[#3fb950] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#8b949e] mt-1 block text-right">
              {completedCount} of {topics.length} lessons completed
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#21262d] text-xs">
          <span className="text-[#8b949e] mr-1 text-[11px] font-mono">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeCategory === cat
                  ? 'bg-[#21262d] text-[#e6edf3] font-semibold border border-[#30363d] shadow-sm'
                  : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]/50'
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
        <div className="lg:col-span-4 bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm divide-y divide-[#30363d]">
          <div className="px-4 py-3 bg-[#161b22] flex items-center justify-between text-xs font-semibold text-[#8b949e]">
            <span>Curriculum Modules</span>
            <span className="font-mono text-[11px]">{filteredTopics.length} topics</span>
          </div>

          <div className="divide-y divide-[#21262d] max-h-[720px] overflow-y-auto">
            {filteredTopics.map((topic, index) => {
              const isSelected = selectedTopic?.id === topic.id;
              const topicCompleted = completedIds.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`p-3.5 cursor-pointer text-left transition-colors ${
                    isSelected
                      ? 'bg-[#21262d] border-l-2 border-l-[#58a6ff]'
                      : 'hover:bg-[#1c2128]'
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
                        className="mt-0.5 text-[#8b949e] hover:text-[#3fb950] transition-colors"
                      >
                        {topicCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-[#3fb950] fill-[#238636]/20" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div>
                        <span className="text-[10px] font-mono text-[#8b949e]">Lesson 0{topic.order}</span>
                        <h3 className="text-xs font-bold text-[#e6edf3] leading-snug line-clamp-1">
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8b949e] line-clamp-2 mt-1.5 pl-6.5">
                    {topic.shortDescription}
                  </p>

                  <div className="flex items-center gap-3 mt-2 pt-1 pl-6.5 text-[10px] font-mono text-[#8b949e]">
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

        {/* Right Column: Topic Detail Reader */}
        <div className="lg:col-span-8 bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          {selectedTopic ? (
            <div className="space-y-6">
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#30363d]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e]">
                    <span>Lesson 0{selectedTopic.order}</span>
                    <span>•</span>
                    <span className="text-[#58a6ff]">{selectedTopic.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedTopic.estimatedTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#e6edf3]">
                    {selectedTopic.title}
                  </h2>
                </div>

                {/* Mark as Complete Button */}
                <button
                  onClick={() => onToggleComplete(selectedTopic.id)}
                  className={`px-4 py-2 rounded-md font-semibold text-xs flex items-center gap-2 transition-colors ${
                    isCompleted
                      ? 'bg-[#238636] text-white hover:bg-[#2ea043]'
                      : 'bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d]'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`} />
                  <span>{isCompleted ? 'Completed ✓' : 'Mark as Complete'}</span>
                </button>
              </div>

              {/* Topic Overview */}
              <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
                {selectedTopic.overview}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
                  Key Takeaways
                </h4>
                <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-2">
                  {selectedTopic.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#c9d1d9]">
                      <span className="text-[#3fb950] font-bold mt-0.5">✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic Sections */}
              <div className="space-y-6 pt-2">
                {selectedTopic.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-base font-bold text-[#e6edf3]">{section.heading}</h3>
                    <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed whitespace-pre-line">
                      {section.body}
                    </p>

                    {section.tipOrNote && (
                      <div className="p-3 rounded bg-[#58a6ff]/10 border border-[#58a6ff]/30 text-xs text-[#58a6ff] leading-relaxed">
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

              {/* Bottom Navigation: Previous & Next Topic */}
              <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#30363d]">
                {prevTopic ? (
                  <button
                    onClick={() => setSelectedTopicId(prevTopic.id)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-xs text-[#e6edf3] border border-[#30363d] transition-colors"
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
                    className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#238636] hover:bg-[#2ea043] text-xs font-semibold text-white transition-colors"
                  >
                    <span>Next: {nextTopic.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleComplete(selectedTopic.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-[#238636] text-xs font-semibold text-white transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Curriculum Completed!</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-[#8b949e] text-xs">
              Select a lesson from the curriculum syllabus on the left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
