'use client';

import { api } from '@/lib/api';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

type User = {
  username: string;
};

type SigninData = {
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'academic_maps.auth': token } = parseCookies();
    if(token){
      
    }
  }, [])

  async function signIn({ username, password }: SigninData) {
    const response = await api.post('/signin', {
      username,
      password,
    });

    const data = response.data;

    setCookie(undefined, 'academic_maps.auth', data.token, {
      secure: true,
      maxAge: 60 * 60 * 24, //1 day
      path: '/',
    });

    setUser(data.user);
  }

  function signOut() {
    destroyCookie(undefined, 'academic_maps.auth');

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
