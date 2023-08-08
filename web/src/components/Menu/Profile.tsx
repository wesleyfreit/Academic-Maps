'use client';

import Logout from './Signout';
import UserName from './UserName';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth';

const buttonProps = `bg-gray-500 mt-2 shadow-black shadow-sm ml-16 fixed flex w-12 h-12 hover:bg-gray-400 rounded-lg cursor-pointer items-center 
  justify-center duration-700 transform transition-all flex-col`;

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={buttonProps} title={user?.username}>
        <UserName username={user?.username} />
      </div>

      {user ? (
        <div className={`${buttonProps} ml-[7.5rem]`} title="Sair da conta">
          <Logout />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
