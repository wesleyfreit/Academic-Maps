import { Search } from 'lucide-react';
import { KeyboardEvent, MouseEvent, useState } from 'react';

export default function SearchBar() {
  const [pressSearch, setPressSearch] = useState<boolean | null>(null);

  const handleKeyPressSearch = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key == 'Enter'){
        if(pressSearch) setPressSearch(false); 
        setPressSearch(true);
      }
  };

  const handleClickPressSearch = (event: MouseEvent<HTMLButtonElement>) => {
    if(pressSearch) setPressSearch(false);
    setPressSearch(true);
  };

  return (
    <div>
      <label htmlFor="search" className="pb-4 pt-2 flex justify-center h-fit">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisar evento"
          className="rounded-lg px-3 py-2 w-60 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400 pr-12"
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
  );
}
