import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClose: (value: null ) => void;
}

export function BackgroundWindow(props: Props) {
  const { onClose, children } = props;

  function handleClose() {
    onClose(null);
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className="w-screen h-screen backdrop-blur flex justify-center items-center"
        onClick={handleClose}
      />
      <div className="absolute">{children}</div>
    </div>
  );
}
