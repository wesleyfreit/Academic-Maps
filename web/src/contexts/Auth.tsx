import { createContext } from 'react';

export type User = {
  username: string;
};

export type SigninData = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SigninData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);
