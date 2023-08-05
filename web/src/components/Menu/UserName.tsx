'use client';

import { User } from 'lucide-react';
import { useState } from 'react';

export default function UserName(props: { username: string | undefined }) {
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
