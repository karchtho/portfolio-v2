/**
 * AUth models
 * Typescript interfaces for authentication data structures
 * Must match backend API contracts
 */

// POST /api/auth/login
export interface LoginRequest {
  username: string;
  password: string;
}

// POST /api/auth/login response
export interface AuthResponse {
  token: string;
  user: UserSafe;
}

// User data (without sensitive fields like password)
export interface UserSafe {
  id: number;
  username: string;
  created_at: string;
}

// Auth error response (standardized format)
export interface AuthError {
  error: string;
  message?: string;
}
