import { getUser } from '@/lib/check';
import { LogOut, User } from 'lucide-react';
import Logout from './Logout';
import UserName from './UserName';

const buttonUser = `bg-gray-500 mt-2 shadow-black shadow-sm ml-16 fixed flex w-12 h-12 hover:bg-gray-400 rounded-lg cursor-pointer items-center 
  justify-center duration-700 transform transition-all flex-col`;

export default function Profile() {
  const { username } = getUser();

  return (
    <>
      <div className={buttonUser} title={username}>
        <UserName username={username} />
      </div>

      {username ? (
        <div className={`${buttonUser} ml-[7.5rem]`} title="Sair da conta">
          <Logout />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
