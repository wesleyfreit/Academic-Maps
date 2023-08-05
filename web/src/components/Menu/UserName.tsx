'use client';

import { User } from 'lucide-react';
import { useState } from 'react';

const buttonUser = `bg-gray-500 mt-2 shadow-black shadow-sm ml-16 fixed flex w-12 h-12 hover:bg-gray-400 rounded-lg cursor-pointer items-center 
  justify-center duration-700 transform transition-all flex-col`;

export default function UserName(props: { username: string }) {
  const [click, setClick] = useState(false);
  const { username } = props;
  return (
    <>
      <button
        onClick={() => (click ? setClick(false) : setClick(true))}
        className="w-full h-full flex justify-center items-center relative text-sky-500"
      >
        <User className="w-8 h-8" />
      </button>
      <div
        className="absolute shadow-black shadow-sm p-3 bg-gray-500 rounded-lg pointer-events-none"
        style={{
          opacity: click ? 1 : 0,
          bottom: click ? '-3.5rem' : '-3rem',
          visibility: click ? 'visible' : 'hidden',
          transition: 'all .2s ease-in-out ',
          textShadow: '0 0 2px #000000',
        }}
      >
        {username}
      </div>
    </>
  );
}
