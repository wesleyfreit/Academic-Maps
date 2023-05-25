import { KeyboardEvent, MouseEvent, useState } from 'react';
import { List, Search } from 'lucide-react';
import { BackgroundWindow } from './BackgroundWindow';

const activeSide = `bg-gray-900 w-[50vmin] h-screen fixed flex flex-col justify-center items-center duration-500 transform z-10 transition-all`;

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
        className={
          openMenu ? `${normalButton}  translate-x-[50vmin]` : normalButton
        }
        onClick={handleOpenList}
      >
        <List className="w-8 h-8" />
      </div>
      <div
        className={
          openMenu ? `${activeSide}  ` : `${activeSide} -translate-x-[50vh]`
        }
      >
        <div className='flex flex-col h-screen w-full'>
          <div className="">
            <label htmlFor="search" className="flex">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Pesquisar evento"
                className="rounded-lg px-3 py-2 w-[35vmin] min-w-[10vw]  outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400 pr-12"
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
          <ul className="flex flex-col pb-3 space-y-5 w-full justify-center items-center overflow-y-auto">
            <li className="bg-gray-700">
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
            <li>
              <h2>Nome Evento</h2>
              <p>02/05/2022</p>
            </li>
          </ul>
        </div>
      </div>
      {openMenu ? (
        <BackgroundWindow onClose={handleOpenList}></BackgroundWindow>
      ) : (
        <></>
      )}
    </>
  );
}
