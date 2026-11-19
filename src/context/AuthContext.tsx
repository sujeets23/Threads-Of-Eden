import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: "customer" | "admin";
  avatar?: string;
  createdAt: string;
}

interface StoredUserAccount extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: "google" | "apple") => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const STORAGE_SESSION_KEY = "threads_eden_user_session";
const STORAGE_USERS_KEY = "threads_eden_registered_users";

const INITIAL_DEMO_USERS: StoredUserAccount[] = [
  {
    id: "usr_demo_1",
    name: "Eleanor Vance",
    email: "eleanor@threadsofeeden.com",
    role: "customer",
    passwordHash: "password123",
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "usr_admin_1",
    name: "Eden Store Atelier",
    email: "admin@threadsofeeden.com",
    role: "admin",
    passwordHash: "admin123",
    createdAt: "2026-01-01T08:00:00.000Z",
  },
];

export const DEFAULT_AUTH_CONTEXT: AuthContextType = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  socialLogin: async () => false,
  logout: () => {},
  updateProfile: () => {},
};

const AuthContext = createContext<AuthContextType>(DEFAULT_AUTH_CONTEXT);

function getStoredUsers(): StoredUserAccount[] {
  if (typeof window === "undefined") return INITIAL_DEMO_USERS;
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_USERS;
  }
}

function saveStoredUsers(users: StoredUserAccount[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to persist users:", err);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage
  useEffect(() => {
    try {
      const sessionRaw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (sessionRaw) {
        setUser(JSON.parse(sessionRaw));
      }
      // Ensure seed users exist
      const existingUsers = localStorage.getItem(STORAGE_USERS_KEY);
      if (!existingUsers) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      }
    } catch (e) {
      console.error("Error reading auth session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      toast.error("Please provide both email and password.");
      return false;
    }

    const users = getStoredUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.passwordHash === cleanPassword,
    );

    if (match) {
      const sessionUser: User = {
        id: match.id,
        name: match.name,
        email: match.email,
        role: match.role,
        avatar: match.avatar,
        createdAt: match.createdAt,
      };
      setUser(sessionUser);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
      toast.success(`Welcome back, ${match.name.split(" ")[0]}!`);
      return true;
    }

    // If user exists but wrong password
    const userExists = users.some((u) => u.email.toLowerCase() === cleanEmail);
    if (userExists) {
      toast.error("Incorrect password. Please try again.");
      return false;
    }

    // Or permit instant login for any email during development
    const newUser: StoredUserAccount = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: cleanEmail
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      email: cleanEmail,
      role: "customer",
      passwordHash: cleanPassword,
      createdAt: new Date().toISOString(),
    };
    const updated = [...users, newUser];
    saveStoredUsers(updated);

    const sessionUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
    };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
    toast.success(`Account verified. Welcome, ${sessionUser.name}!`);
    return true;
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      if (!cleanName) {
        toast.error("Please enter your name.");
        return false;
      }
      if (!cleanEmail || !cleanEmail.includes("@")) {
        toast.error("Please enter a valid email address.");
        return false;
      }
      if (cleanPassword.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return false;
      }

      const users = getStoredUsers();
      if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
        toast.error("An account with this email already exists. Please log in.");
        return false;
      }

      const newUser: StoredUserAccount = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name: cleanName,
        email: cleanEmail,
        role: "customer",
        passwordHash: cleanPassword,
        createdAt: new Date().toISOString(),
      };

      const updated = [...users, newUser];
      saveStoredUsers(updated);

      const sessionUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      };

      setUser(sessionUser);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
      toast.success(`Welcome to Threads of Eden, ${cleanName}!`);
      return true;
    },
    [],
  );

  const socialLogin = useCallback(async (provider: "google" | "apple"): Promise<boolean> => {
    const isGoogle = provider === "google";
    const demoUser: User = {
      id: `usr_${provider}_` + Math.random().toString(36).substring(2, 8),
      name: isGoogle ? "Google Member" : "Apple Member",
      email: isGoogle ? "member@gmail.com" : "member@icloud.com",
      role: "customer",
      createdAt: new Date().toISOString(),
    };

    setUser(demoUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(demoUser));
    toast.success(`Signed in with ${isGoogle ? "Google" : "Apple"}. Welcome!`);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION_KEY);
    toast.info("You have signed out.");
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Profile updated.");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        socialLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context || DEFAULT_AUTH_CONTEXT;
}
