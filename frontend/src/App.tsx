import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { LabsPage } from './pages/LabsPage';
import { PlatformsPage } from './pages/PlatformsPage';
import { PlatformDetailPage } from './pages/PlatformDetailPage';
import { ComparePage } from './pages/ComparePage';
import { MasterQuizPage } from './pages/MasterQuizPage';
import { DashboardPage } from './pages/DashboardPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { YamlGeneratorPage } from './pages/YamlGeneratorPage';
import { ArchitectGovernancePage } from './pages/ArchitectGovernancePage';
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // LocalStorage Custom Hook with 4-Persona Support
  const {
    currentUser,
    switchPersona,
    loginUser,
    signupUser,
    completedLessons,
    bookmarkedPlatforms,
    recentlyViewed,
    toggleLessonComplete,
    toggleBookmark,
    addRecentlyViewed,
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
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 transition-colors duration-150">
      {/* Dynamic 4-Role Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        completedCount={completedLessons.length}
        totalLessons={learningTopicsData.length}
        bookmarkCount={bookmarkedPlatforms.length}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area - Full Width with Balanced Margin (Max 1600px) */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        {activePage === 'home' && (
          <HomePage
            platforms={platformsData}
            learningTopics={learningTopicsData}
            onNavigate={handleNavigate}
            onSelectPlatform={handleSelectPlatform}
            bookmarkedIds={bookmarkedPlatforms}
            onToggleBookmark={toggleBookmark}
            completedTopicIds={completedLessons}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            currentUser={currentUser}
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

        {activePage === 'labs' && (
          <LabsPage />
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

        {activePage === 'yaml-gen' && (
          <YamlGeneratorPage />
        )}

        {activePage === 'governance' && (
          <ArchitectGovernancePage />
        )}

        {activePage === 'interview-prep' && (
          <InterviewPrepPage />
        )}

        {activePage === 'master-quiz' && (
          <MasterQuizPage />
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
            currentUser={currentUser}
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

        {!['home', 'learn', 'labs', 'platforms', 'platform-detail', 'compare', 'yaml-gen', 'governance', 'interview-prep', 'master-quiz', 'dashboard', 'bookmarks'].includes(activePage) && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* 4-Role Authentication & Quick Persona Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={loginUser}
        onSignup={signupUser}
        currentRole={currentUser.role}
      />

      {/* Global Clean Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
};
export default App;
