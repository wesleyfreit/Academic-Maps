import { KeyboardEvent, MouseEvent, useState } from 'react';
import { List, Search } from 'lucide-react';
import { BackgroundWindow } from './BackgroundWindow';

const activeSide = `bg-gray-900 w-[50vmin] h-screen absolute flex justify-center duration-500 transform z-10 transition-all`;

const normalButton = `bg-gray-500 mt-2 ml-2 absolute flex w-12 h-12 hover:bg-gray-400 rounded-lg z-10 cursor-pointer items-center 
  justify-center duration-500 transform transition-all`;

export default function ListEvents() {
  const [openMenu, setOpenMenu] = useState<boolean | null>(null);
  const [pressSearch, setPressSearch] = useState<boolean | null>(null);

  const handleOpenList = () => {
    if (openMenu) setOpenMenu(false);
    else setOpenMenu(true);
  };

  const handleKeyPressSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (typeof event == typeof KeyboardEvent) {
      if (event.key == 'Enter') setPressSearch(true);
    }
  };

  const handleClickPressSearch = (event: MouseEvent<HTMLButtonElement>) => {
    setPressSearch(true);
  };

  return (
    <>
      <div
        className={openMenu ? `${normalButton}  translate-x-[50vmin]` : normalButton}
        onClick={handleOpenList}
      >
        <List className="w-8 h-8" />
      </div>
      <div className={openMenu ? activeSide : `${activeSide} -translate-x-[50vh]`}>
        <div className="mt-5 flex flex-col">
          <label htmlFor="search" className="flex">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Pesquisar evento"
              className='rounded-lg px-3 py-2 w-[30vmin] outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400 pr-12'
              onKeyDown={handleKeyPressSearch}
            />
            <button
              className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 active:border-blue-400 rounded-lg relative -ml-10 px-2"
              onClick={handleClickPressSearch}
            >
              <Search />
            </button>
          </label>
        </div>
        <div className="overflow-y-auto"></div>
      </div>
      {openMenu ? <BackgroundWindow onClose={handleOpenList}></BackgroundWindow> : <></>}
    </>
  );
}
