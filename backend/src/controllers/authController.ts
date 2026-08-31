import { Request, Response } from 'express';
import { User, AuthResponse } from '../types/auth.types.js';

export const getCurrentUser = (req: Request, res: Response) => {
  const user: User = {
    id: "usr-devops-lead",
    username: "sarah-devops",
    email: "sarah@devpulse.io",
    role: "devops_engineer",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
    teams: ["Infrastructure", "SRE", "Security"],
    lastLogin: new Date().toISOString()
  };

  const response: AuthResponse = {
    token: "mock-jwt-token-devpulse-2026",
    user
  };

  res.json({ success: true, data: response });
};
