import { createContext } from 'react';

const Searchbar = createContext({
  searchStatus: {
    valueSearch: '',
    isSearch: false,
  },
  setSearchStatus: (value: {valueSearch: string, isSearch: boolean}) => {},
});

export default Searchbar;
