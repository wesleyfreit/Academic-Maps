import { getUser } from '@/lib/check';
import { User } from 'lucide-react';
import UserTab from './UserTab';

const buttonUser = `bg-gray-500 mt-2 shadow-black shadow-sm ml-16 fixed flex w-12 h-12 hover:bg-gray-400 rounded-lg cursor-pointer items-center 
  justify-center duration-700 transform transition-all flex-col`;

export default function Profile() {
  const { username } = getUser();

  return (
    <>
      <div id="user-button" className={buttonUser} title={username}>
        <User className="w-8 h-8 " />
        <div className="relative">
          <UserTab username={username} />
        </div>
      </div>
    </>
  );
}
