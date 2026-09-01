import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'devops_nav_completed_lessons',
  BOOKMARKED_PLATFORMS: 'devops_nav_bookmarked_platforms',
  RECENTLY_VIEWED: 'devops_nav_recently_viewed',
  THEME: 'devops_nav_theme'
};

export function useDevOpsStorage() {
  // 1. Completed Lessons State
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : ['topic-1']; // Default start with 1 lesson completed
    } catch {
      return ['topic-1'];
    }
  });

  // 2. Bookmarked Platforms State
  const [bookmarkedPlatforms, setBookmarkedPlatforms] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_PLATFORMS);
      return saved ? JSON.parse(saved) : ['plat-github-actions', 'plat-jenkins'];
    } catch {
      return ['plat-github-actions', 'plat-jenkins'];
    }
  });

  // 3. Recently Viewed Platforms State
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return saved ? JSON.parse(saved) : ['plat-github-actions', 'plat-gitlab-ci', 'plat-argocd'];
    } catch {
      return ['plat-github-actions', 'plat-gitlab-ci', 'plat-argocd'];
    }
  });

  // 4. Theme Preference State (default to dark)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKED_PLATFORMS, JSON.stringify(bookmarkedPlatforms));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedPlatforms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Actions
  const toggleLessonComplete = (topicId: string) => {
    setCompletedLessons(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const isLessonCompleted = (topicId: string) => completedLessons.includes(topicId);

  const toggleBookmark = (platformId: string) => {
    setBookmarkedPlatforms(prev =>
      prev.includes(platformId) ? prev.filter(id => id !== platformId) : [...prev, platformId]
    );
  };

  const isBookmarked = (platformId: string) => bookmarkedPlatforms.includes(platformId);

  const addRecentlyViewed = (platformId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== platformId);
      return [platformId, ...filtered].slice(0, 6);
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    setBookmarkedPlatforms([]);
    setRecentlyViewed([]);
  };

  return {
    completedLessons,
    bookmarkedPlatforms,
    recentlyViewed,
    theme,
    toggleLessonComplete,
    isLessonCompleted,
    toggleBookmark,
    isBookmarked,
    addRecentlyViewed,
    toggleTheme,
    resetProgress
  };
}
