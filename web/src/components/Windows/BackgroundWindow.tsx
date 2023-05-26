import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  onClose: (value: boolean) => void;
}

export default function BackgroundWindow(props: Props) {
  const { onClose, children } = props;

  function handleClose() {
    onClose(false);
  }

  return (
    <> {}
      <div className="flex items-center justify-center">
        <div
          className="w-screen h-screen backdrop-blur flex justify-center items-center"
          onClick={handleClose}
        />
        <div className="absolute">{children}</div>
      </div>
    </>
  );
}
