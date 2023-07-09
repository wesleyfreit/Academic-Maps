'use client';

import BackgroundWindow from '@/contexts/BackgroundWindow';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';
import { Contact } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useEffect, useState } from 'react';

export default function ViewSignin() {
  const router = useRouter();

  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {
    !backgroundWindow ? router.push('/') : null;
  });

  const handleSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get('username') && formData.get('password')) {
      try {
        const response = await api.post('/signin', {
          username: formData.get('username'),
          password: formData.get('password'),
        });
        const token = response.data;
        router.push(`/api/auth?token=${token.token}`);
        router.refresh();
        alert('Seja bem vindo de volta.');
        setBackgroundWindow(false);
      } catch (error: AxiosError | any) {
        const status = error.response.status;
        switch (status) {
          case 401:
            alert('Existe uma divergência nos dados, verifique e tente novamente.');
            break;
          case 404:
            alert('Parece que a conta que deseja iniciar sessão não existe.');
            break;
          case 500:
            alert('Ocorreu um erro no servidor, tente novamente mais tarde.');
            break;
          default:
            alert('Ocorreu um erro, tente novamente mais tarde.');
            break;
        }
      }
    } else return setIsRequired(true);
  };
  return (
    <>
      {backgroundWindow && (
        <div className="z-[2] relative w-fit left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-lg">
            <h1 className="uppercase font-alt text-xl font-bold flex justify-center">
              <Contact className="mr-2 text-blue-700" /> Iniciar Sessão
            </h1>
            <form onSubmit={handleSignin} className="mt-5 flex flex-col">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username*"
                className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password*"
                className="rounded-lg px-3 mt-4 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400"
              />
              {isRequired && (
                <p className="mt-1 ml-1 self-start text-red-500">
                  Os campos com * são obrigatórios.
                </p>
              )}
              <span className="mt-4">
                Não tem conta?
                <Link
                  className="ml-1 text-blue-500 hover:text-blue-600 underline font-bold"
                  href={'/signup'}
                >
                  Criar conta.
                </Link>
              </span>
              <div className="mt-5 w-full h-full flex justify-center space-x-3">
                <button
                  type="submit"
                  className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 active:border-blue-400 
                  rounded-lg relative px-10 py-2 "
                >
                  Entrar
                </button>
                <Link
                  href="/"
                  className="bg-red-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-red-800 active:border-red-400 rounded-lg 
                  relative px-7 py-2"
                  onClick={() => {
                    setBackgroundWindow(false);
                  }}
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
