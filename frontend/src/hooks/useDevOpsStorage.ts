import { useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types/navigator';
import { predefinedPersonas } from '../data/personasData';

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'devops_nav_completed_lessons',
  BOOKMARKED_PLATFORMS: 'devops_nav_bookmarked_platforms',
  RECENTLY_VIEWED: 'devops_nav_recently_viewed',
  THEME: 'devops_nav_theme',
  CURRENT_USER: 'devops_nav_current_user'
};

export function useDevOpsStorage() {
  // 1. Current Logged-In User Account
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : predefinedPersonas.developer; // Default to developer
    } catch {
      return predefinedPersonas.developer;
    }
  });

  // 2. Completed Lessons State
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : ['topic-1', 'topic-2'];
    } catch {
      return ['topic-1', 'topic-2'];
    }
  });

  // 3. Bookmarked Platforms State
  const [bookmarkedPlatforms, setBookmarkedPlatforms] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_PLATFORMS);
      return saved ? JSON.parse(saved) : ['plat-github-actions', 'plat-jenkins', 'plat-gitlab-ci'];
    } catch {
      return ['plat-github-actions', 'plat-jenkins', 'plat-gitlab-ci'];
    }
  });

  // 4. Recently Viewed Platforms State
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return saved ? JSON.parse(saved) : ['plat-github-actions', 'plat-gitlab-ci', 'plat-argocd'];
    } catch {
      return ['plat-github-actions', 'plat-gitlab-ci', 'plat-argocd'];
    }
  });

  // 5. Theme Preference State
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
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

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

  // Auth & Persona Actions
  const switchPersona = (role: UserRole) => {
    setCurrentUser(predefinedPersonas[role]);
  };

  const loginUser = (email: string, role: UserRole) => {
    const persona = predefinedPersonas[role];
    setCurrentUser({
      ...persona,
      email: email || persona.email
    });
  };

  const signupUser = (name: string, email: string, role: UserRole) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'U';

    const newUser: UserAccount = {
      id: 'user-' + Math.random().toString(36).substring(2, 8),
      name: name || 'DevOps User',
      email: email || 'user@devopsnav.io',
      role,
      avatarText: initials,
      joinedDate: 'Joined Sep 2026',
      bio: predefinedPersonas[role].bio
    };

    setCurrentUser(newUser);
  };

  // Learning & Bookmark Actions
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
    currentUser,
    switchPersona,
    loginUser,
    signupUser,
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
