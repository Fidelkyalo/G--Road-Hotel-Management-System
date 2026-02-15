import { FC } from 'react';

type Props = {
  isOpen: boolean;
};

/**
 * Backdrop component for modal overlays.
 * Renders a dark, semi-transparent background when isOpen is true.
 */
const BackDrop: FC<Props> = ({ isOpen }) =>
  isOpen ? (
    <div className='fixed z-[60] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)]' />
  ) : (
    <></>
  );

export default BackDrop;
