import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { PlatformsPage } from './pages/PlatformsPage';
import { PlatformDetailPage } from './pages/PlatformDetailPage';
import { ComparePage } from './pages/ComparePage';
import { DashboardPage } from './pages/DashboardPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { YamlGeneratorPage } from './pages/YamlGeneratorPage';
import { ArchitectGovernancePage } from './pages/ArchitectGovernancePage';
import { AccessDeniedPage } from './pages/AccessDeniedPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { learningTopicsData } from './data/learningTopics';
import { platformsData } from './data/platformsData';
import { rolePermissions } from './data/personasData';
import { useDevOpsStorage } from './hooks/useDevOpsStorage';
import { Platform, UserRole } from './types/navigator';

export const App: React.FC = () => {
  // Page Routing State
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedTopicSlug, setSelectedTopicSlug] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [comparedPlatformIds, setComparedPlatformIds] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // LocalStorage Custom Hook with Persona Auth
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

  // Check strict RBAC access
  const isPageAllowed = (page: string, role: UserRole) => {
    const allowed = rolePermissions[role].allowedPages;
    return allowed.includes(page) || page === 'home';
  };

  const handleSwitchAndNavigate = (newRole: UserRole) => {
    switchPersona(newRole);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 transition-colors duration-150">
      {/* Top Navigation Bar (Clean White, No Top Icon, Strict Role Tabs) */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        completedCount={completedLessons.length}
        totalLessons={learningTopicsData.length}
        bookmarkCount={bookmarkedPlatforms.length}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Page Body - Balanced Full Width (Max 1600px with clean margins) */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        {/* If page is not permitted for current role, show AccessDeniedPage */}
        {!isPageAllowed(activePage, currentUser.role) ? (
          <AccessDeniedPage
            currentUser={currentUser}
            targetPage={activePage}
            onSwitchRole={handleSwitchAndNavigate}
            onNavigateHome={() => setActivePage('home')}
          />
        ) : (
          <>
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

            {(activePage === 'student-dashboard' || activePage === 'dashboard') && (
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

            {(activePage === 'interview-prep' || activePage === 'aspirant-hub') && (
              <InterviewPrepPage />
            )}

            {activePage === 'yaml-gen' && (
              <YamlGeneratorPage />
            )}

            {activePage === 'governance' && (
              <ArchitectGovernancePage />
            )}

            {!['home', 'learn', 'platforms', 'platform-detail', 'compare', 'student-dashboard', 'dashboard', 'bookmarks', 'interview-prep', 'aspirant-hub', 'yaml-gen', 'governance'].includes(activePage) && (
              <NotFoundPage onNavigate={handleNavigate} />
            )}
          </>
        )}
      </main>

      {/* Auth & Persona Switcher Modal */}
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
