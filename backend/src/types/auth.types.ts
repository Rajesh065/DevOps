export type UserRole = 'admin' | 'devops_engineer' | 'developer' | 'viewer';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  teams: string[];
  lastLogin: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
