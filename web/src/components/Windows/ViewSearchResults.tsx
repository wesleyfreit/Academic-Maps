'use client';

import Searchbar from '@/contexts/Searchbar';
import { ReactNode, useState } from 'react';

export default function ViewSearchResults({children}: {children:ReactNode}) {
  const [searchStatus, setSearchStatus] = useState({valueSearch: '', isSearch: false});

  //searchStatus.isSearch? setSearchStatus({valueSearch: '' ,isSearch: false}) : null

  return (
    <Searchbar.Provider value={{ searchStatus, setSearchStatus}}>
      <div className="absolute z-50">{}</div>
      {children}
    </Searchbar.Provider>
  );
}
