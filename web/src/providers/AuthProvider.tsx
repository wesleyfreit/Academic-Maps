'use client';

import { AuthContext, SigninData, User } from '@/contexts/Auth';
import { api } from '@/lib/api';
import { ReactNode, useEffect, useState } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import { AxiosError } from 'axios';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error: AxiosError | any) {
        const status = error.response?.status;
        switch (status) {
          case 403:
            setUser(null);
            break;
          case 500:
            alert('Ocorreu um erro no servidor, tente novamente mais tarde.');
            break;
          default:
            alert('Ocorreu um erro, tente novamente mais tarde.');
            break;
        }
      }
    })();
  }, []);

  async function signIn({ username, password }: SigninData) {
    const response = await api.post('/signin', {
      username,
      password,
    });

    const { token, user } = response.data;

    setCookie(undefined, 'academic_maps.auth', token, {
      secure: true,
      maxAge: 60 * 60 * 2, //2h
      path: '/',
    });

    setUser(user);
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
