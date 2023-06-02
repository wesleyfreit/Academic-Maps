// use client

import { Event } from '@/configs/Interfaces';
import { createContext } from 'react';

const Searchbar = createContext({
  searchStatus: {
    valueSearch: '',
    isSearch: false,
    searchResults: [] as Event[],
  },
  setSearchStatus: (value: { valueSearch: string; isSearch: boolean; searchResults: [] }) => {},
});

export default Searchbar;
