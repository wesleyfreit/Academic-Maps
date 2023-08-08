import { getAPIClient } from '@/lib/axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);

  const { ['academic_maps.auth']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  await apiClient.get('/user');

  return {
    props: {},
  };
};
