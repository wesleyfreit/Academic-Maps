import { createContext } from 'react';

const BackgroundWindow = createContext({
  backgroundWindow: false,
  setBackgroundWindow: (value: boolean) => {},
});

export default BackgroundWindow;
