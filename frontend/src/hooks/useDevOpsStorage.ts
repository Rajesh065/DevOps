import { useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types/navigator';
import { predefinedPersonas } from '../data/personasData';

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'devops_nav_completed_lessons',
  BOOKMARKED_PLATFORMS: 'devops_nav_bookmarked_platforms',
  RECENTLY_VIEWED: 'devops_nav_recently_viewed',
  THEME: 'devops_nav_theme',
  CURRENT_USER: 'devops_nav_active_persona_user'
};

export function useDevOpsStorage() {
  // 1. Current Active User Account (Defaults to student)
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : predefinedPersonas.student;
    } catch {
      return predefinedPersonas.student;
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

  // Persona Actions
  const switchPersona = (role: UserRole) => {
    const persona = predefinedPersonas[role] || predefinedPersonas.student;
    setCurrentUser(persona);
  };

  const loginUser = (email: string, role: UserRole) => {
    const persona = predefinedPersonas[role] || predefinedPersonas.student;
    setCurrentUser({
      ...persona,
      email: email || persona.email
    });
  };

  const signupUser = (name: string, email: string, role: UserRole) => {
    const base = predefinedPersonas[role] || predefinedPersonas.student;
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'U';

    const newUser: UserAccount = {
      id: 'user-' + Math.random().toString(36).substring(2, 8),
      name: name || base.name,
      email: email || base.email,
      role,
      title: base.title,
      avatarText: initials,
      joinedDate: 'Joined Sep 2026',
      bio: base.bio
    };

    setCurrentUser(newUser);
  };

  const updateUserProfile = (name: string, email: string) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || currentUser.avatarText;

    setCurrentUser(prev => ({
      ...prev,
      name,
      email,
      avatarText: initials
    }));
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
    updateUserProfile,
    completedLessons,
    bookmarkedPlatforms,
    recentlyViewed,
    toggleLessonComplete,
    isLessonCompleted,
    toggleBookmark,
    isBookmarked,
    addRecentlyViewed,
    resetProgress
  };
}
