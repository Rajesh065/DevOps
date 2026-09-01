import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { PlatformsPage } from './pages/PlatformsPage';
import { PlatformDetailPage } from './pages/PlatformDetailPage';
import { ComparePage } from './pages/ComparePage';
import { DashboardPage } from './pages/DashboardPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { learningTopicsData } from './data/learningTopics';
import { platformsData } from './data/platformsData';
import { useDevOpsStorage } from './hooks/useDevOpsStorage';
import { Platform } from './types/navigator';

export const App: React.FC = () => {
  // Page Routing State
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedTopicSlug, setSelectedTopicSlug] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [comparedPlatformIds, setComparedPlatformIds] = useState<string[]>([]);

  // LocalStorage Custom Hook
  const {
    completedLessons,
    bookmarkedPlatforms,
    recentlyViewed,
    theme,
    toggleLessonComplete,
    toggleBookmark,
    addRecentlyViewed,
    toggleTheme,
    resetProgress
  } = useDevOpsStorage();

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedPlatform]);

  const handleNavigate = (page: string, param?: string) => {
    if (page === 'learn' && param) {
      setSelectedTopicSlug(param);
    } else {
      setSelectedTopicSlug(null);
    }
    setActivePage(page);
  };

  const handleSelectPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
    addRecentlyViewed(platform.id);
    setActivePage('platform-detail');
  };

  const handleToggleCompare = (platformId: string) => {
    setComparedPlatformIds(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 platforms simultaneously.');
        return prev;
      }
      return [...prev, platformId];
    });
  };

  const handleClearCompare = () => {
    setComparedPlatformIds([]);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${theme === 'dark' ? 'bg-[#0d1117] text-[#e6edf3]' : 'bg-[#f6f8fa] text-[#1f2328]'}`}>
      {/* Top Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        completedCount={completedLessons.length}
        totalLessons={learningTopicsData.length}
        bookmarkCount={bookmarkedPlatforms.length}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {activePage === 'home' && (
          <HomePage
            platforms={platformsData}
            learningTopics={learningTopicsData}
            onNavigate={handleNavigate}
            onSelectPlatform={handleSelectPlatform}
            bookmarkedIds={bookmarkedPlatforms}
            onToggleBookmark={toggleBookmark}
            completedTopicIds={completedLessons}
          />
        )}

        {activePage === 'learn' && (
          <LearnPage
            topics={learningTopicsData}
            completedIds={completedLessons}
            onToggleComplete={toggleLessonComplete}
            selectedTopicSlug={selectedTopicSlug}
          />
        )}

        {activePage === 'platforms' && (
          <PlatformsPage
            platforms={platformsData}
            bookmarkedIds={bookmarkedPlatforms}
            onToggleBookmark={toggleBookmark}
            onSelectPlatform={handleSelectPlatform}
            comparedIds={comparedPlatformIds}
            onToggleCompare={handleToggleCompare}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'platform-detail' && selectedPlatform && (
          <PlatformDetailPage
            platform={selectedPlatform}
            isBookmarked={bookmarkedPlatforms.includes(selectedPlatform.id)}
            onToggleBookmark={toggleBookmark}
            onBack={() => setActivePage('platforms')}
            onCompareToggle={handleToggleCompare}
            isCompared={comparedPlatformIds.includes(selectedPlatform.id)}
          />
        )}

        {activePage === 'compare' && (
          <ComparePage
            platforms={platformsData}
            comparedIds={comparedPlatformIds}
            onToggleCompare={handleToggleCompare}
            onClearCompare={handleClearCompare}
            onSelectPlatform={handleSelectPlatform}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            topics={learningTopicsData}
            platforms={platformsData}
            completedLessonIds={completedLessons}
            bookmarkedPlatformIds={bookmarkedPlatforms}
            recentlyViewedIds={recentlyViewed}
            onToggleComplete={toggleLessonComplete}
            onToggleBookmark={toggleBookmark}
            onSelectPlatform={handleSelectPlatform}
            onNavigate={handleNavigate}
            onResetProgress={resetProgress}
          />
        )}

        {activePage === 'bookmarks' && (
          <BookmarksPage
            platforms={platformsData}
            bookmarkedIds={bookmarkedPlatforms}
            onToggleBookmark={toggleBookmark}
            onSelectPlatform={handleSelectPlatform}
            onNavigate={handleNavigate}
            comparedIds={comparedPlatformIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {!['home', 'learn', 'platforms', 'platform-detail', 'compare', 'dashboard', 'bookmarks'].includes(activePage) && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
};
export default App;
