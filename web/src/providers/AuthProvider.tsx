'use client';

import { AuthContext, SigninData, User } from '@/contexts/Auth';
import { api } from '@/lib/api';
import { ReactNode, useEffect, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'academic_maps.auth': token } = parseCookies();
    if (token) {
      (async () => {
        const response = await api.get('/user', {
          headers: {
            Authorization: token,
          },
        });
        setUser(response.data);
      })();
    }
  }, []);

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
